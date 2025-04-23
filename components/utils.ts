import { GeocodingResponse } from "@/types/weather";

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