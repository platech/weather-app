import { getForegroundPermissionsAsync, getLastKnownPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useState } from 'react';
import { Alert, Linking } from 'react-native';

interface UseDeviceLocationProps {
  onLocationReceived: (latitude: number, longitude: number) => void;
}

export const useDeviceLocation = ({ onLocationReceived }: UseDeviceLocationProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = async () => {
    try {
      const position = await getLastKnownPositionAsync();
      if (position?.coords) {
        const { latitude, longitude } = position.coords;
        onLocationReceived(latitude, longitude);
      } else {
        throw new Error('No position data available');
      }
    } catch (error) {
      throw error;
    }
  };

  const getDeviceLocation = async () => {
    setIsLoading(true);
    try {
      // First check if we already have permissions
      const { status: existingStatus } = await getForegroundPermissionsAsync();
      
      if (existingStatus === 'granted') {
        await getCurrentPosition();
        return;
      }

      // If not granted, request permissions
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await getCurrentPosition();
      } else {
        // Permission denied
        Alert.alert(
          'Permission needed',
          'In order to use location services, we need your permission. Would you like to enable it in settings?',
          [
            { text: 'Not Now', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                Linking.openSettings();
              }
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Oops!',
        'I couldn\'t get your location. Please check if location services are enabled in your device settings.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getDeviceLocation
  };
}; 