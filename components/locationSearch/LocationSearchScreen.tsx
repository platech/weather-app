import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addSearchLocation, setLastKnownLocation } from "@/app/store/weatherSlice";
import { mapGeocodingResponseToLocation } from "@/components/utils";
import { useGetGeocodedLocationSuggestions } from "@/hooks";
import { GeocodingResponse } from "@/types/weather";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function LocationSearchScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions({
    query: searchQuery
  });
  const searchHistory = useAppSelector(state => state.weather.searchHistory);

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        fetchGeocode();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

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

    const stateOrBlank = item.state ? `${item.state}, ` : '';

    return (
      <TouchableOpacity style={styles.button} onPress={onHistoryItemSelected}>
        <View style={styles.locationItem}>
          <Text>{item.name}, {stateOrBlank}{item.country}</Text>
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
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        placeholder="Search for a city"
        onChangeText={setSearchQuery}
      />
      
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
