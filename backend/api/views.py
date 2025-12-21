from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests

class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "ok", "version": "1.0.0"})

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # In a real app, this returns the User model
        user = request.user
        return Response({
            "id": user.id,
            "name": user.username,
            "email": getattr(user, 'email', 'user@example.com')
        })

class TriggerWorkflowView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        workflow_slug = request.data.get("slug")
        payload = request.data.get("payload", {})

        # 1. Look up URL (Phase 1: Static Logic)
        webhook_url = settings.N8N_WEBHOOKS.get(workflow_slug)
        
        if not webhook_url:
            return Response({"error": f"Workflow '{workflow_slug}' not found"}, status=404)

        # 2. Forward Request to n8n (Server-to-Server)
        try:
            # Add security headers and metadata
            headers = {
                "X-Internal-Secret": settings.N8N_SECRET_KEY,
                "Content-Type": "application/json"
            }
            
            # Enrich payload with user info
            enriched_payload = {
                "input": payload,
                "meta": {
                    "user_id": request.user.id,
                    "user_name": request.user.username,
                    "timestamp": "now"
                }
            }

            # Fire and forget (or wait for response depending on use case)
            # For this MVP, we wait briefly or just assume success if async
            resp = requests.post(webhook_url, json=enriched_payload, headers=headers, timeout=5)
            
            if resp.status_code >= 400:
                return Response({"error": "Automation server error"}, status=502)

        except requests.RequestException as e:
             # Log error here
            return Response({"error": "Failed to reach automation server"}, status=504)

        return Response({"status": "queued", "message": "Workflow started"}, status=202)
