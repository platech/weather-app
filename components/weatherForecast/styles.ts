import Constants from "expo-constants";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight + 10,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
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
  loadingIndicator: {
    alignSelf: 'center',
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
    marginBottom: 10,
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
  recentSearches: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  recentSearchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentSearchText: {
    fontSize: 16,
    color: '#2d3436',
  },
});