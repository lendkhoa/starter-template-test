import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MenuSlider } from './MenuSlider';
import { ThemeProvider } from '@/components/ui/theme-provider';

// Mock hooks and services
vi.mock('@/hooks/useHealthCheck', () => ({
    useHealthCheck: () => ({ data: { version: '1.0' }, loading: false, error: null }),
}));
vi.mock('@/services/api', () => ({
    AuthService: {
        isAuthenticated: () => false,
        login: vi.fn(),
        loginWithGoogle: vi.fn(),
        logout: vi.fn(),
    },
}));
vi.mock('@/components/auth/LoginDialog', () => ({
    LoginDialog: () => <button>Mock Login</button>
}));

// ResizeObserver mock for Radix
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('MenuSlider', () => {
    it('renders toggle button', () => {
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });
});
