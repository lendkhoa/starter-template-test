"""
API Views for the Django backend
Handles health checks, user info, and n8n workflow triggers
"""
from django.conf import settings
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

import requests
import logging

logger = logging.getLogger(__name__)


class HealthCheckView(APIView):
    """
    Simple health check endpoint
    Returns 200 OK if the service is running
    """
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "status": "ok",
            "version": "1.0.0"
        })


class MeView(APIView):
    """
    Returns information about the currently authenticated user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "name": user.username,
            "email": getattr(user, 'email', 'user@example.com')
        })


@method_decorator(csrf_exempt, name='dispatch')
class TriggerWorkflowView(APIView):
    """
    Proxy endpoint for triggering n8n workflows
    Receives requests from frontend and forwards them to n8n with enriched metadata
    
    Expected request body:
    {
        "slug": "healthcheck",  # Workflow identifier
        "payload": { ... }       # Data to send to workflow
    }
    """
    permission_classes = [AllowAny]  # TODO: Change to IsAuthenticated in production

    def post(self, request):
        """Handle POST requests to trigger workflows"""
        workflow_slug = request.data.get("slug")
        payload = request.data.get("payload", {})

        # Validate required fields
        if not workflow_slug:
            return Response(
                {"error": "Missing required field: 'slug'"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Look up n8n webhook URL
        webhook_url = settings.N8N_WEBHOOKS.get(workflow_slug)
        if not webhook_url:
            return Response(
                {"error": f"Workflow '{workflow_slug}' not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Prepare enriched payload for n8n
        n8n_payload = self._build_n8n_payload(request, payload)
        
        # Forward to n8n and handle response
        try:
            response = self._forward_to_n8n(webhook_url, n8n_payload)
            return response
        except requests.Timeout:
            logger.error(f"Timeout calling n8n webhook: {workflow_slug}")
            return Response(
                {"error": "Workflow request timed out"}, 
                status=status.HTTP_504_GATEWAY_TIMEOUT
            )
        except requests.RequestException as e:
            logger.error(f"Error calling n8n webhook {workflow_slug}: {str(e)}")
            return Response(
                {"error": "Failed to reach automation server"}, 
                status=status.HTTP_502_BAD_GATEWAY
            )

    def _build_n8n_payload(self, request, payload):
        """
        Build enriched payload for n8n with user metadata
        
        Args:
            request: Django request object
            payload: Original payload from frontend
            
        Returns:
            dict: Enriched payload with user metadata
        """
        return {
            "input": payload,
            "meta": {
                "user_id": request.user.id if request.user.is_authenticated else None,
                "user_name": request.user.username if request.user.is_authenticated else "anonymous",
                "timestamp": timezone.now().isoformat(),
                "source": "django-api"
            }
        }

    def _forward_to_n8n(self, webhook_url, payload):
        """
        Forward request to n8n webhook and return proxied response
        
        Args:
            webhook_url: n8n webhook URL
            payload: Enriched payload to send
            
        Returns:
            Response: Django REST framework response
            
        Raises:
            requests.Timeout: If n8n doesn't respond in time
            requests.RequestException: For other network errors
        """
        headers = {
            "Content-Type": "application/json",
        }
        
        # Add authentication header if configured
        if hasattr(settings, 'N8N_SECRET_KEY') and settings.N8N_SECRET_KEY:
            headers["X-Internal-Secret"] = settings.N8N_SECRET_KEY

        logger.info(f"Proxying to n8n: {webhook_url}")
        logger.debug(f"Payload: {payload}")

        # Make request to n8n
        resp = requests.post(
            webhook_url,
            json=payload,
            headers=headers,
            timeout=10,  # 10 second timeout for workflow execution
            allow_redirects=False
        )

        logger.info(f"n8n response: {resp.status_code}")
        
        # Parse n8n's response
        try:
            response_data = resp.json() if resp.text else {}
        except ValueError:
            response_data = {"message": resp.text}

        # Map n8n status codes to appropriate responses
        if resp.status_code == 200:
            return Response(response_data, status=status.HTTP_200_OK)
        elif resp.status_code == 204:
            # n8n returned success with no content
            return Response(
                {"status": "success", "message": "Workflow triggered"}, 
                status=status.HTTP_200_OK
            )
        elif resp.status_code >= 400:
            logger.error(f"n8n error response: {resp.text}")
            return Response(
                {"error": "Workflow execution failed", "details": response_data}, 
                status=status.HTTP_502_BAD_GATEWAY
            )
        
        # Default: return whatever n8n returned
        return Response(response_data, status=resp.status_code)