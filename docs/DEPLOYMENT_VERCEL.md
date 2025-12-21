# 🚀 Deploying to Vercel (Free)

This project is optimized for deployment on Vercel's free tier.

## 📋 Prerequisites
- A [Vercel Account](https://vercel.com/signup).
- A [GitHub Account](https://github.com).
- Your project pushed to a GitHub repository.

## ⚡ Deployment Steps

### 1. Import Project
1. Log in to your Vercel Dashboard.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`starter-template-frontend`).
4. Click **Import**.

### 2. Configure Build Settings
Vercel generally auto-detects Vite projects, but verify these settings:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables
Add the following variables in the **Environment Variables** section:

| Variable | Description | Value (Example) |
|----------|-------------|-----------------|
| `VITE_API_BASE_URL` | Your backend URL | `https://api.myapp.com/api` (or empty for mock) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `1234...apps.googleusercontent.com` |

> **Note**: For the "Mock" backend to work, you don't need `VITE_API_BASE_URL`.

### 4. Deploy
Click **Deploy**. Vercel will build your app and assign a domain (e.g., `your-app.vercel.app`).

---

## 🔧 Post-Deployment Setup

### Google Auth
If you are using Google Login:
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Edit your OAuth Credentials.
3. Add your new Vercel domain (e.g., `https://starter-template-frontend.vercel.app`) to:
   - **Authorized JavaScript origins**
   - **Authorized redirect URIs**

### Custom Domain (Optional)
On Vercel, go to **Settings > Domains** to add your own domain (e.g., `www.myapp.com`). Vercel handles SSL automatically.
