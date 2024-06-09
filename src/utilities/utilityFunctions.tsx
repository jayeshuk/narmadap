// src/utils/permissions.ts
import {Alert, Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const currentStatus = await check(permission);
    if (currentStatus === RESULTS.GRANTED) {
      console.log('Location permission already granted');
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("location permission denied")
    }

    if (currentStatus === RESULTS.DENIED) {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        Alert.alert(
          'Location Permission',
          'Location permission is required to use this feature. Please enable it in the app settings.',
        );
        return false;
      }
    }

    if (currentStatus === RESULTS.BLOCKED) {
      Alert.alert(
        'Location Permission Blocked',
        'Location permission is blocked. Please enable it in the app settings.',
      );
      return false;
    }

    if (currentStatus === RESULTS.UNAVAILABLE) {
      Alert.alert(
        'Location Permission Unavailable',
        'Location permission is not available on this device.',
      );
      return false;
    }

    return false;
  } catch (error) {
    console.error('Error requesting location permission', error);
    return false;
  }
};
