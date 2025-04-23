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