import {
  LatLng,
  Marker,
  UrlTile,
  Polyline,
  PROVIDER_DEFAULT,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapView from 'react-native-map-clustering';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import json1 from '../../assets/gpx/narmada_composite/output.ts';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
const config: {
  skipPermissionRequests: boolean;
  authorizationLevel?: 'always' | 'whenInUse' | 'auto';
  enableBackgroundLocationUpdates?: boolean;
  locationProvider?: 'playServices' | 'android' | 'auto';
} = {
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'android',
};

const handleLocationPermission = async () => {
  // 👈
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

//@ts-ignore
// const ParikramaRoute1 = require('./narmada_chunks/ParikramaRoute1.gpx');// Adjust the path as needed
Geolocation.setRNConfiguration(config);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

interface Waypoint {
  latitude: number;
  longitude: number;
  name: string;
  elevation: number;
}

interface TrackPoint {
  latitude: Float;
  longitude: Float;
  elevation: number;
}

const PointMarker = ({
  index,
  point,
  location,
}: {
  index: any;
  point: Waypoint;
  location: any;
}) => {
  const [shouldTrack, setShouldTrack] = useState(false);

  useEffect(() => {
    setShouldTrack(true);

    const timeout = setTimeout(() => {
      setShouldTrack(false);
    }, 600);
    return clearInterval(timeout);
  }, []);

  return (
    <Marker
      key={`waypoint-${index}`}
      coordinate={{
        latitude: point.latitude,
        longitude: point.longitude,
      }}
      title={point.name}
      tracksViewChanges={shouldTrack}
      description={`Elevation: ${point.elevation} feet`}
    />
  );
};

export default () => {
  const [zoomLevel, setZoomLevel] = useState(10); // Initial zoom level
  const [coordinates, setCoordinates] = useState<
    {latitude: number; longitude: number}[]
  >([]);
  const [location, setLocation] = useState({
    latitude: 22.71,
    longitude: 75.85,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [waypoints, setWaypoints] = useState<Waypoint[]>(json1.waypoints);
  const [trackPoints, setTrackPoints] = useState<TrackPoint[]>(
    json1.trackPoints,
  );

  const handleRegionChangeComplete = (region: any) => {
    const newZoomLevel = getZoomLevel(region.latitudeDelta);
    setZoomLevel(newZoomLevel);
    console.log('NEW ZOOM', newZoomLevel);
  };

  const getZoomLevel = (latitudeDelta: any) => {
    // You can adjust the zoom level calculation based on your preference
    // For example, you can define different zoom levels for different latitudeDelta ranges
    return Math.round(Math.log2(360 / latitudeDelta)) + 1;
  };

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
      <MapView
        provider={PROVIDER_DEFAULT} // remove if not using Google Maps
        showsUserLocation
        followsUserLocation
        scrollEnabled
        zoomEnabled
        pitchEnabled
        rotateEnabled
        // onRegionChange={(_location, details) => {
        //     setLocation(_location);
        // }}
        onRegionChangeComplete={handleRegionChangeComplete}
        initialRegion={location}
        style={styles.map}
        showsMyLocationButton
        zoomControlEnabled>
        {waypoints?.map((waypoint, index) => (
          <PointMarker
            key={index}
            index={index}
            point={waypoint}
            location={location}
          />
        ))}
      </MapView>
    </View>
  );
};
