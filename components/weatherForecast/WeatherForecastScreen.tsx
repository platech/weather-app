import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { useGetGeocodedLocationSuggestions, useGetWeatherForecast } from '../../hooks';
import { styles } from '../styles';

export function WeatherForecastScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions({ 
    query: searchQuery 
  });
  const coordinates = locations?.[0] ?? null;
  const { data: weather, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({ 
    coordinates 
  });

  useEffect(() => {
    if (coordinates) {
      fetchForecast();
    }
  }, [coordinates]);

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        fetchGeocode();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const isViewLoading = isLoadingLocations || isLoadingWeather;

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search city..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {isViewLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {weather && !isViewLoading && (
        <>
          <CurrentWeatherView currentWeather={weather.current} fetchForecast={fetchForecast} />
          <FiveDayForecast dailyForecast={weather.daily} />
        </>
      )}
    </ScrollView>
  );
}