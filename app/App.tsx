
import { WeatherForecastScreen } from '@/components';
import LocationSearchScreen from '@/components/locationSearch/LocationSearchScreen';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const RootStack = createNativeStackNavigator({
  screens: {
    WeatherForecast: WeatherForecastScreen,
    LocationSearch: LocationSearchScreen,
  },
  initialRouteName: 'WeatherForecast',
});

const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default function App() {
  return <Navigation/>;
}