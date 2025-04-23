import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addSearchLocation, setLastKnownLocation } from "@/app/store/weatherSlice";
import GpsIcon from "@/assets/images/gps.svg";
import { fullLocationName, mapGeocodingResponseToLocation } from "@/components/utils";
import { useGetGeocodedLocationSuggestions } from "@/hooks";
import { useGetReverseGeocoding } from "@/hooks/useGetReverseGeocoding";
import { GeocodingResponse } from "@/types/weather";
import { useNavigation } from "@react-navigation/native";
import { getLastKnownPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function LocationSearchScreen() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(state => state.weather.searchHistory);

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions();
  const { data: reverseGeocodingData, fetchReverseGeocode } = useGetReverseGeocoding();

  const getDeviceLocation = () => requestForegroundPermissionsAsync().then(status => {
    if (status.status === 'granted') {
      getLastKnownPositionAsync().then(position => {
        if (position?.coords) {
          const { latitude, longitude } = position.coords;
          fetchReverseGeocode({ latitude, longitude });
        }
      }).catch(error => {
        console.log(error);
      });
    } else {
      console.log('Permission not granted');
    }
  });

  useEffect(() => {
    if (searchQuery) {
      setIsDebouncing(true);
      const timeoutId = setTimeout(() => {
        fetchGeocode(searchQuery);
        setIsDebouncing(false);
      }, 500);
      return () => {
        clearTimeout(timeoutId);
        setIsDebouncing(false);
      };
    }
  }, [searchQuery]);

  useEffect(() => {
    if (reverseGeocodingData) {
      const location = mapGeocodingResponseToLocation(reverseGeocodingData);
      dispatch(setLastKnownLocation(location));
      dispatch(addSearchLocation(location));
      navigation.goBack();
    }
  }, [reverseGeocodingData]);

  const handleLocationSelected = (item: GeocodingResponse) => {
    const location = mapGeocodingResponseToLocation(item);
    dispatch(setLastKnownLocation(location));
    dispatch(addSearchLocation(location));
    navigation.goBack();
  };

  const displayData = useMemo(() => {
    if (searchQuery) {
      return locations || [];
    }
    // Convert Location objects to GeocodingResponse format for history
    return searchHistory.map(item => ({
      name: item.name,
      lat: item.latitude,
      lon: item.longitude,
      country: item.country,
      state: item.state
    }));
  }, [searchQuery, locations, searchHistory]);

  const isLoading = isLoadingLocations || isDebouncing;
  const showNoResults = searchQuery && !isLoading && displayData.length === 0;
  const showRecentSearches = !searchQuery && !isLoading && searchHistory.length > 0;

  const renderItem = ({ item }: { item: GeocodingResponse }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleLocationSelected(item)}
    >
      <View style={styles.locationItem}>
        <Text>{fullLocationName(item)}</Text>
      </View>
    </TouchableOpacity>
  );

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

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {showRecentSearches && (
        <Text style={styles.sectionTitle}>Recent Searches</Text>
      )}

      {!isLoading && <FlatList
        data={displayData}
        keyExtractor={(item) => `${item.lat}-${item.lon}`}
        renderItem={renderItem}
        ListEmptyComponent={
          showNoResults ? (
            <Text style={styles.noResultsText}>No locations found</Text>
          ) : null
        }
      />}
    </View>
  );
}
