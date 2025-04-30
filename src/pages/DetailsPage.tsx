import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUnit } from "../contexts/UnitContext";
import { useIntl } from "react-intl";
import MotionCard from "../components/MotionCard";

const DetailsPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { unit } = useUnit();
  const intl = useIntl();

  const day = state?.day;

  if (!day) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {intl.formatMessage({
            id: "data-not-found",
            defaultMessage: "Data not found. Please go back and select a day.",
          })}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {intl.formatMessage({ id: "back", defaultMessage: "Back" })}
        </button>
      </div>
    );
  }

  const {
    temp,
    feels_like,
    humidity,
    wind_speed,
    wind_deg,
    pressure,
    clouds,
    summary,
    weather,
    sunrise,
    sunset,
    moonrise,
    moonset,
    pop,
    uvi,
  } = day;

  const formatTime = (timestamp: number) => {
    if (!timestamp) return "-";
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-6">
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <span>&#8592;</span>
          <span>
            {intl.formatMessage({ id: "back", defaultMessage: "Back" })}
          </span>
        </button>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        {intl.formatMessage({
          id: "weather-details",
          defaultMessage: "Weather Details",
        })}
      </h1>

      <MotionCard className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl space-y-6 w-full max-w-4xl mx-auto">
        {weather?.[0]?.icon && (
          <div className="flex justify-center mb-6">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
              alt={weather[0].description}
              className="w-36 h-36"
            />
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {new Date(day.dt * 1000).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            {summary ||
              intl.formatMessage({
                id: "no-summary",
                defaultMessage: "No summary available",
              })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center text-lg">
          <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "day-temp",
                defaultMessage: "Day Temp:",
              })}
            </strong>
            {temp?.day.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "night-temp",
                defaultMessage: "Night Temp:",
              })}
            </strong>
            {temp?.night.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "max-temp",
                defaultMessage: "Max Temp:",
              })}
            </strong>
            {temp?.max.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-green-100 dark:bg-green-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "min-temp",
                defaultMessage: "Min Temp:",
              })}
            </strong>
            {temp?.min.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center text-lg mt-6">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "feels-like-day",
                defaultMessage: "Feels like (Day):",
              })}
            </strong>
            {feels_like?.day.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-yellow-100 dark:bg-yellow-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "feels-like-night",
                defaultMessage: "Feels like (Night):",
              })}
            </strong>
            {feels_like?.night.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "feels-like-morning",
                defaultMessage: "Feels like (Morning):",
              })}
            </strong>
            {feels_like?.morn.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "feels-like-evening",
                defaultMessage: "Feels like (Evening):",
              })}
            </strong>
            {feels_like?.eve.toFixed(1)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center text-lg mt-8">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "humidity",
                defaultMessage: "Humidity:",
              })}
            </strong>
            {humidity}%
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "pressure",
                defaultMessage: "Pressure:",
              })}
            </strong>
            {pressure} hPa
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "cloudiness",
                defaultMessage: "Cloudiness:",
              })}
            </strong>
            {clouds}%
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "uv-index",
                defaultMessage: "UV Index:",
              })}
            </strong>
            {uvi}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "wind-speed",
                defaultMessage: "Wind Speed:",
              })}
            </strong>
            {wind_speed} m/s
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "wind-direction",
                defaultMessage: "Wind Direction:",
              })}
            </strong>
            {wind_deg}°
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "precipitation",
                defaultMessage: "Precipitation Probability:",
              })}
            </strong>
            {pop}%
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "sunrise",
                defaultMessage: "Sunrise:",
              })}
            </strong>
            {formatTime(sunrise)}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({ id: "sunset", defaultMessage: "Sunset:" })}
            </strong>
            {formatTime(sunset)}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "moonrise",
                defaultMessage: "Moonrise:",
              })}
            </strong>
            {formatTime(moonrise)}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <strong className="text-gray-800 dark:text-gray-200">
              {intl.formatMessage({
                id: "moonset",
                defaultMessage: "Moonset:",
              })}
            </strong>
            {formatTime(moonset)}
          </div>
        </div>
      </MotionCard>
    </div>
  );
};

export default DetailsPage;
