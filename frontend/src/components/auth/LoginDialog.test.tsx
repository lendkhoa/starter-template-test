import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginDialog } from './LoginDialog';
import { AuthService } from '@/services/api';

vi.mock('@/services/api', () => ({
  AuthService: {
    login: vi.fn(),
    loginWithGoogle: vi.fn(),
  },
}));

describe('LoginDialog', () => {
    it('renders trigger button', () => {
        render(<LoginDialog />);
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('opens dialog on click', () => {
        render(<LoginDialog />);
        fireEvent.click(screen.getByText(/sign in/i));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('handles Google login', async () => {
        render(<LoginDialog />);
        fireEvent.click(screen.getByText(/sign in/i));
        
        const googleBtn = screen.getByText(/sign in with google/i);
        fireEvent.click(googleBtn);
        
        expect(AuthService.loginWithGoogle).toHaveBeenCalled();
    });

    it('handles normal login', async () => {
        render(<LoginDialog onSuccess={vi.fn()} />);
        fireEvent.click(screen.getByText(/sign in/i));
        
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: "Sign In" })); // The submit button inside form
        
        await waitFor(() => {
            expect(AuthService.login).toHaveBeenCalledWith('test@example.com', 'password');
        });
    });
});
