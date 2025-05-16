import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const mockNavigate = jest.fn();
const mockLogout = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithUser = (user = null) => {
    useAuth.mockReturnValue({ user, logout: mockLogout });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  it('renders logo and main nav links', () => {
    renderWithUser();

    expect(screen.getByText('Global Directory')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('shows Login and Signup buttons when user is not logged in', () => {
    renderWithUser(null);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
  });

  it('shows Favorites and Logout buttons when user is logged in', () => {
    renderWithUser({ name: 'Test User' });

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('calls navigate when nav buttons are clicked', () => {
    renderWithUser({ name: 'Test User' });

    fireEvent.click(screen.getByText('Explore'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(screen.getByText('Countries'));
    expect(mockNavigate).toHaveBeenCalledWith('/countries');

    fireEvent.click(screen.getByText('Favorites'));
    expect(mockNavigate).toHaveBeenCalledWith('/favorites');
  });

  it('calls logout and redirects to home on logout click', () => {
    renderWithUser({ name: 'Test User' });

    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to login/signup when user is not logged in', () => {
    renderWithUser(null);

    fireEvent.click(screen.getByText('Login'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');

    fireEvent.click(screen.getByText('Signup'));
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('navigates to home when clicking on logo', () => {
    renderWithUser(null);
    fireEvent.click(screen.getByText('Global Directory'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
