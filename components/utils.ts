import { GeocodingResponse, Location } from "@/types/weather";

export const getWeatherIcon = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export const mapGeocodingResponseToLocation = (response: GeocodingResponse) => {
    return {
        latitude: response.lat,
        longitude: response.lon,
        name: response.name,
        country: response.country,
        state: response.state
    }
}

export const fullLocationName = (location: Location | GeocodingResponse) => {
    const stateOrBlank = location.state ? `${location.state}, ` : '';
    return `${location.name}, ${stateOrBlank}${location.country}`;
}