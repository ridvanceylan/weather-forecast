import React from "react";
import { useUnit } from "../contexts/UnitContext";
type WeatherCardProps = {
  data: any;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) return null;

  const weatherIcon = data.weather[0].icon;
  const { unit } = useUnit();

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-700 dark:from-gray-800 dark:to-gray-950 text-white dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-xs mx-auto my-4 transform transition duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-center mb-4">{data.name}</h2>

      <div className="flex justify-center mb-4">
        <img
          src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>

      <p className="text-5xl font-semibold text-center">
        {Math.round(data.main.temp)}
        {unit === "metric" ? "°C" : "°F"}
      </p>
      <p className="capitalize text-center text-lg mb-4">
        {data.weather[0].description}
      </p>

      <div className="flex justify-between text-sm mt-4">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
