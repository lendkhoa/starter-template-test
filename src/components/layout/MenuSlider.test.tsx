import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MenuSlider } from './MenuSlider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthService } from '@/services/api';

// Mock hooks
vi.mock('@/hooks/useHealthCheck', () => ({
    useHealthCheck: () => ({ data: { version: '1.0' }, loading: false, error: null }),
}));

// Mock API
vi.mock('@/services/api', () => ({
    AuthService: {
        isAuthenticated: vi.fn(),
        login: vi.fn(),
        loginWithGoogle: vi.fn(),
        logout: vi.fn(),
    },
}));

// Mock Child Components to simplify testing content
vi.mock('@/components/auth/LoginDialog', () => ({
    LoginDialog: (props: { onSuccess?: () => void }) => (
        <button onClick={props.onSuccess}>Mock Login Dialog Button</button>
    )
}));

// ResizeObserver mock for Radix UI
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('MenuSlider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders toggle button initially', () => {
        vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('opens sidebar and shows login button when logged out', async () => {
        vi.mocked(AuthService.isAuthenticated).mockReturnValue(false);
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        // Open Menu
        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

        // Check for Brand title (Sheet content)
        expect(await screen.findByText("Brand")).toBeVisible();

        // Check for Mock Login Button (from LoginDialog mock)
        expect(screen.getByText("Mock Login Dialog Button")).toBeVisible();
    });

    it('shows user info and logout button when logged in', async () => {
        vi.mocked(AuthService.isAuthenticated).mockReturnValue(true);
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        // Open Menu
        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

        // Check for User Info (New Design)
        expect(await screen.findByText("Admin User")).toBeVisible();
        expect(screen.getByText("admin@example.com")).toBeVisible();

        // Check for Logout Button (Icon button with sr-only text)
        expect(screen.getByText(/log out/i)).toBeInTheDocument();
    });

    it('calls logout service when logout clicked', async () => {
        vi.mocked(AuthService.isAuthenticated).mockReturnValue(true);
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
        
        const logoutBtn = await screen.findByRole('button', { name: /log out/i });
        fireEvent.click(logoutBtn);

        expect(AuthService.logout).toHaveBeenCalled();
    });
});
