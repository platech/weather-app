import { GeocodingResponse } from '@/types/weather';
import Constants from 'expo-constants';
import { useState } from 'react';

export const useGetGeocodedLocationSuggestions = () => {
  const [data, setData] = useState<GeocodingResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeocode = async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;

      if (!apiKey) {
        throw new Error('OpenWeather API key is not configured');
      }
      //await new Promise(resolve => setTimeout(resolve, 3000));
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const resultsWithDuplicates = await response.json();
      const result = resultsWithDuplicates.filter((location: GeocodingResponse, index: number) =>
        resultsWithDuplicates.findIndex((potentialDuplicate: GeocodingResponse) =>
          potentialDuplicate.state === location.state &&
          potentialDuplicate.country === location.country &&
          potentialDuplicate.name === location.name
        ) === index
      );
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
    fetchGeocode,
  };
};