import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountriesPage from '../countriesPage';  
import * as AuthContextModule from '../../auth/AuthContext';

// Mock CountryCard to simplify testing and avoid rendering details
jest.mock('../../components/CountryCard', () => ({ country, isFavorite, toggleFavorite, showStar }) => (
  <div data-testid="country-card" data-code={country.cca3}>
    <span>{country.name.common}</span>
    <span>{isFavorite ? '★' : '☆'}</span>
    {showStar && <button onClick={() => toggleFavorite(country)}>Toggle Favorite</button>}
  </div>
));

// Mock recharts ResponsiveContainer to render children directly (bypass SVG complexities)
jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  };
});

describe('CountriesPage Integration', () => {
  const mockCountries = [
    {
      cca3: 'USA',
      cca2: 'US',
      name: { common: 'United States' },
      region: 'Americas',
      population: 331000000,
    },
    {
      cca3: 'CAN',
      cca2: 'CA',
      name: { common: 'Canada' },
      region: 'Americas',
      population: 37000000,
    },
    {
      cca3: 'FRA',
      cca2: 'FR',
      name: { common: 'France' },
      region: 'Europe',
      population: 67000000,
    },
    {
      cca3: 'IND',
      cca2: 'IN',
      name: { common: 'India' },
      region: 'Asia',
      population: 1380000000,
    },
    {
      cca3: 'AUS',
      cca2: 'AU',
      name: { common: 'Australia' },
      region: 'Oceania',
      population: 25000000,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithAuth = (user) => {
    jest.spyOn(AuthContextModule, 'useAuth').mockReturnValue({ user });
    return render(<CountriesPage countries={mockCountries} toggleFavorite={jest.fn()} />);
  };

  it('renders the header with countries count', () => {
    renderWithAuth(null);
    expect(screen.getByText(`Countries (${mockCountries.length})`)).toBeInTheDocument();
  });

  it('renders pie charts for regions and population', () => {
    renderWithAuth(null);
    expect(screen.getAllByTestId('responsive-container').length).toBe(2); // 2 charts
    expect(screen.getByText('Country Count by Region')).toBeInTheDocument();
    expect(screen.getByText('Top 5 Populous Countries')).toBeInTheDocument();
  });

  



  it('calls toggleFavorite when toggle button clicked', () => {
    const user = { favorites: [] };
    const toggleFavoriteMock = jest.fn();

    jest.spyOn(AuthContextModule, 'useAuth').mockReturnValue({ user });

    render(<CountriesPage countries={mockCountries} toggleFavorite={toggleFavoriteMock} />);

    const toggleButtons = screen.getAllByText('Toggle Favorite');
    fireEvent.click(toggleButtons[0]);

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockCountries[0]);
  });
});
