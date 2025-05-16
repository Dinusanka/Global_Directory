
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('CountryCard', () => {
  const mockCountry = {
    name: { common: 'Testland' },
    cca3: 'TST',
    region: 'Asia',
    population: 123456,
    flags: { png: 'https://example.com/flag.png' },
  };

  const toggleFavoriteMock = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ user: { name: 'Test User' } });
  });

  it('renders country details correctly', () => {
    render(
      <MemoryRouter>
        <CountryCard
          country={mockCountry}
          isFavorite={false}
          toggleFavorite={toggleFavoriteMock}
          showStar={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText(/Region: Asia/i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 123,456/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.png);
  });

  it('calls toggleFavorite when star icon is clicked', () => {
    render(
      <MemoryRouter>
        <CountryCard
          country={mockCountry}
          isFavorite={false}
          toggleFavorite={toggleFavoriteMock}
          showStar={true}
        />
      </MemoryRouter>
    );

    const starButton = screen.getByRole('button');
    fireEvent.click(starButton);

    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockCountry);
  });

  it('does not render star icon if showStar is false', () => {
    render(
      <MemoryRouter>
        <CountryCard
          country={mockCountry}
          isFavorite={false}
          toggleFavorite={toggleFavoriteMock}
          showStar={false}
        />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('prevents card click when star is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <CountryCard
          country={mockCountry}
          isFavorite={false}
          toggleFavorite={toggleFavoriteMock}
          showStar={true}
        />
      </MemoryRouter>
    );

    const starButton = screen.getByRole('button');
    fireEvent.click(starButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
