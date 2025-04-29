import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import { IntlProvider } from 'react-intl';

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={{ searchCityPlaceholder: 'Search city...', searchButton: 'Search' }}>
      {component}
    </IntlProvider>
  );
};

describe('SearchBar', () => {
  it('renders input and button correctly', () => {
    renderWithIntl(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText('Search city...');
    const button = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates input value and calls onSearch on submit', () => {
    const mockOnSearch = jest.fn();
    renderWithIntl(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search city...');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Istanbul' } });
    expect(input).toHaveValue('Istanbul');

    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('Istanbul');
    expect(input).toHaveValue('');
  });

  it('does not call onSearch if input is empty', () => {
    const mockOnSearch = jest.fn();
    renderWithIntl(<SearchBar onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
