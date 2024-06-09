import React, {useEffect, FC} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/utilities/types';
import { requestLocationPermission } from './src/utilities/utilityFunctions';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {

  useEffect(() => {
    const checkPermission = async () => {
      const isGranted = await requestLocationPermission();
      if (!isGranted) {
        console.log('Location permission not granted');
      }
    };

    checkPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
