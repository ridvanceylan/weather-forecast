import React, { useState, useEffect } from 'react';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import useGeolocationWeather from '../hooks/useGeolocationWeather';
import ForecastContainer from './ForecastContainer'; 
import LoadingSpinner from '../components/LoadingSpinner'; 

const HomeContainer: React.FC = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);

  const { data: geoWeather, isLoading: loadingGeoWeather, error: geoError } = useGeolocationWeather();

  useEffect(() => {
    if (geoWeather) {
      setLocation({ lat: geoWeather.coord.lat, lon: geoWeather.coord.lon });
    }
  }, [geoWeather]);

  const { data: currentWeather, isLoading: loadingCurrent, error: weatherError } = useCurrentWeather(
    city, 
    location?.lat, 
    location?.lon
  );

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const isLoading = loadingCurrent || loadingGeoWeather;
  const hasError = geoError || weatherError;

  return (
    <div className="p-4 space-y-4">
      <LoadingSpinner isLoading={isLoading} />

      <SearchBar onSearch={handleSearch} />

      {currentWeather ? (
        <>
          <WeatherCard data={currentWeather} />
          
          {(location || currentWeather.coord) && (
            <ForecastContainer 
              lat={currentWeather.coord?.lat || location?.lat} 
              lon={currentWeather.coord?.lon || location?.lon} 
            />
          )}
        </>
      ) : (
        hasError && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center bg-red-100 p-6 rounded-lg shadow-xl space-x-4 w-full sm:w-2/3 lg:w-1/3">
              <p className="text-red-600 text-xl font-semibold">
                An error occurred, please try again. Make sure the city name is correct or your location services are enabled.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HomeContainer;
