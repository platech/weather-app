import { GeocodingResponse } from '@/types/weather';
import Constants from 'expo-constants';
import { useState } from 'react';

interface UseGeocodeLocationProps {
  query: string;
}

export const useGetGeocodedLocationSuggestions = ({ query }: UseGeocodeLocationProps) => {
  const [data, setData] = useState<GeocodingResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeocode = async () => {
    if (!query) return;

    setIsLoading(true);
    setError(null);
    try {
      const apiKey = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=5&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const rawResults = await response.json();
      const result = rawResults.filter((location: GeocodingResponse, index: number) => {
        return rawResults.findIndex((l: GeocodingResponse) => 
          l.lat === location.lat && l.lon === location.lon
        ) === index;
      });
      console.log(result);
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