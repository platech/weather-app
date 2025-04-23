export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  state?: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  weather: WeatherCondition[];
}

export interface WeatherForecast {
  current: CurrentWeather;
  daily: DailyForecast[];
} 

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}