import { addSearchLocation, setLastKnownLocation } from "@/app/store";
import GpsIcon from "@/assets/images/gps.svg";
import { fullLocationName, mapGeocodingResponseToLocation } from "@/components/utils";
import { useAppDispatch, useAppSelector, useDeviceLocation, useGetGeocodedLocationSuggestions, useGetReverseGeocoding } from "@/hooks";
import { GeocodingResponse } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { styles } from "./styles";

const Separator = () => <View style={styles.separator} />;

export function LocationSearchScreen() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(state => state.weather.searchHistory);

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions();
  const { data: reverseGeocodingData, fetchReverseGeocode } = useGetReverseGeocoding();
  const { isLoading: isLoadingLocation, getDeviceLocation } = useDeviceLocation({
    onLocationReceived: (latitude, longitude) => {
      fetchReverseGeocode({ latitude, longitude });
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

  const isLoading = isLoadingLocations || isDebouncing || isLoadingLocation;
  const showNoResults = searchQuery && !isLoading && displayData.length === 0;
  const showRecentSearches = !searchQuery && !isLoading && searchHistory.length > 0;

  const renderItem = ({ item }: { item: GeocodingResponse }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleLocationSelected(item)}
    >
      <View style={styles.locationItem}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationText}>{fullLocationName(item)}</Text>
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
          placeholderTextColor={colors.dimGray}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={getDeviceLocation}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <GpsIcon width={24} height={24} stroke={colors.sealbrown} />
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color={colors.sealbrown} />}

      {showRecentSearches && (
        <Text style={styles.sectionTitle}>Recent Searches</Text>
      )}

      {!isLoading && <FlatList
        data={displayData}
        keyExtractor={(item) => `${item.lat}-${item.lon}`}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          showNoResults ? (
            <Text style={styles.noResultsText}>Sorry, we couldn't find that location. Could you try another one?</Text>
          ) : null
        }
      />}
    </View>
  );
}
