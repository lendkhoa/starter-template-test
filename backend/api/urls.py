from django.urls import path
from .views import TriggerWorkflowView, HealthCheckView, MeView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health'),
    path('me/', MeView.as_view(), name='me'),
    path('workflows/trigger/', TriggerWorkflowView.as_view(), name='trigger-workflow'),
]
