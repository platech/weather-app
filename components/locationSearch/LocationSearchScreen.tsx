import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addSearchLocation, setLastKnownLocation } from "@/app/store/weatherSlice";
import GpsIcon from "@/assets/images/gps.svg";
import { fullLocationName, mapGeocodingResponseToLocation } from "@/components/utils";
import { useGetGeocodedLocationSuggestions } from "@/hooks";
import { useGetReverseGeocoding } from "@/hooks/useGetReverseGeocoding";
import { GeocodingResponse } from "@/types/weather";
import { useNavigation } from "@react-navigation/native";
import * as ExpoLocation from "expo-location";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function LocationSearchScreen() {
  const { requestForegroundPermissionsAsync, getLastKnownPositionAsync } = ExpoLocation;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions({
    query: searchQuery
  });
  const searchHistory = useAppSelector(state => state.weather.searchHistory);
  const { data: reverseGeocodingData, fetchReverseGeocode } = useGetReverseGeocoding();

  const getDeviceLocation = () => requestForegroundPermissionsAsync().then(status => {
    if(status.status === 'granted') {
      getLastKnownPositionAsync().then(position => {
        if (position?.coords) {
          const { latitude, longitude } = position.coords;
          fetchReverseGeocode({ latitude, longitude });
        }
      }).catch(error => {
        console.log(error);
      });
    }else{
      console.log('Permission not granted');
    }
  });
  
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        fetchGeocode();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (reverseGeocodingData?.[0]) {
      const location = mapGeocodingResponseToLocation(reverseGeocodingData[0]);
      dispatch(setLastKnownLocation(location));
      dispatch(addSearchLocation(location));
      navigation.goBack();
    }
  }, [reverseGeocodingData]);

  const renderSearchResult = ({ item }: { item: GeocodingResponse }) => {
    const onLocationSelected = () => {
      const location = mapGeocodingResponseToLocation(item);
      dispatch(setLastKnownLocation(location));
      dispatch(addSearchLocation(location));
      navigation.goBack();
    }

    const stateOrBlank = item.state ? `${item.state}, ` : '';

    return <TouchableOpacity style={styles.button} onPress={onLocationSelected}>
      <View style={styles.locationItem}>
        <Text>{item.name}, {stateOrBlank}{item.country}</Text>
      </View>
    </TouchableOpacity>
  }

  const renderHistoryItem = ({ item }: { item: GeocodingResponse }) => {
    const onHistoryItemSelected = () => {
      const location = mapGeocodingResponseToLocation(item);
      dispatch(setLastKnownLocation(location));
      navigation.goBack();
    }


    return (
      <TouchableOpacity style={styles.button} onPress={onHistoryItemSelected}>
        <View style={styles.locationItem}>
          <Text>{fullLocationName(item)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Convert Location objects to GeocodingResponse format
  const searchHistoryAsGeocodingResponse = searchHistory.map(item => ({
    name: item.name,
    lat: item.latitude,
    lon: item.longitude,
    country: item.country,
    state: item.state
  }));

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        placeholder="Search for a city"
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.locationButton} onPress={getDeviceLocation}>
        <GpsIcon width={24} height={24} stroke="black" />
      </TouchableOpacity>
      </View>
      
      {isLoadingLocations && <Text>Loading...</Text>}
      
      {!searchQuery && searchHistory.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <FlatList
            data={searchHistoryAsGeocodingResponse}
            keyExtractor={(item) => `${item.lat}-${item.lon}`}
            renderItem={renderHistoryItem}
          />
        </View>
      )}

      {searchQuery && !isLoadingLocations && locations && (
        <FlatList
          data={locations}
          keyExtractor={(item) => `${item.lat}-${item.lon}`}
          renderItem={renderSearchResult}
        />
      )}
      
      {searchQuery && !isLoadingLocations && !locations && (
        <Text>No locations found</Text>
      )}
    </View>
  );
}
