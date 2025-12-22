# 🚀 Hosting a Monorepo on Vercel

This guide explains how to deploy a Monorepo (Frontend + Backend) using two separate Vercel projects linked to the same GitHub repository.

## 🏗️ Architecture
- **Repo Structure**:
  ```
  /frontend  (React/Vite)
  /backend   (Django)
  ```
- **Vercel Project A**: Deploys `/frontend`
- **Vercel Project B**: Deploys `/backend`

---

## 1️⃣ Setup Backend Project
1. Go to Vercel Dashboard -> **Add New Project**.
2. Select the **Run-Monorepo** (or your repo name) repository.
3. **Project Name**: `my-app-backend`
4. **Framework Preset**: `Other` (Vercel will auto-detect Python).
5. **Root Directory**:
   - Click **Edit**.
   - Set to `backend`.
6. **Environment Variables**:
   - `DJANGO_SECRET_KEY`: `...`
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `.vercel.app`
   - `N8N_WEBHOOK_HEALTHCHECK`: `...`
   - `N8N_SECRET_KEY`: `...`
7. **Deploy**.
8. **Copy the Domain**: (e.g., `https://my-app-backend.vercel.app`).

> **⚠️ Important**: Ensure "Build Command" and "Output Directory" overrides are **OFF** in Project Settings > General if you previously had a root `vercel.json`.

---

## 2️⃣ Setup Frontend Project
1. Go to Vercel Dashboard -> **Add New Project**.
2. Select the **SAME** repository.
3. **Project Name**: `my-app-frontend`
4. **Framework Preset**: `Vite` (should auto-detect).
5. **Root Directory**:
   - Click **Edit**.
   - Set to `frontend`.
6. **Environment Variables**:
   - `VITE_API_BASE_URL`: `https://my-app-backend.vercel.app/api` (The URL from Step 1).
7. **Deploy**.

---

## 3️⃣ Verification
1. Open your Frontend URL.
2. Check the **Backend Status** indicator (e.g., in the Menu).
   - ✅ **Online**: Connected successfully.
   - ❌ **Offline**: Check `VITE_API_BASE_URL` or Backend logs.

## 📝 Configuration Files
- **`backend/vercel.json`**: Controls Python build settings (rewrites to WSGI).
- **`frontend/vercel.json`**: Controls SPA routing (rewrites to index.html).
- **Root `vercel.json`**: **DO NOT USE**. It causes conflicts between the two projects.
