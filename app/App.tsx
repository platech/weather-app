import { LocationSearchScreen, WeatherForecastScreen } from '@/components';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { loadSavedState } from './store/weatherSlice';

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

function AppContent() {
  useEffect(() => {
    // Load saved state when app starts
    store.dispatch(loadSavedState());
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}