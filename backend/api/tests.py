"""
Unit tests for API views
Tests health checks, user info, and n8n workflow triggers
"""
from django.test import TestCase, override_settings
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, Mock
import requests


class HealthCheckViewTest(TestCase):
    """Test cases for the HealthCheckView"""
    
    def setUp(self):
        self.client = APIClient()
    
    def test_health_check_returns_ok(self):
        """Test that health check endpoint returns 200 OK"""
        response = self.client.get('/api/health/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'ok')
        self.assertEqual(response.data['version'], '1.0.0')
    
    def test_health_check_no_authentication_required(self):
        """Test that health check works without authentication"""
        # Explicitly test without any authentication
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class MeViewTest(TestCase):
    """Test cases for the MeView"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_me_view_requires_authentication(self):
        """Test that /me endpoint requires authentication"""
        response = self.client.get('/api/me/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_me_view_returns_user_info(self):
        """Test that /me returns authenticated user's information"""
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/me/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['name'], 'testuser')
        self.assertEqual(response.data['email'], 'test@example.com')
    
    def test_me_view_with_user_without_email(self):
        """Test /me endpoint with user that has no email attribute"""
        user_no_email = User.objects.create_user(
            username='noemail',
            password='testpass123'
        )
        user_no_email.email = ''
        user_no_email.save()
        
        self.client.force_authenticate(user=user_no_email)
        response = self.client.get('/api/me/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should return default email when user email is empty
        self.assertIn('email', response.data)


@override_settings(
    N8N_WEBHOOKS={
        'test-workflow': 'https://n8n.example.com/webhook/test',
        'healthcheck': 'https://n8n.example.com/webhook/healthcheck'
    },
    N8N_SECRET_KEY='test-secret-key'
)
class TriggerWorkflowViewTest(TestCase):
    """Test cases for the TriggerWorkflowView"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
    
    def test_missing_slug_returns_400(self):
        """Test that missing slug parameter returns 400 Bad Request"""
        response = self.client.post('/api/workflows/trigger/', {
            'payload': {'data': 'test'}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertIn('slug', response.data['error'])
    
    def test_unknown_workflow_returns_404(self):
        """Test that unknown workflow slug returns 404 Not Found"""
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'unknown-workflow',
            'payload': {'data': 'test'}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)
        self.assertIn('not found', response.data['error'].lower())
    
    @patch('api.views.requests.post')
    def test_successful_workflow_trigger(self, mock_post):
        """Test successful workflow trigger with 200 response from n8n"""
        # Mock successful n8n response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'result': 'success', 'data': 'processed'}
        mock_response.text = '{"result": "success"}'
        mock_post.return_value = mock_response
        
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {'message': 'hello'}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['result'], 'success')
        
        # Verify the request to n8n was made correctly
        mock_post.assert_called_once()
        call_args = mock_post.call_args
        
        # Check URL
        self.assertEqual(call_args[0][0], 'https://n8n.example.com/webhook/test')
        
        # Check payload structure
        payload = call_args[1]['json']
        self.assertIn('input', payload)
        self.assertIn('meta', payload)
        self.assertEqual(payload['input']['message'], 'hello')
        self.assertEqual(payload['meta']['user_id'], self.user.id)
        self.assertEqual(payload['meta']['user_name'], 'testuser')
        
        # Check headers
        headers = call_args[1]['headers']
        self.assertEqual(headers['Content-Type'], 'application/json')
        self.assertEqual(headers['X-Internal-Secret'], 'test-secret-key')
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_with_anonymous_user(self, mock_post):
        """Test workflow trigger without authentication"""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'result': 'success'}
        mock_response.text = '{"result": "success"}'
        mock_post.return_value = mock_response
        
        # Don't authenticate
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {'message': 'hello'}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify anonymous user metadata
        payload = mock_post.call_args[1]['json']
        self.assertIsNone(payload['meta']['user_id'])
        self.assertEqual(payload['meta']['user_name'], 'anonymous')
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_with_204_response(self, mock_post):
        """Test workflow trigger when n8n returns 204 No Content"""
        mock_response = Mock()
        mock_response.status_code = 204
        mock_response.text = ''
        mock_post.return_value = mock_response
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertIn('triggered', response.data['message'].lower())
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_timeout(self, mock_post):
        """Test workflow trigger when n8n times out"""
        mock_post.side_effect = requests.Timeout()
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_504_GATEWAY_TIMEOUT)
        self.assertIn('error', response.data)
        self.assertIn('timed out', response.data['error'].lower())
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_connection_error(self, mock_post):
        """Test workflow trigger when n8n is unreachable"""
        mock_post.side_effect = requests.ConnectionError()
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertIn('error', response.data)
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_n8n_error_response(self, mock_post):
        """Test workflow trigger when n8n returns an error"""
        mock_response = Mock()
        mock_response.status_code = 500
        mock_response.json.return_value = {'error': 'Internal server error'}
        mock_response.text = '{"error": "Internal server error"}'
        mock_post.return_value = mock_response
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_502_BAD_GATEWAY)
        self.assertIn('error', response.data)
        self.assertIn('details', response.data)
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_empty_payload(self, mock_post):
        """Test workflow trigger with empty payload"""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {'result': 'success'}
        mock_response.text = '{"result": "success"}'
        mock_post.return_value = mock_response
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow'
            # No payload provided
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify empty payload is sent as empty dict
        payload = mock_post.call_args[1]['json']
        self.assertEqual(payload['input'], {})
    
    @patch('api.views.requests.post')
    def test_workflow_trigger_invalid_json_response(self, mock_post):
        """Test workflow trigger when n8n returns invalid JSON"""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.side_effect = ValueError('Invalid JSON')
        mock_response.text = 'Not valid JSON'
        mock_post.return_value = mock_response
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should return text as message when JSON parsing fails
        self.assertEqual(response.data['message'], 'Not valid JSON')
    
    @patch('api.views.requests.post')
    def test_metadata_includes_timestamp(self, mock_post):
        """Test that metadata includes ISO format timestamp"""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {}
        mock_response.text = '{}'
        mock_post.return_value = mock_response
        
        response = self.client.post('/api/workflows/trigger/', {
            'slug': 'test-workflow',
            'payload': {}
        }, format='json')
        
        payload = mock_post.call_args[1]['json']
        self.assertIn('timestamp', payload['meta'])
        self.assertEqual(payload['meta']['source'], 'django-api')
        
        # Verify timestamp is in ISO format
        timestamp = payload['meta']['timestamp']
        self.assertIsInstance(timestamp, str)
        # Should be parseable as ISO format
        from datetime import datetime
        datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
