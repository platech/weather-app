import { GeocodingResponse } from "@/types/weather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export type RootStackParamList = {
  WeatherForecast: { location: GeocodingResponse };
  LocationSearch: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
