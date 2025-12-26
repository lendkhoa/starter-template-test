import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProfilePage } from './ProfilePage';
import * as selectors from '@/hooks/useBoundSelectors';

// Mock the hooks
vi.mock('@/hooks/useBoundSelectors', () => ({
  useBoundSelectors: vi.fn(),
}));

type MockBoundSelectors = ReturnType<typeof selectors.useBoundSelectors>;

describe('ProfilePage', () => {
  it('shows login prompt when not authenticated', () => {
    vi.mocked(selectors.useBoundSelectors).mockReturnValue({
      isAuthenticated: false,
      currentUser: null,
      isLoading: false,
      login: vi.fn(),
      refreshUser: vi.fn(),
      logout: vi.fn(),
      fetchCurrentUser: vi.fn(),
    } as MockBoundSelectors);

    render(<ProfilePage />);
    expect(screen.getByText('Please sign in')).toBeInTheDocument();
  });

  it('renders profile page when authenticated', () => {
    vi.mocked(selectors.useBoundSelectors).mockReturnValue({
      isAuthenticated: true,
      currentUser: { id: 1, name: 'John Doe', email: 'john@example.com' },
      isLoading: false,
      login: vi.fn(),
      refreshUser: vi.fn(),
      logout: vi.fn(),
      fetchCurrentUser: vi.fn(),
    } as MockBoundSelectors);

    render(<ProfilePage />);
    const names = screen.getAllByText('John Doe');
    expect(names.length).toBeGreaterThan(0);
    const emails = screen.getAllByText('john@example.com');
    expect(emails.length).toBeGreaterThan(0);
  });

  it('toggles edit mode when edit button is clicked', () => {
    vi.mocked(selectors.useBoundSelectors).mockReturnValue({
      isAuthenticated: true,
      currentUser: { id: 1, name: 'John Doe', email: 'john@example.com' },
      isLoading: false,
      login: vi.fn(),
      refreshUser: vi.fn(),
      logout: vi.fn(),
      fetchCurrentUser: vi.fn(),
    } as MockBoundSelectors);

    render(<ProfilePage />);
    
    const editButton = screen.getByText('Edit Profile');
    fireEvent.click(editButton);
    
    expect(screen.getByText('Editing Mode')).toBeInTheDocument();
  });

  it('renders back button', () => {
    vi.mocked(selectors.useBoundSelectors).mockReturnValue({
      isAuthenticated: true,
      currentUser: { id: 1, name: 'John Doe', email: 'john@example.com' },
      isLoading: false,
      login: vi.fn(),
      refreshUser: vi.fn(),
      logout: vi.fn(),
      fetchCurrentUser: vi.fn(),
    } as MockBoundSelectors);

    render(<ProfilePage />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});
