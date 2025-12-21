# 🪝 System Hooks Documentation

## `useBoundSelectors()`

This project uses a centralized state management system (powered by **Zustand**) to share critical data across components without prop drilling.

The `useBoundSelectors` hook is the primary interface for accessing this shared state.

### 📦 Key Features
- **Global User State**: Access `currentUser` anywhere.
- **Authentication**: Check `isAuthenticated` status easily.
- **Actions**: Trigger `login` or `logout` from any component.
- **Reactive**: Components automatically re-render when state changes.

### 🚀 Usage

#### 1. Access User Information
```tsx
import { useBoundSelectors } from "@/hooks/useBoundSelectors";

function UserProfile() {
  const { currentUser, isAuthenticated } = useBoundSelectors();

  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {currentUser?.name}</h1>
      <p>{currentUser?.email}</p>
    </div>
  );
}
```

#### 2. Trigger Actions
```tsx
import { useBoundSelectors } from "@/hooks/useBoundSelectors";

function LogoutButton() {
  const { logout } = useBoundSelectors();

  return <button onClick={logout}>Sign Out</button>;
}
```

#### 3. Initialization (App.tsx)
The state is initialized automatically, but you might want to fetch the user on app load:

```tsx
// App.tsx
import { useEffect } from 'react';
import { useBoundSelectors } from '@/hooks/useBoundSelectors';

function App() {
  const { refreshUser } = useBoundSelectors();
  
  useEffect(() => {
    refreshUser();
  }, []);
  
  // ... rest of app
}
```

### 🛠 Under the Hood
The state is managed in `src/hooks/useBoundSelectors.ts` using Zustand. It automatically synchronizes with `AuthService` and `localStorage` to ensure persistence across reloads.
