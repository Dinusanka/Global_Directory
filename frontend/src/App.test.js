import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const renderWithAuth = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

test('shows error on invalid login', () => {
  renderWithAuth(<Login />);
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: 'wrong' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'wrong' },
  });
  fireEvent.click(screen.getByText(/Login/i));
  expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
});

test('successful login redirects (mock)', () => {
  delete window.location;
  window.location = { href: '' };
  renderWithAuth(<Login />);
  fireEvent.change(screen.getByPlaceholderText(/Username/i), {
    target: { value: 'Dinus' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'Dinus' },
  });
  fireEvent.click(screen.getByText(/Login/i));
  expect(window.location.href).toBe('/');
});
