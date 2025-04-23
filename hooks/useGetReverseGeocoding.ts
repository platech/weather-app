import { GeocodingResponse } from '@/types/weather';
import Constants from 'expo-constants';
import { useState } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const useGetReverseGeocoding = () => {
  const [data, setData] = useState<GeocodingResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReverseGeocode = async ({ latitude, longitude }: Coordinates) => {
    if (!latitude || !longitude) return;

    setIsLoading(true);
    setError(null);
    try {
      const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;

      if (!apiKey) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const result = await response.json();
      setData(result);
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
    fetchReverseGeocode,
  };
}; 