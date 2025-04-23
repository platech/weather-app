import { WeatherState } from '@/types/storage';
import { Location } from '@/types/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WeatherState = {
  searchHistory: [],
  lastKnownLocation: null,
  isLoading: false,
  error: null,
};

// Async thunk for loading saved state from AsyncStorage
export const loadSavedState = createAsyncThunk(
  'weather/loadSavedState',
  async () => {
    const [searchHistoryJson, lastLocationJson] = await Promise.all([
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('lastKnownLocation'),
    ]);

    return {
      searchHistory: searchHistoryJson ? JSON.parse(searchHistoryJson) : [],
      lastKnownLocation: lastLocationJson ? JSON.parse(lastLocationJson) : null,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addSearchLocation: (state, action: PayloadAction<Location>) => {
      // Remove the location if it already exists to avoid duplicates
      state.searchHistory = state.searchHistory.filter(
        loc => !(loc.latitude === action.payload.latitude && 
                loc.longitude === action.payload.longitude)
      );
      
      // Add new location to the beginning of the array
      state.searchHistory.unshift(action.payload);
      
      // Keep only the last 10 searches
      state.searchHistory = state.searchHistory.slice(0, 10);
      
      // Save to AsyncStorage
      AsyncStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
    },
    setLastKnownLocation: (state, action: PayloadAction<Location>) => {
      state.lastKnownLocation = action.payload;
      // Save to AsyncStorage
      AsyncStorage.setItem('lastKnownLocation', JSON.stringify(action.payload));
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      AsyncStorage.removeItem('searchHistory');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSavedState.fulfilled, (state, action) => {
        state.searchHistory = action.payload.searchHistory;
        state.lastKnownLocation = action.payload.lastKnownLocation;
        state.isLoading = false;
      })
      .addCase(loadSavedState.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load saved state';
      });
  },
});

export const { 
  addSearchLocation, 
  setLastKnownLocation, 
  clearSearchHistory 
} = weatherSlice.actions;

export default weatherSlice.reducer; 