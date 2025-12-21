# 🚀 Deploying Monorepo to Vercel

Since Vercel does not support Docker, we deploy this monorepo as two separate Vercel Projects linked to the same GitHub Repository.

## Project 1: Frontend
1. **New Project** in Vercel.
2. Select Repo: `starter-template-frontend`.
3. **Root Directory**: Edit to `frontend`.
4. **Framework Preset**: Vite.
5. **Environment Variables**:
   - `VITE_API_BASE_URL`: `https://your-backend-project.vercel.app/api`

## Project 2: Backend (Django Serverless)
1. **New Project** in Vercel.
2. Select Repo: `starter-template-frontend`.
3. **Root Directory**: Edit to `backend`.
4. **Framework Preset**: Other (Vercel detects Python).
5. **Environment Variables**:
   - `DJANGO_SECRET_KEY`: (Random String)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `.vercel.app`
   - `N8N_WEBHOOK_REPORT`: (Your n8n URL)
   - `N8N_SECRET_KEY`: (Your Secret)

## ⚠️ Important Considerations for Serverless Django
- **Database**: SQLite (default) **WILL NOT PERSIST** on Vercel. Every execution resets the file.
- **Solution**: You MUST use an external database (e.g., Neon Postgres, Supabase, or Railway Postgres) and add `DATABASE_URL` to env vars.
- **Timeouts**: Vercel functions time out after 10s (Hobby) or 60s (Pro). Ensure n8n requests are fast.
