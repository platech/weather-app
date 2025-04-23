import Constants from "expo-constants";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: Constants.statusBarHeight + 10,
      backgroundColor: '#ecf0f1',
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: 'white',
    },
    currentWeather: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    currentWeatherHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    weatherIcon: {
      width: 100,
      height: 100,
      alignSelf: 'center',
    },
    temperature: {
      fontSize: 48,
      textAlign: 'center',
      color: '#2d3436',
    },
    weatherDescription: {
      fontSize: 18,
      textAlign: 'center',
      color: '#636e72',
      marginBottom: 10,
    },
    weatherDetail: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    forecastContainer: {
      flexDirection: 'row',
    },
    forecastCard: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
      width: 120,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    forecastIcon: {
      width: 50,
      height: 50,
      alignSelf: 'center',
    },
    forecastTemp: {
      fontSize: 16,
      textAlign: 'center',
      color: '#2d3436',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#2d3436',
    },
  });