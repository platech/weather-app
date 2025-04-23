import { GeocodingResponse, RootStackNavigationProp } from "@/types";
import { useGetGeocodedLocationSuggestions } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export default function LocationSearchScreen() {
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
    
    return <TouchableOpacity onPress={() => navigation.popTo('WeatherForecast', { location: item })}>
      <Text>{item.name}, {stateOrBlank}{item.country}</Text>
      </TouchableOpacity>
  }
  return (<View>
    <TextInput 
      style={styles.searchInput}
      value={searchQuery}
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
