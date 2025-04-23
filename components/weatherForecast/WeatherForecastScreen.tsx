import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { addSearchLocation, setLastKnownLocation } from '../../app/store/weatherSlice';
import { useGetWeatherForecast } from '../../hooks';
import { styles } from './styles';


export function WeatherForecastScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const lastKnownLocation = useAppSelector(state => state.weather.lastKnownLocation);
  const searchHistory = useAppSelector(state => state.weather.searchHistory);

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
      // Update Redux state when location changes
      dispatch(setLastKnownLocation(location));
      dispatch(addSearchLocation(location));
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

      {searchHistory.length > 0 && !location && (
        <View style={styles.recentSearches}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={`${item.lat}-${item.lon}-${index}`}
              style={styles.recentSearchItem}
              onPress={() => {
                navigation.setParams({ location: item });
              }}
            >
              <Text style={styles.recentSearchText}>
                {item.name}, {item.state ? `${item.state}, ` : ''}{item.country}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}