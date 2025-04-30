import React from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "../contexts/UnitContext";
import MotionCard from "./MotionCard";

type ForecastListProps = {
  forecastData: any;
};

const ForecastList: React.FC<ForecastListProps> = ({ forecastData }) => {
  const navigate = useNavigate();
  const { unit } = useUnit();

  if (!forecastData) return null;

  const { lat, lon } = forecastData;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {forecastData.daily.slice(1, 8).map((day: any, index: number) => (
        <MotionCard
          key={index}
          className="cursor-pointer bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div
            onClick={() =>
              navigate(`/details/${lat}/${lon}/${day.dt}`, { state: { day } })
            }
          >
            <p className="text-lg font-semibold text-center mb-3 text-gray-600 dark:text-gray-300">
              {new Date(day.dt * 1000).toLocaleDateString()}
            </p>

            <p className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </p>

            <div className="flex justify-center mt-4">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-16 h-16"
              />
            </div>

            <p className="capitalize text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              {day.weather[0].description}
            </p>

            <div className="mt-4 border-t-2 border-gray-300 dark:border-gray-600"></div>
          </div>
        </MotionCard>
      ))}
    </div>
  );
};

export default ForecastList;
