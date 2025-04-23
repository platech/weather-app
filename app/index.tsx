import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, View } from "react-native";
import { useGetGeocodedLocationSuggestions, useGetWeatherForecast } from '../hooks';
import { styles } from './styles';
import { getWeatherIcon } from './utils';

export default function Index() {
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

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search location..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {(isLoadingLocations || isLoadingWeather) && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {weather && (
        <>
          <View style={styles.currentWeather}>
            <Text style={styles.sectionTitle}>Current Weather</Text>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: getWeatherIcon(weather.current.weather[0].icon)
              }}
            />
            <Text style={styles.temperature}>{Math.round(weather.current.temp)}°C</Text>
            <Text style={styles.weatherDescription}>
              {weather.current.weather[0].description}
            </Text>
            <View style={styles.weatherDetail}>
              <Text>Feels like: {Math.round(weather.current.feels_like)}°C</Text>
              <Text>Humidity: {weather.current.humidity}%</Text>
            </View>
            <View style={styles.weatherDetail}>
              <Text>Wind Speed: {weather.current.wind_speed} m/s</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.forecastContainer}>
              {weather.daily.map(day => (
                <View key={day.dt} style={styles.forecastCard}>
                  <Text>{new Date(day.dt * 1000).toLocaleDateString()}</Text>
                  <Image
                    style={styles.forecastIcon}
                    source={{
                      uri: getWeatherIcon(day.weather[0].icon)
                    }}
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}
