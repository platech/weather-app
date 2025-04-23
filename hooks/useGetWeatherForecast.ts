import Constants from 'expo-constants';
import { useState } from 'react';
import { Location, WeatherForecast } from '../types/weather';

interface UseGetWeatherForecastProps {
  location: Location | null;
}

export const useGetWeatherForecast = ({ location }: UseGetWeatherForecastProps) => {
  const [data, setData] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = async () => {
    if (!location) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?` +
        `lat=${location.latitude}&lon=${location.longitude}` +
        `&exclude=minutely,hourly,alerts` +
        `&units=metric` +
        `&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const result = await response.json();
      
      // Transform the API response to match our interface
      const forecast: WeatherForecast = {
        current: {
          dt: result.current.dt,
          temp: result.current.temp,
          feels_like: result.current.feels_like,
          humidity: result.current.humidity,
          wind_speed: result.current.wind_speed,
          weather: result.current.weather,
        },
        daily: result.daily.slice(0, 5).map((day: any) => ({
          dt: day.dt,
          temp: {
            min: day.temp.min,
            max: day.temp.max,
            day: day.temp.day,
          },
          weather: day.weather,
        })),
      };

      setData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchForecast,
  };
};


