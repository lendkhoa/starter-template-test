# Starter Template (Monorepo)

This repository contains both the React frontend and Django backend for the application.

## 📂 Structure

- **`frontend/`**:  React + Vite + TypeScript application.
- **`backend/`**: Django REST Framework API + n8n Proxy.
- **`docs/`**: Project documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### Backend Setup
1. Navigate to backend: `cd backend`
2. Create virtual env: `python3 -m venv venv`
3. Activate: `source venv/bin/activate`
4. Install: `pip install -r requirements.txt`
5. Migrate: `python manage.py migrate`
6. Create User: `python manage.py createsuperuser`
7. Run: `python manage.py runserver`

### Frontend Setup
1. Navigate to frontend: `cd frontend`
2. Install: `npm install`
3. Run: `npm run dev`

## 🔗 Architecture
See [docs/ARCHITECTURE_DJANGO_N8N_PROXY.md](docs/ARCHITECTURE_DJANGO_N8N_PROXY.md) for details on the backend proxy.
