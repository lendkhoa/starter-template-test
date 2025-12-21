# 🔐 Productionizing Google Login

Currently, the Google Login feature is **mocked**. To make it work in production, you need to integrate with Google's real OAuth infrastructure.

## 📋 High-Level Flow
1. **Frontend**: Uses Google SDK to popup a login window.
2. **Frontend**: Receives an `id_token` (JWT) from Google upon success.
3. **Frontend**: Sends this `id_token` to your Backend.
4. **Backend**: Verifies the token with Google servers.
5. **Backend**: Creates/Finds the user in your DB and returns your own `auth_token` (Session/JWT).

---

## 🚀 Step 1: Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. **Create a New Project** (e.g., "My SaaS App").
3. Navigate to **APIs & Services > Credentials**.
4. **Configure OAuth Consent Screen**:
   - User Type: **External**.
   - Fill in App Name, Logo, and Support Email.
5. **Create Credentials**:
   - Click **Create Credentials > OAuth client ID**.
   - Application Type: **Web application**.
   - **Authorized JavaScript origins**:
     - Dev: `http://localhost:5173`
     - Prod: `https://your-domain.com`
   - **Authorized redirect URIs**:
     - Dev: `http://localhost:5173`
     - Prod: `https://your-domain.com`
6. **Copy Client ID**: You will need this string (e.g., `1234...apps.googleusercontent.com`).

---

## 💻 Step 2: Frontend Implementation

### 1. Install OAuth Library
We recommend using `@react-oauth/google` for a modern React implementation.

```bash
npm install @react-oauth/google
```

### 2. Configure Provider
Wrap your app (mock implementation shown):

```tsx
// src/main.tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <App />
</GoogleOAuthProvider>
```

### 3. Update `.env`
```env
VITE_GOOGLE_CLIENT_ID=your-real-google-client-id
```

### 4. Replace Mock Logic in `LoginDialog.tsx`
Instead of the custom button, use the hook or component:

```tsx
import { useGoogleLogin } from '@react-oauth/google';

const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    // Send token to your backend
    const res = await AuthService.loginWithGoogle(tokenResponse.access_token);
  },
});
```

---

## ⚙️ Step 3: Backend Implementation

Your backend must verify the token. **Do not trust the frontend.**

### Example (Node/Express)
Using `google-auth-library`:

```typescript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If verified, query your DB for this email/sub and return your JWT
}
```

---

## 🛡️ Security Best Practices
- **Never expose Client Secret** on the frontend (Vite only needs Client ID).
- **Verify on Backend**: Always validate the token on the server side before issuing a session.
- **HTTPS**: OAuth requires HTTPS (except localhost).
