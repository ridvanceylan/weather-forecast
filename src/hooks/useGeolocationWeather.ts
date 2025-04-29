import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentWeatherByCoords } from '../services/weatherService';
import { useUnit } from '../contexts/UnitContext';
import { useLanguage } from '../contexts/LanguageContext'; 

const useGeolocationWeather = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { unit } = useUnit();
  const { language } = useLanguage(); 

  useEffect(() => {
    if (navigator.geolocation) {
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
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  return useQuery({
    queryKey: ['currentWeatherByCoords', location, unit, language], 
    queryFn: async () => {
      if (location) {
        const { lat, lon } = location;
        return await getCurrentWeatherByCoords(lat, lon, unit, language);
      }
      return null;
    },
    enabled: !!location,
  });
};

export default useGeolocationWeather;
