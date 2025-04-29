import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getCurrentWeatherByCoords } from '../services/weatherService';
import { useUnit } from '../contexts/UnitContext';
import { useLanguage } from '../contexts/LanguageContext';

export const useCurrentWeather = (city?: string, lat?: number, lon?: number) => {
  const { unit } = useUnit();
  const { language } = useLanguage();

  const queryKey = city 
    ? ['currentWeather', city, unit, language]
    : ['currentWeather', { lat, lon, unit, language }];

  return useQuery({
    queryKey,
    queryFn: () => {
      if (city) {
        return getCurrentWeather(city, unit, language);
      } else if (lat && lon) {
        return getCurrentWeatherByCoords(lat, lon, unit, language);
      }
      return Promise.reject('No valid parameters for weather');
    },
    enabled: !!(city || (lat && lon)),
  });
};
