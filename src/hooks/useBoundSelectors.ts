import { create } from 'zustand';
import { AuthService } from '@/services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SystemState {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
}

// Create the Zustand store
export const useSystemStore = create<SystemState>((set) => ({
  currentUser: null,
  isLoading: true,
  isAuthenticated: AuthService.isAuthenticated(),

  login: (user, token) => {
    localStorage.setItem('auth_token', token);
    set({ currentUser: user, isAuthenticated: true });
  },

  logout: () => {
    AuthService.logout();
    set({ currentUser: null, isAuthenticated: false });
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
        const user = await AuthService.getCurrentUser();
        if (user) {
            set({ currentUser: user, isAuthenticated: true });
        } else {
            set({ currentUser: null, isAuthenticated: false });
        }
    } catch (error) {
        console.error("Failed to fetch user", error);
        set({ currentUser: null, isAuthenticated: false });
    } finally {
        set({ isLoading: false });
    }
  },

  setCurrentUser: (user) => set({ currentUser: user })
}));

// The "Bound Selectors" hook as requested
export const useBoundSelectors = () => {
  const store = useSystemStore();
  
  return {
    currentUser: store.currentUser,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login: store.login,
    logout: store.logout,
    refreshUser: store.fetchCurrentUser,
    // Add other shared selectors here
  };
};
