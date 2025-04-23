import { clearLocationAndSearchData } from "@/app/store";
import ChevronRightIcon from "@/assets/images/chevron-right.svg";
import { useAppDispatch, useAppSelector, useGetWeatherForecast } from '@/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CurrentWeatherView, FiveDayForecast } from '.';
import { colors } from "../colors";
import { fullLocationName } from '../utils';
import { styles } from './styles';

export function WeatherForecastScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const lastKnownLocation = useAppSelector(state => state.weather.lastKnownLocation);

  const navigateToSearch = () => {
    navigation.navigate('LocationSearch');
  }

  const onClearDataPressed = () => {
    dispatch(clearLocationAndSearchData());
  }

  const location = lastKnownLocation || null;

  const { data: weatherData, isLoading: isLoadingWeather, fetchForecast } = useGetWeatherForecast({
    location
  });

  useEffect(() => {
      fetchForecast();
  }, [location]);
  
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.searchInput} onPress={navigateToSearch}>
        <Text style={styles.searchInputText} ellipsizeMode="tail" numberOfLines={2}>
          {location ? fullLocationName(location) : 'Search a city or location...'}
        </Text>
        <ChevronRightIcon width={24} height={24} stroke={colors.sealbrown} />
      </TouchableOpacity>

      {isLoadingWeather && (
        <ActivityIndicator size="large" color={colors.sealbrown} style={styles.loadingIndicator} />
      )}

      {(!weatherData && !isLoadingWeather) && (
        <View style={styles.emptyStateContainer}>
          <Image source={require('@/assets/images/empty-state-main.png')} style={styles.emptyStateImage} />
          <Text style={styles.emptyStateText}>
            Let's find you some sunny weather!
          </Text>
        </View>
      )}

      {weatherData && !isLoadingWeather && location && (
        <>
          <CurrentWeatherView currentWeather={weatherData.current} fetchForecast={fetchForecast} />
          <FiveDayForecast dailyForecast={weatherData.daily} />
          <TouchableOpacity style={styles.refreshButton} onPress={onClearDataPressed}>
            <Text style={styles.refreshButtonText}>I want to clear my location and search data</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}