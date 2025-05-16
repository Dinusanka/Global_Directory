import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';  
describe('SearchBar', () => {
  it('renders input field with placeholder', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search countries...');
    expect(input).toBeInTheDocument();
  });

  it('updates input value and calls onSearch on typing', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search countries...');
    fireEvent.change(input, { target: { value: 'canada' } });

    expect(input.value).toBe('canada');
    expect(mockOnSearch).toHaveBeenCalledWith('canada');
  });

  it('renders search icon at end of input', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
  });
});
