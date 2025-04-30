# Weather App

Vercel : https://weather-forecast-gules-one.vercel.app/

## Description

Weather App is a React-based application that allows users to check current weather conditions, search for weather in different cities, and view a 7-day weather forecast. The app uses geolocation to display the weather for the user's current location, and also supports searching for weather by city name. The app fetches data from the OpenWeather API.

Note: The https://api.openweathermap.org/data/2.5/onecall endpoint is now deprecated. It has been replaced by the One Call API 3.0, which introduces updated data structures and additional features.

Please note that One Call API 3.0 is a paid service. Usage exceeding 1,000 daily requests requires a paid subscription.

## Features

- **Current Weather**: Displays the current weather conditions of a city or based on the user's geolocation.
- **7-Day Forecast**: Provides a 7-day weather forecast based on location or city search.
- **Search Functionality**: Users can search for weather in different cities.
- **Unit Switching**: Users can switch between Celsius and Fahrenheit for temperature units.
- **Multi-Language Support**: Supports different languages for international users.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript
- **Weather Data**: OpenWeather API
- **State Management**: React Context for unit and language preferences
- **Geolocation**: Browser's Geolocation API for user location
- **Styling**: Tailwind CSS for a responsive, utility-first design
- **Localization**: React Intl for multi-language support
- **React Query**: For data fetching and caching

Install dependencies:

cd weather-app

npm install


Usage
Search by City: Enter the name of any city in the search bar to get the current weather and a 7-day forecast.

Use Geolocation: If enabled, the app automatically fetches weather based on your current location.

Switch Units: Toggle between Celsius and Fahrenheit for temperature units.

Change Language: The app supports multiple languages (e.g., English, Spanish). You can switch between them in the settings.



