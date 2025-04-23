import { LocationSearchScreen, WeatherForecastScreen } from '@/components';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadSavedState } from './store/weatherSlice';
import headerStyle from './styles';

const RootStack = createNativeStackNavigator({
  screens: {
    WeatherForecast: {
      screen: WeatherForecastScreen,
      options: {
        title: 'Weather Forecast App',
        ...headerStyle,
      },
    },
    LocationSearch: {
      screen: LocationSearchScreen,
      options: {
        title: 'Find your place',
        ...headerStyle,
      },
    },
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

function AppContent() {
  useEffect(() => {
    store.dispatch(loadSavedState());
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
      <StatusBar style="auto" />
    </Provider>
  );
}