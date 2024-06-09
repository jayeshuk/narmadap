import React from 'react'
import { Marker } from 'react-native-maps';
import { PointMarker as MarkerDataType } from '../utilities/types';


export default function PointMarker({ point} : MarkerDataType) {
  return (
       <Marker
            coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
            }}
            title={point.name}
            // tracksViewChanges={shouldTrack}
            description={`Elevation: ${point.elevation} feet`}
        />
  )
}