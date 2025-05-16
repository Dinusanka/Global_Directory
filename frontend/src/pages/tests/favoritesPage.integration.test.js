import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesPage from '../favoritesPage';
import { useAuth } from '../../auth/AuthContext';

// Mock the useAuth hook
jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock CountryCard component
jest.mock('../../components/CountryCard', () => {
  const React = require('react');
  return ({ country, isFavorite, toggleFavorite, showStar }) => (
    React.createElement('div', { 'data-testid': 'country-card' },
      React.createElement('span', null, country.name.common),
      React.createElement('span', null, isFavorite ? '⭐' : '☆'),
      showStar && React.createElement('button', { onClick: () => toggleFavorite(country), 'aria-label': 'toggle favorite' }, 'Toggle Favorite')
    )
  );
});

describe('FavoritesPage Integration Test', () => {
  const mockToggleFavorite = jest.fn();

  const favoritesMock = [
    { cca3: 'USA', name: { common: 'United States' } },
    { cca3: 'FRA', name: { common: 'France' } },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders heading and favorite countries', () => {
    useAuth.mockReturnValue({ user: { name: 'Test User' } });

    render(React.createElement(FavoritesPage, { favorites: favoritesMock, toggleFavorite: mockToggleFavorite }));

    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();

    favoritesMock.forEach((country) => {
      expect(screen.getByText(country.name.common)).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole('button', { name: /toggle favorite/i });
    expect(buttons.length).toBe(favoritesMock.length);
  });

  test('does NOT show toggle star button if no user', () => {
    useAuth.mockReturnValue({ user: null });

    render(React.createElement(FavoritesPage, { favorites: favoritesMock, toggleFavorite: mockToggleFavorite }));

    expect(screen.queryByRole('button', { name: /toggle favorite/i })).not.toBeInTheDocument();

    favoritesMock.forEach((country) => {
      expect(screen.getByText(country.name.common)).toBeInTheDocument();
    });
  });

  test('calls toggleFavorite when star button clicked', () => {
    useAuth.mockReturnValue({ user: { name: 'Test User' } });

    render(React.createElement(FavoritesPage, { favorites: favoritesMock, toggleFavorite: mockToggleFavorite }));

    const button = screen.getAllByRole('button', { name: /toggle favorite/i })[0];
    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledWith(favoritesMock[0]);
  });
});
