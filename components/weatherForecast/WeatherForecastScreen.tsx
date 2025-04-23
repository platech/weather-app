import { GeocodingResponse } from '@/types/weather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { useGetWeatherForecast } from '../../hooks';
import { styles } from '../styles';

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

  const coordinates = route?.params?.location || null;

  const { data: weather, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({
    coordinates
  });

  useEffect(() => {
    if (coordinates) {
      fetchForecast();
    }
  }, [coordinates]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.searchInput} onPress={navigateToSearch}>
        <Text>
          {coordinates ? coordinates.name : 'Search city...'}
        </Text>
      </TouchableOpacity>

      {!coordinates && (
        <Text style={styles.container}>Please select a location to view weather forecast</Text>
      )}

      {isLoadingWeather && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {weather && !isLoadingWeather && coordinates && (
        <>
          <CurrentWeatherView currentWeather={weather.current} fetchForecast={fetchForecast} />
          <FiveDayForecast dailyForecast={weather.daily} />
        </>
      )}
    </ScrollView>
  );
}