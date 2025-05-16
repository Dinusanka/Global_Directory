import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritesPage from '../favoritesPage';
import * as AuthContextModule from '../../auth/AuthContext'; // <-- adjust path accordingly

// Mock CountryCard to simplify
jest.mock('../../components/CountryCard', () => ({ country }) => (
  <div data-testid="country-card">{country.name.common}</div>
));

describe('FavoritesPage', () => {
  const mockToggleFavorite = jest.fn();

  const mockFavorites = [
    { cca3: 'USA', name: { common: 'United States' } },
    { cca3: 'CAN', name: { common: 'Canada' } },
  ];

  const renderWithAuth = (user = null) => {
    jest.spyOn(AuthContextModule, 'useAuth').mockReturnValue({ user });

    return render(
      <FavoritesPage favorites={mockFavorites} toggleFavorite={mockToggleFavorite} />
    );
  };

  it('renders the page title', () => {
    renderWithAuth({ name: 'testuser' });
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('renders all favorite countries', () => {
    renderWithAuth({ name: 'testuser' });
    expect(screen.getAllByTestId('country-card')).toHaveLength(mockFavorites.length);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('shows countries even when user is not logged in', () => {
    renderWithAuth(null);
    expect(screen.getAllByTestId('country-card')).toHaveLength(mockFavorites.length);
  });
});
