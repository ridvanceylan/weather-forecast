import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../../components/WeatherCard';
import { UnitProvider } from '../../contexts/UnitContext';

const mockWeatherData = {
  name: 'Istanbul',
  weather: [
    {
      icon: '01d',
      description: 'clear sky',
    },
  ],
  main: {
    temp: 25,
    humidity: 50,
  },
  wind: {
    speed: 3.6,
  },
};

// Wrapper bileşeni, UnitContext'i sağlar
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UnitProvider>{children}</UnitProvider>
);

describe('WeatherCard', () => {
  it('renders correctly with provided data', () => {
    render(<WeatherCard data={mockWeatherData} />, { wrapper: Wrapper });

    expect(screen.getByText('Istanbul')).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('3.6 m/s')).toBeInTheDocument();
    expect(screen.getByAltText('clear sky')).toHaveAttribute(
      'src',
      expect.stringContaining('01d')
    );
  });

  it('returns null if data is not provided', () => {
    const { container } = render(<WeatherCard data={null} />, { wrapper: Wrapper });
    expect(container.firstChild).toBeNull();
  });
});
