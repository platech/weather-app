import { Location } from './weather';

export interface WeatherState {
    searchHistory: Location[];
    lastKnownLocation: Location | null;
    isLoading: boolean;
    error: string | null;
}
