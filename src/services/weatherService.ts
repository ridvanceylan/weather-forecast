import axios from 'axios';
import { API_KEY, BASE_URL, BASE_URL_FORECAST } from '../constants/apiConstants';

const handleApiError = (error: any, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    return new Error(error.response?.data?.message || defaultMessage);
  }
  return new Error(defaultMessage);
};


export const getCurrentWeather = async (
  city: string,
  unit: 'metric' | 'imperial',
  lang: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'City not found or failed to fetch weather data');
  }
};

export const getCurrentWeatherByCoords = async (
  lat: number,
  lon: number,
  unit: 'metric' | 'imperial',
  lang: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: unit,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch weather data by coordinates');
  }
};

export const getForecastWeather = async (
  lat: number,
  lon: number,
  unit: 'metric' | 'imperial',
  lang: string
) => {
  try {
    const response = await axios.get(`${BASE_URL_FORECAST}/onecall`, {
      params: {
        lat,
        lon,
        exclude: 'minutely,hourly,alerts',
        appid: API_KEY,
        units: unit,
        lang,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch forecast data');
  }
};
