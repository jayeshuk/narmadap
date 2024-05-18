import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import MapView, {PROVIDER_DEFAULT, Polyline, Animated} from 'react-native-maps';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import phaseOne from './JSON/output1-10.json'

interface TrackPoint {
  latitude: number;
  longitude: number;
}

interface WayPoint {
    "latitude": number;
    "longitude": number;
    "name": string;
    "elevation":number;
}

interface Part1 {
  trackPoints: TrackPoint[];
  waypoints: WayPoint[];
}
const Phase1 = phaseOne as Part1;

const handleLocationPermission = async () => {
  let permissionCheck = '';
  if (Platform.OS === 'ios') {
    permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (
      permissionCheck === RESULTS.BLOCKED ||
      permissionCheck === RESULTS.DENIED
    ) {
      const permissionRequest = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      permissionRequest === RESULTS.GRANTED
        ? console.warn('Location permission granted.')
        : console.warn('location permission denied.');
    }
  }

  if (Platform.OS === 'android') {
    permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (
      permissionCheck === RESULTS.BLOCKED ||
      permissionCheck === RESULTS.DENIED
    ) {
      const permissionRequest = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      permissionRequest === RESULTS.GRANTED
        ? console.warn('Location permission granted.')
        : console.warn('location permission denied.');
    }
  }
};

export default function MapLatest() {
  const [location, setLocation] = useState({
    latitude: 22.71,
    longitude: 75.85,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    handleLocationPermission();
    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          // Update map region to user's location
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    // Call the fetchUserLocation function when component mounts
    fetchUserLocation();

    // Optionally, you can set up a timer to periodically update user's location
    const intervalId = setInterval(fetchUserLocation, 10000);

    // Clear the interval when component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);


  return (
    <View style={styles.container}>
      <Animated
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_DEFAULT} // remove if not using Google Maps
        showsUserLocation
        initialRegion={location}
        zoomEnabled
        zoomControlEnabled
        pitchEnabled
        followsUserLocation>
        <Polyline
          coordinates={Phase1?.trackPoints?.map((coords:any) => ({latitude: coords.latitude, longitude: coords.longitude}))}
          strokeColor="#0F53FF" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
        />
        {/* <Polyline
          coordinates={[
            {latitude:22.2217, longitude:76.0375},
            {latitude:location.latitude   , longitude:location.longitude},
            // {latitude: 19.1485, longitude: 77.3191},
            // {latitude: 19.2608, longitude: 75.7748},
          ]}
          strokeColor="grey" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
        /> */}
      </Animated>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
