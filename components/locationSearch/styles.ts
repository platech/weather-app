import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.champagne,
    padding: 16,
  },
  locationContainer: {
    backgroundColor: colors.sunset,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.sealbrown,
    marginRight: 8,
    paddingVertical: 8,
    minHeight: 44, // Minimum touch target size
  },
  locationText: {
    fontSize: 16,
    color: colors.sealbrown,
  },
  locationButton: {
    padding: 8,
    minHeight: 44, // Match input height
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.sunset,
    borderRadius: 8,
    marginBottom: 1,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationItem: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.sunset,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.sealbrown,
    paddingHorizontal: 15,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.sealbrown,
    fontSize: 16,
  },
  separator: {
    height: 1,
    marginVertical: 5,
  },
});