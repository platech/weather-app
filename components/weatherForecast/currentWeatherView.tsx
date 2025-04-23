import { CurrentWeather } from "@/types/weather";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { getWeatherIcon } from "../utils";

export default function CurrentWeatherView({ currentWeather, fetchForecast }: { currentWeather: CurrentWeather, fetchForecast: () => void }) {
    return (
        <View style={styles.currentWeather}>
            <View style={styles.currentWeatherHeader}>
                <Text style={styles.sectionTitle}>Current Weather</Text>
                <TouchableOpacity onPress={fetchForecast}>
                    <Image
                        source={require('../../assets/images/reload.png')}
                        style={{ width: 24, height: 24 }}
                    />
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
                <Text>Feels like: {Math.round(currentWeather.feels_like)}°C</Text>
                <Text>Humidity: {currentWeather.humidity}%</Text>
            </View>
            <View style={styles.weatherDetail}>
                <Text>Wind Speed: {currentWeather.wind_speed} m/s</Text>
            </View>
        </View>
    )
}