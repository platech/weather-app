import { useGetGeocodedLocationSuggestions } from "@/hooks";
import { GeocodingResponse, RootStackNavigationProp } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function LocationSearchScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: locations, isLoading: isLoadingLocations, fetchGeocode } = useGetGeocodedLocationSuggestions({
    query: searchQuery
  });

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        fetchGeocode();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const renderItem = ({ item }: { item: GeocodingResponse }) => {
    const stateOrBlank = item.state ? `${item.state}, ` : '';

    return <TouchableOpacity style={styles.button} onPress={() => navigation.popTo('WeatherForecast', { location: item })}>
      <View style={styles.locationItem}>
        <Text>{item.name}, {stateOrBlank}{item.country}</Text>
      </View>
    </TouchableOpacity>
  }

  return (<View style={styles.container}>
    <TextInput
      style={styles.searchInput}
      value={searchQuery}
      placeholder="Search for a city"
      onChangeText={setSearchQuery}
    />
    {isLoadingLocations && <Text>Loading...</Text>}
    {!isLoadingLocations && locations && <FlatList
      data={locations}
      keyExtractor={item => item.lat.toString() + item.lon.toString()}
      renderItem={renderItem}
    />}
    {!isLoadingLocations && !locations && <Text>No locations found</Text>}
  </View>
  );
}
