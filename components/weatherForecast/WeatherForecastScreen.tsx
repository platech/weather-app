import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { useAppSelector } from '../../app/store/hooks';
import { useGetWeatherForecast } from '../../hooks';
import { styles } from './styles';


export function WeatherForecastScreen() {
  const navigation = useNavigation();
  const lastKnownLocation = useAppSelector(state => state.weather.lastKnownLocation);

  const navigateToSearch = () => {
    navigation.navigate('LocationSearch' as never);
  }

  const location = lastKnownLocation || null;

  const { data: weather, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({
    location
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

      {isLoadingWeather && (
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