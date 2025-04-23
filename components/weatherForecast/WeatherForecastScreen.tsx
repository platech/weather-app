import { GeocodingResponse } from '@/types/weather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { useGetWeatherForecast } from '../../hooks';
import { styles } from './styles';

interface WeatherForecastScreenProps {
  route?: {
    params?: {
      location?: GeocodingResponse
    }
  }
}

export function WeatherForecastScreen({ route }: WeatherForecastScreenProps) {
  const navigation = useNavigation();

  const navigateToSearch = () => {
    navigation.navigate('LocationSearch' as never);
  }

  const location = route?.params?.location || null;

  const { data: weather, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({
    coordinates: location
  });

  useEffect(() => {
    if (location) {
      fetchForecast();
    }
  }, [location]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.searchInput} onPress={navigateToSearch}>
        <Text style={styles.searchInputText}>
          {location ? location.name : 'Search city...'}
        </Text>
      </TouchableOpacity>

      {isLoadingWeather &&  (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}

      {!location && (
        <Text style={styles.container}>Search for a city to view the weather forecast</Text>
      )}

      {weather && !isLoadingWeather && location && (
        <>
          <CurrentWeatherView currentWeather={weather.current} fetchForecast={fetchForecast} />
          <FiveDayForecast dailyForecast={weather.daily} />
        </>
      )}
    </ScrollView>
  );
}