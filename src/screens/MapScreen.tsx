import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Platform,
  Linking,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  LocationType,
  UserOrientationType,
} from '../utilities/types';
import MapView from 'react-native-maps';
//@ts-ignore
import CompassHeading from 'react-native-compass-heading';
import {fetchData} from '../utilities/api';
import MapLatest from '../components/Map/MapComponent';
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen({route}:{route:any}) {
  const mapRef = useRef<MapView>(null);
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userOrientation, setUserOrientation] = useState<UserOrientationType>();
  const [userLocation, setUserLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const ShowNearestTrackPoint = async () => {
    setMapLoading(true);
    setError(null);
    try {
      const response = await fetchData('http://10.0.2.2:3000/nearest-point', {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        type: 'trackpoint',
      });
      // const scheme = Platform.select({
      //   ios: 'maps://0,0?q=',
      //   android: 'geo:0,0?q=',
      // });
      const scheme = Platform.select({
        ios: 'http://maps.apple.com/?daddr=',
        android: 'google.navigation:q=',
      });
      const latLng = `${response.latitude},${response.longitude}`;
      const label = '';
      // const url = Platform.select({
      //   ios: `${scheme}${label}@${latLng}`,
      //   android: `${scheme}${latLng}(${label})`,
      // });
      const url = Platform.select({
        ios: `${scheme}${latLng}&dirflg=d`,
        android: `${scheme}${latLng}`,
      });

      Linking.openURL(url || '');
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setMapLoading(false);
    }
  };
  const ShowEntireRoute = async () => {
    setMapLoading(true);
    setError(null);
    try {
      const response = await fetchData('http://10.0.2.2:3000/waypoints');
      mapRef?.current?.fitToCoordinates(response.data);
      setMapLoading(false);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setMapLoading(false);
    }
  };
  
  useEffect(() => {
    setMapLoading(true)
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude,"LOCA");
        setUserLocation(prevRegion => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
        setMapLoading(false);
      },
      error => {
        setMapLoading(false);
        Alert.alert("Error loading map:", JSON.stringify(error));
      },
      {enableHighAccuracy: true, distanceFilter: 1, interval: 100},
    );

    const degree_update_rate = 1;

    CompassHeading.start(degree_update_rate, (orientation: any) => {
      console.log('CompassHeading: ', orientation);
      setUserOrientation(orientation);
    });

    return () => {
      CompassHeading.stop();
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View>
      {mapLoading && !route.params.userLocation.latitude ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <MapLatest
          ref={mapRef}
          userLocation={route.params.userLocation}
          setUserLocation={setUserLocation}
          userOrientation={userOrientation}
        />
      )}
      <View style={styles.button}>
        <Button
          title="Navigate To Nearest Start Point"
          onPress={ShowNearestTrackPoint}
        />
      </View>
      <View style={styles.button}>
        <Button title="Show Entire Route" onPress={ShowEntireRoute} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    margin: 10,
  },
});
