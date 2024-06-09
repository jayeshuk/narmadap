import React, {FC, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, Button, StyleSheet, Alert, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { LocationType } from '../utilities/types';

const HomeScreen: FC<{navigation: any}> = ({navigation}) => {
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
        <Button
          title="Let's Explore"
          onPress={() => {
            Geolocation.getCurrentPosition((position) => {
              console.log("OPPPP:",position)
              navigation.navigate('Map', {
                userLocation: {
                  ...userLocation,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            })
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
