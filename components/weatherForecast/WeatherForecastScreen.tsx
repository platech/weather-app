import ChevronRightIcon from "@/assets/images/chevron-right.svg";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from '../../app/store/hooks';
import { useGetWeatherForecast } from '../../hooks';
import { fullLocationName } from '../utils';
import { styles } from './styles';


export function WeatherForecastScreen() {
  const navigation = useNavigation();
  const lastKnownLocation = useAppSelector(state => state.weather.lastKnownLocation);

  const navigateToSearch = () => {
    navigation.navigate('LocationSearch' as never);
  }

  const location = lastKnownLocation || null;

  const { data: Data, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({
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
        <Text style={styles.searchInputText} ellipsizeMode="tail" numberOfLines={2}>
          {location ? fullLocationName(location) : 'Search a city or location...'}
        </Text>
        <ChevronRightIcon width={24} height={24} stroke="#666666" />
      </TouchableOpacity>

      {isLoadingWeather && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}

      {(
        <View style={styles.emptyStateContainer}>
          <Image source={require('@/assets/images/empty-state-main.png')} style={styles.emptyStateImage} />
          <Text style={styles.emptyStateText}>
            Can't wait for the sunny days!
          </Text>
        </View>
      )}

      {/* {weatherData && !isLoadingWeather && location && (
        <>
          <CurrentWeatherView currentWeather={weatherData.current} fetchForecast={fetchForecast} />
          <FiveDayForecast dailyForecast={weatherData.daily} />
        </>
      )} */}
    </ScrollView>
  );
}