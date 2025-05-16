import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryDetailPage from '../CountryDetailPage'; // Adjust path as needed
import { useLocation, useParams } from 'react-router-dom';
import * as AuthContextModule from '../../auth/AuthContext';

// 🔸 Mock MUI icons to avoid rendering SVG
jest.mock('@mui/icons-material/Favorite', () => () => <span data-testid="favorite-icon">★</span>);

// 🔹 Mock react-router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

describe('CountryDetailPage', () => {
  const mockCountry = {
    cca2: 'US',
    cca3: 'USA',
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    subregion: 'Northern America',
    population: 331000000,
    area: 9833520,
    languages: { eng: 'English' },
    timezones: ['UTC-05:00'],
    idd: { root: '1', suffixes: ['202'] },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } },
    borders: ['CAN', 'MEX'],
    maps: { googleMaps: 'https://maps.google.com/usa' },
    flags: { png: 'https://flagcdn.com/us.png' },
  };

  const renderWithMocks = ({ country = mockCountry, user = { favorites: ['US'] }, code = 'US' } = {}) => {
    jest.spyOn(AuthContextModule, 'useAuth').mockReturnValue({ user });
    useLocation.mockReturnValue({ state: country ? { country } : null });
    useParams.mockReturnValue({ code });

    return render(<CountryDetailPage />);
  };

  it('renders country details correctly when country is provided', () => {
    renderWithMocks();
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United States of America')).toBeInTheDocument();
    expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    expect(screen.getByText('Northern America')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText(/331,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/9,833,520 km²/)).toBeInTheDocument();
    expect(screen.getByText(/English/)).toBeInTheDocument();
    expect(screen.getByText(/\+1202/)).toBeInTheDocument();
    expect(screen.getByText(/United States dollar/)).toBeInTheDocument();
    expect(screen.getByText('CAN, MEX')).toBeInTheDocument();
    expect(screen.getByText('View on Google Maps')).toHaveAttribute('href', 'https://maps.google.com/usa');
  });

  it('shows favorite icon if country is in user favorites', () => {
    renderWithMocks();
    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });

  it('does not show favorite icon if country is not in user favorites', () => {
    renderWithMocks({ user: { favorites: [] } });
    expect(screen.queryByTestId('favorite-icon')).not.toBeInTheDocument();
  });

  it('shows fallback message when no country data is available', () => {
    renderWithMocks({ country: null });
    expect(screen.getByText(/No country data found for US/i)).toBeInTheDocument();
  });
});
