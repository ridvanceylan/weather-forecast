import React from 'react';
import { useForecastWeather } from '../hooks/useForecastWeather';
import ForecastList from '../components/ForecastList'; 
import UnitSwitcher from '../components/UnitSwitcher';
import { useIntl } from 'react-intl';

interface ForecastContainerProps {
  lat?: number;
  lon?: number;
}

const ForecastContainer: React.FC<ForecastContainerProps> = ({ lat, lon }) => {
  const intl = useIntl();

  const { data, error: forecastError } = useForecastWeather(lat, lon);



  if (forecastError) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        Error loading forecast: {forecastError instanceof Error ? forecastError.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 bg-white dark:bg-gray-900">
      <UnitSwitcher />
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
        {intl.formatMessage({ id: 'forecast.title', defaultMessage: '7-Day Forecast' })}
      </h1>
      {data ? <ForecastList forecastData={data} /> : <div className="text-center">No forecast data available.</div>}
    </div>
  );
};

export default ForecastContainer;
