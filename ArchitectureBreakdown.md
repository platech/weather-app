# Weather App Architecture Breakdown

## Overview
The app is built using React Native with Expo and follows a modern, component-based architecture. The main structure consists of two primary screens: WeatherForecast and LocationSearch, managed through React Navigation's Stack Navigator.

## Navigation Flow
```
[WeatherForecast Screen] <-----> [LocationSearch Screen]
     (Main/Home)              (Location Selection)
```

## State Management
Redux is used for state management with a single slice called `weatherSlice` that handles:
1. Search history (up to 10 recent locations)
2. Last known location
3. Persistent storage using AsyncStorage
4. Loading states and error handling

## API Integration
The app integrates with OpenWeather API through three main endpoints:
1. `/data/3.0/onecall` - Fetches current weather and 5-day forecast
2. `/geo/1.0/direct` - Gets location suggestions during search
3. `/geo/1.0/reverse` - Converts coordinates to location names (used with device GPS)

## Data Flow Architecture
```
User Input/GPS ─────┐
                    ▼
[Redux Store] <─> [API Layer] <─> [OpenWeather API]
      ▲               │
      │               ▼
[AsyncStorage]    [UI Components]
```

## Technical Implementation
The app uses modern React patterns including:
- Custom hooks for data fetching:
  - `useGetWeatherForecast`
  - `useGetGeocodedLocationSuggestions`
  - `useGetReverseGeocoding`
- Redux for state management
- Device features integration (location services)
- Component-based UI architecture with proper separation of concerns between:
  - Data fetching
  - State management
  - Presentation layer 