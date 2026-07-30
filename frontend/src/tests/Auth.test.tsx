import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
};

describe('Auth Page Tests', () => {
  it('renders Login form correctly', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Sign in to your luxury inventory portal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/admin@dealership.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
  });

  it('allows user input in email and password fields', () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(/admin@dealership.com/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/••••••••/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('secret123');
  });
});
