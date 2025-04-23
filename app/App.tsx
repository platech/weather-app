import WeatherForecastScreen from "@/components/weatherForecast/weatherForecastScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="WeatherForecast" 
          component={WeatherForecastScreen}
          options={{
            title: 'Weather Forecast'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}