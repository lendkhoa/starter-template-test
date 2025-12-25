import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Import Django and set it up
import django
django.setup()

# Import the WSGI application
from core.wsgi import application

# Export for Vercel
app = application