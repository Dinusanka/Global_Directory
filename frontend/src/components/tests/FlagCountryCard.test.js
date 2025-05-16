import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlagCountryCard from '../FlagCountryCard';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FlagCountryCard', () => {
  const mockCountry = {
    name: { common: 'Testland' },
    cca3: 'TST',
    capital: ['Test City'],
    region: 'Asia',
    flags: { png: 'https://example.com/testland-flag.png' },
  };

  it('renders country flag and details correctly', () => {
    render(
      <MemoryRouter>
        <FlagCountryCard country={mockCountry} />
      </MemoryRouter>
    );

    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText(/Capital: Test City/i)).toBeInTheDocument();
    expect(screen.getByText(/Region: Asia/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCountry.flags.png);
  });

  it('shows "N/A" if capital is missing', () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined };

    render(
      <MemoryRouter>
        <FlagCountryCard country={countryWithoutCapital} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Capital: N\/A/i)).toBeInTheDocument();
  });

  it('navigates to the correct route on card click', () => {
    render(
      <MemoryRouter>
        <FlagCountryCard country={mockCountry} />
      </MemoryRouter>
    );

    const card = screen.getByText('Testland').closest('div');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/country/TST', {
      state: { country: mockCountry },
    });
  });
});
