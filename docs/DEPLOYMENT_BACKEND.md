# 🚀 Deploying the Django Backend

The backend is containerized and ready for deployment on any Docker-compatible hosting (Railway, Render, Fly.io, AWS App Runner).

## 🐳 Docker Deployment (Recommended)

### 1. Build & Run Locally
```bash
docker-compose up --build
```

### 2. Permissions
The backend runs on port `8000`.
Ensure your Frontend (`VITE_API_BASE_URL`) points to this backend URL.

## 🛠️ Environment Variables
Set these on your production server:

| Variable | Description |
|----------|-------------|
| `DJANGO_SECRET_KEY` | Strong random string |
| `DEBUG` | `False` (in production) |
| `ALLOWED_HOSTS` | Your domain (e.g. `api.myapp.com`) |
| `N8N_SECRET_KEY` | Shared secret with n8n |
| `N8N_WEBHOOK_REPORT` | Full URL to n8n webhook |

## ☁️ Provider Specifics

### Railway / Render
1. Connect your GitHub Repo.
2. Set Root Directory to `backend`.
3. Set Build Command: `pip install -r requirements.txt && python manage.py migrate`
4. Set Start Command: `gunicorn core.wsgi:application`
