import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProfileForm } from './ProfileForm';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ProfileForm', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const defaultProps = {
    user: mockUser,
    isEditing: false,
    onCancel: vi.fn(),
    onSave: vi.fn(),
  };

  it('renders user information in view mode', () => {
    render(<ProfileForm {...defaultProps} />);
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders editable inputs in edit mode', () => {
    render(<ProfileForm {...defaultProps} isEditing={true} />);
    
    expect(screen.getByText('Edit Information')).toBeInTheDocument();
    
    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('shows action buttons in edit mode', () => {
    render(<ProfileForm {...defaultProps} isEditing={true} />);
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<ProfileForm {...defaultProps} isEditing={true} onCancel={onCancel} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalled();
  });

  it('validates required fields on submit', () => {
    render(<ProfileForm {...defaultProps} isEditing={true} />);
    
    const nameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(nameInput, { target: { value: '' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(toast.error).toHaveBeenCalledWith('Name is required');
  });

  it('calls onSave when form is submitted with valid data', () => {
    const onSave = vi.fn();
    render(<ProfileForm {...defaultProps} isEditing={true} onSave={onSave} />);
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(toast.success).toHaveBeenCalledWith('Profile updated successfully!');
    expect(onSave).toHaveBeenCalled();
  });

  it('updates form data when inputs change', () => {
    render(<ProfileForm {...defaultProps} isEditing={true} />);
    
    const nameInput = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    
    expect(nameInput.value).toBe('Jane Doe');
  });
});
