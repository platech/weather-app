import ReloadIcon from "@/assets/images/reload.svg";
import { CurrentWeather } from "@/types";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { getWeatherIcon } from "../utils";
import { styles } from "./styles";


export function CurrentWeatherView({ currentWeather, fetchForecast }: { currentWeather: CurrentWeather, fetchForecast: () => void }) {
    return (
        <View style={styles.currentWeather}>
            <View style={styles.currentWeatherHeader}>
                <Text style={styles.sectionTitle}>Current Weather</Text>
                <TouchableOpacity onPress={fetchForecast}>
                    <ReloadIcon width={24} height={24} stroke={colors.sealbrown} />
                </TouchableOpacity>
            </View>
            <Image
                style={styles.weatherIcon}
                source={{
                    uri: getWeatherIcon(currentWeather.weather[0].icon)
                }}
            />
            <Text style={styles.temperature}>{Math.round(currentWeather.temp)}°C</Text>
            <Text style={styles.weatherDescription}>
                {currentWeather.weather[0].description}
            </Text>
            <View style={styles.weatherDetail}>
                <Text style={styles.weatherDetailText}>Feels like: {Math.round(currentWeather.feels_like)}°C</Text>
                <Text style={styles.weatherDetailText}>Humidity: {currentWeather.humidity}%</Text>
            </View>
            <View style={styles.weatherDetail}>
                <Text style={styles.weatherDetailText}>Wind Speed: {currentWeather.wind_speed} m/s</Text>
            </View>
        </View>
    )
}