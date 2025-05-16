import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterButtons from '../FilterButtons';

describe('FilterButtons', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnFilter.mockClear();
  });

  it('renders all region buttons', () => {
    render(<FilterButtons onFilter={mockOnFilter} />);

    const regions = ['All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctica'];
    regions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('calls onFilter with empty string when "All Regions" is clicked', () => {
    render(<FilterButtons onFilter={mockOnFilter} />);
    fireEvent.click(screen.getByText('All Regions'));
    expect(mockOnFilter).toHaveBeenCalledWith('');
  });

  it('calls onFilter with lowercase region name', () => {
    render(<FilterButtons onFilter={mockOnFilter} />);
    fireEvent.click(screen.getByText('Europe'));
    expect(mockOnFilter).toHaveBeenCalledWith('europe');
  });

  it('highlights selected button with different background color', () => {
    render(<FilterButtons onFilter={mockOnFilter} />);
    const asiaButton = screen.getByText('Asia');
    fireEvent.click(asiaButton);
    
    expect(asiaButton).toHaveStyle('background-color: #2e7d32');
  });
});
