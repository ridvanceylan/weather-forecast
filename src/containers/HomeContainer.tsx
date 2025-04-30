import React, { useState, useEffect } from "react";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import ForecastContainer from "./ForecastContainer";
import LoadingSpinner from "../components/LoadingSpinner";

const HomeContainer: React.FC = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching geolocation", error);
        }
      );
    }
  }, [city]);

  const {
    data: currentWeather,
    isLoading,
    error,
  } = useCurrentWeather(
    city || undefined,
    city ? undefined : location?.lat,
    city ? undefined : location?.lon
  );

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className="p-4 space-y-4">
      <LoadingSpinner isLoading={isLoading} />
      <SearchBar onSearch={handleSearch} />

      {currentWeather ? (
        <>
          <WeatherCard data={currentWeather} />

          {(currentWeather.coord || location) && (
            <ForecastContainer
              lat={currentWeather.coord?.lat || location?.lat}
              lon={currentWeather.coord?.lon || location?.lon}
            />
          )}
        </>
      ) : (
        error && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center justify-center bg-red-100 p-6 rounded-lg shadow-xl space-x-4 w-full sm:w-2/3 lg:w-1/3">
              <p className="text-red-600 text-xl font-semibold">
                An error occurred, please try again. Make sure the city name is
                correct or your location services are enabled.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HomeContainer;
