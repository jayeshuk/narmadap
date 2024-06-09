import React, {
  SetStateAction,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {
  PROVIDER_DEFAULT,
  Polyline,
  Animated,
  Marker,
  MAP_TYPES,
} from 'react-native-maps';
import phaseOne from '../../assets/json/output1-10.json';
import phaseTwo from '../../assets/json/output11-12.json';
import {
  LocationType,
  PartJSON,
  UserOrientationType
} from '../../utilities/types';
import Geolocation from '@react-native-community/geolocation';
import PointMarker from '../PointMarker';
const NavIcon = require('../../assets/images/navicon_72.png');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const Phase1 = phaseOne as PartJSON;
const Phase2 = phaseTwo as PartJSON;
const mapStyle = [
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f2f0e3',
      },
    ],
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f2f0e3',
      },
    ],
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f2f0e3',
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f8e79c',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#eecf40',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#82c9db',
      },
    ],
  },
];

interface Props {
  userOrientation: UserOrientationType | undefined;
  userLocation: LocationType;
  setUserLocation: React.Dispatch<SetStateAction<LocationType>>;
}

const MapLatest = forwardRef(function MapLatest(props: Props, ref: any) {
  const {userLocation, setUserLocation, userOrientation} = props;
  const mapRef = React.useRef<MapView>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        fitToCoordinates(
          coordinates: {latitude: number; longitude: number}[],
        ): void {
          mapRef.current?.fitToCoordinates(coordinates);
        },
      };
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Animated
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        // initialRegion={{
        //   latitude: 0, // This the position data
        //   longitude: 0, // This is also position data
        //   latitudeDelta: 200,
        //   longitudeDelta: 1,
        // }} // Initial Render Region - work as initialValue
        region={userLocation} // Post Render Region - work as value
        zoomEnabled
        pitchEnabled
        // loadingEnabled={mapLoading} 
        zoomControlEnabled
        followsUserLocation>
        {/* {[
          {
            latitude: 22.2487877,
            longitude: 76.0941904,
            name: 'Teertha',
            elevation: 0,
            distance: 6.318997509804532,
          },
          {
            latitude: 22.2534728,
            longitude: 76.0728596,
            name: 'Narmada Parikrama of Vivek ji-Bhilat Dev Mandir to Narmada ashram',
            elevation: 0,
            distance: 8.571099234912738,
          },
          {
            latitude: 22.253711,
            longitude: 76.072613,
            name: 'Narmada Parikrama of Vivek ji- Ma Sharnam Ashram to Bhilat Dev Mandir',
            elevation: 198.7,
            distance: 8.600859088702462,
          },
          {
            latitude: 22.222205,
            longitude: 76.040009,
            name: 'Amrutasya Ma Narmada Pad Parikrama with Vivek ji- Mortakka to Raver',
            elevation: 178.6,
            distance: 11.969600959618903,
          },
          {
            latitude: 22.388017,
            longitude: 76.171651,
            name: 'Narmada Parikrama of Vivek ji-Bhilat Dev Mandir to Narmada ashram',
            elevation: 257,
            distance: 16.597406572448573,
          },
        ].map((point, index) => (
          <PointMarker point={point} key={`waypoint-${index}`} />
        ))} */}
        {/* <Marker.Animated
          image={NavIcon}
          coordinate={userLocation}
          tracksInfoWindowChanges={Platform.OS === 'ios' ? true : false}
          tracksViewChanges={Platform.OS === 'ios' ? true : false}
          flat
          rotation={userOrientation?.heading}
        /> */}
        {/* <Polyline
          coordinates={Phase1?.trackPoints?.map((coords: any) => ({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }))}
          strokeColor="#32741E" // border color of polyline
          strokeWidth={8}
          lineCap="butt"
        />
        <Polyline
          coordinates={Phase1?.trackPoints?.map((coords: any) => ({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }))}
          strokeColor="#65F67A" // color of the visible polyline
          strokeWidth={4}
          lineCap="butt"
        /> */}
      </Animated>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: screenHeight * 0.7,
    width: screenWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
});

export default MapLatest;
