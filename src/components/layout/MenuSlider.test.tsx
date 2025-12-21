import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MenuSlider } from './MenuSlider';
import { ThemeProvider } from '@/components/ui/theme-provider';

// Mock hook
const mockLogout = vi.fn();
const mockLogin = vi.fn();

vi.mock('@/hooks/useBoundSelectors', () => ({
    useBoundSelectors: vi.fn(),
    useSystemStore: {
        getState: () => ({
            fetchCurrentUser: vi.fn()
        })
    }
}));

// Import the mocked hook to manipulate its return value
import { useBoundSelectors } from '@/hooks/useBoundSelectors';

// Mock hooks
vi.mock('@/hooks/useHealthCheck', () => ({
    useHealthCheck: () => ({ data: { version: '1.0' }, loading: false, error: null }),
}));

// Mock Child Components
vi.mock('@/components/auth/LoginDialog', () => ({
    LoginDialog: (props: { onSuccess?: () => void }) => (
        <button onClick={props.onSuccess}>Mock Login Dialog Button</button>
    )
}));

// ResizeObserver mock
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('MenuSlider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default mock implementation
        vi.mocked(useBoundSelectors).mockReturnValue({
            currentUser: null,
            isAuthenticated: false,
            logout: mockLogout,
            login: mockLogin,
            isLoading: false,
            refreshUser: vi.fn(),
        });
    });

    it('renders toggle button initially', () => {
        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );
        expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('opens sidebar and shows login button when logged out', async () => {
         vi.mocked(useBoundSelectors).mockReturnValue({
            currentUser: null,
            isAuthenticated: false,
            logout: mockLogout,
            login: mockLogin,
            isLoading: false,
            refreshUser: vi.fn(),
        });

        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        // Open Menu
        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

        // Check for Brand title (Sheet content)
        expect(await screen.findByText("Brand")).toBeVisible();

        // Check for Mock Login Button
        expect(screen.getByText("Mock Login Dialog Button")).toBeVisible();
    });

    it('shows user info and logout button when logged in', async () => {
        vi.mocked(useBoundSelectors).mockReturnValue({
            currentUser: { id: 1, name: "Admin User", email: "admin@example.com" },
            isAuthenticated: true,
            logout: mockLogout,
            login: mockLogin,
            isLoading: false,
            refreshUser: vi.fn(),
        });

        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        // Open Menu
        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

        // Check for User Info
        expect(await screen.findByText("Admin User")).toBeVisible();
        expect(screen.getByText("admin@example.com")).toBeVisible();

        // Check for Logout Button
        expect(screen.getByText(/log out/i)).toBeInTheDocument();
    });

    it('calls logout service when logout clicked', async () => {
        vi.mocked(useBoundSelectors).mockReturnValue({
            currentUser: { id: 1, name: "Admin User", email: "admin@example.com" },
            isAuthenticated: true,
            logout: mockLogout,
            login: mockLogin,
            isLoading: false,
            refreshUser: vi.fn(),
        });

        render(
            <ThemeProvider>
                <MenuSlider />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
        
        await screen.findByText("Admin User");

        const logoutBtn = screen.getByRole('button', { name: /log out/i });
        fireEvent.click(logoutBtn);

        expect(mockLogout).toHaveBeenCalled();
    });
});
