import { ScrollView } from "react-native";

import { DailyForecast } from "@/types/weather";
import { Image, Text, View } from "react-native";
import { styles } from "../styles";
import { getWeatherIcon } from "../utils";

export default function FiveDayForecast({ dailyForecast }: { dailyForecast: DailyForecast[] }) {
    return (
        <View>
        <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.forecastContainer}>
              {dailyForecast.map(day => (
                <View key={day.dt} style={styles.forecastCard}>
                  <Text>{new Date(day.dt * 1000).toLocaleDateString()}</Text>
                  <Image
                    style={styles.forecastIcon}
                    source={{
                      uri: getWeatherIcon(day.weather[0].icon)
                    }}
                  />
                  <Text style={styles.forecastTemp}>
                    {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
    )
}