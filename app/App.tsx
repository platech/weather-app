
import { WeatherForecastScreen } from '@/components';
import LocationSearchScreen from '@/components/locationSearch/LocationSearchScreen';
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
        <Stack.Screen 
          name="LocationSearch" 
          component={LocationSearchScreen}
          options={{
            title: 'Location Search'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}