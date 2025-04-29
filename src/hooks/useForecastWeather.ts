import { useQuery } from '@tanstack/react-query';
import { getForecastWeather } from '../services/weatherService';
import { useUnit } from '../contexts/UnitContext';
import { useLanguage } from '../contexts/LanguageContext';

export const useForecastWeather = (lat?: number, lon?: number) => {
  const { unit } = useUnit();
  const { language } = useLanguage();

  return useQuery({
    queryKey: ['forecastWeather', { lat, lon, unit, language }],
    queryFn: () => {
      if (lat != null && lon != null) {
        return getForecastWeather(lat, lon, unit, language);
      }
      return Promise.reject('No valid coordinates for forecast');
    },
    enabled: !!(lat && lon),
  });
};
