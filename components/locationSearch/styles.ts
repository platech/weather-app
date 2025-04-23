import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#ecf0f1',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    locationButton: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    locationButtonIcon: {
      width: 24,
      height: 24,
    },  
    searchInput: {
      height: 40,
      borderWidth: 1,
      flex: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: 'white',
    },
    locationItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    button: {
      backgroundColor: 'white',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#2d3436',
      paddingHorizontal: 15,
    },
  });