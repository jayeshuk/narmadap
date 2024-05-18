// import { LatLng, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import MapView from "react-native-map-clustering";
// import { View, StyleSheet, Platform, Text } from 'react-native';
// import { useState, useEffect } from 'react';
// import GPXParser from 'gpxparser';
// import RNFS, { writeFile } from 'react-native-fs';
// import ParikramaRoute1GPX from "./chunk"
// import GPX1 from './chunk1';
// import SubGPX from "./sub_chunk.gpx"
// //@ts-ignore
// import xml2js from 'react-native-xml2js';
// import { Float } from 'react-native/Libraries/Types/CodegenTypes';
// //@ts-ignore
// import ClusteredMapView from 'react-native-maps-super-cluster'


// //@ts-ignore
// // const ParikramaRoute1 = require('./narmada_chunks/ParikramaRoute1.gpx');// Adjust the path as needed

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: 600,
//         width: 400,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// interface Waypoint {
//     latitude: number;
//     longitude: number;
//     name: string;
//     elevation: number;
// }

// interface TrackPoint {
//     latitude: Float;
//     longitude: Float;
//     elevation: number;
// }

// const PointMarker = ({key, point, location} : {key:Number, point:Waypoint, location:any}) => {
//     const [shouldTrack, setShouldTrack] = useState(false)

//     useEffect(() => {
//         setShouldTrack(true);

//         const timeout = setTimeout(() => {
//             setShouldTrack(false)
//         }, 600);
//         return clearInterval(timeout)
//     }, [])

//     return <Marker
//         key={`waypoint-${key}`}
//         coordinate={{
//             latitude: point.latitude,
//             longitude: point.longitude,
//         }}
//         title={point.name}
//         tracksViewChanges={shouldTrack}
//         description={`Elevation: ${point.elevation} feet`}
//     />
// }

// const renderCluster = (cluster:any, onPress:any) => {
//     const pointCount = cluster.pointCount,
//           coordinate = cluster.coordinate,
//           clusterId = cluster.clusterId
 
//     // use pointCount to calculate cluster size scaling
//     // and apply it to "style" prop below
 
//     // eventually get clustered points by using
//     // underlying SuperCluster instance
//     // Methods ref: https://github.com/mapbox/supercluster
//     // const clusteringEngine = map.getClusteringEngine(),
//     //       clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)
 
//     return (
//       <Marker coordinate={coordinate} onPress={onPress}>
//         <View style={{}}>
//           <Text style={{}}>
//             {pointCount}
//           </Text>
//         </View>
//         {
//           /*
//             Eventually use <Callout /> to
//             show clustered point thumbs, i.e.:
//             <Callout>
//               <ScrollView>
//                 {
//                   clusteredPoints.map(p => (
//                     <Image source={p.image}>
//                   ))
//                 }
//               </ScrollView>
//             </Callout>
 
//             IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
//            */
//         }
//       </Marker>
//     )
//   }
 
// const  renderMarker = (data:any) => <Marker key={data.id || Math.random()} coordinate={{latitude:data.latitude, longitude:data.longitude}} />
 

// export default () => {

//     const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; }[]>([]);
//     const [location, setLocation] = useState({
//         latitude: 22.71,
//         longitude: 75.85,
//         latitudeDelta: 0.001,
//         longitudeDelta: 0.001,
//     });
//     const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
//     const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);

//     useEffect(() => {
//         const parseGpx = async () => {
//             try {
//                 // const response = await fetch('your_gpx_file_url_here');
//                 // const xml = await response.text();
//                 xml2js.parseString(GPX1, (error:any, result:any) => {
//                     if (error) {
//                       console.error('Error parsing XML:', error);
//                       return;
//                     }
//                     const gpxData = result?.gpx;
//                     console.log("GPXD", gpxData.trk[0].trkseg[0].trkpt)
//                     if (!gpxData) {
//                       console.error('GPX data not found');
//                       return;
//                     }
//                     const parsedWaypoints = gpxData?.wpt?.map((waypoint: any) => ({
//                       latitude: parseFloat(waypoint?.$?.lat || 0),
//                       longitude: parseFloat(waypoint?.$?.lon || 0),
//                       name: waypoint?.name?.[0] || 'Unknown',
//                       elevation: parseFloat(waypoint?.ele?.[0] || 0),
//                     })) as Waypoint[];
//                     const parsedTrackPoints = gpxData?.trk?.map((track: any) =>
//                       track?.trkseg?.map((segment: any) =>
//                         segment?.trkpt?.map((point: any) => ({
//                           latitude: parseFloat(point?.$?.lat ?? 0),
//                           longitude: parseFloat(point?.$?.lon ?? 0),
//                           elevation: parseFloat(point?.ele?.[0] ?? 0),
//                         }))
//                       )
//                     ) as TrackPoint[];
//                     setWaypoints(parsedWaypoints);
//                     let flatParsedTrackPoints = parsedTrackPoints.flat().flat().flat()
//                     console.log(flatParsedTrackPoints.flat().slice(0,2))
//                     setTrackPoints(flatParsedTrackPoints);
//                 });
//             } catch (error) {
//                 console.error('Error fetching GPX file:', error);
//             }
//         };

//         parseGpx();

//         // Clean up function
//         return () => {
//             // Any cleanup code if needed
//         };
//     }, []);
//     // var parseString = require('react-native-xml2js').parseString;
//     // var xml = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
//     // <gpx version="1.1" creator="GPS Visualizer https://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
//     // <wpt lat="22.222205" lon="76.040009">
//     //   <ele>178.6</ele>
//     //   <name>Amrutasya Ma Narmada Pad Parikrama with Vivek ji- Mortakka to Raver</name>
//     //   <desc>Wednesday, November 9, 2022, 7:38 AM IST&lt;br&gt;Elevation: 586 feet</desc>
//     //   <sym>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</sym>
//     // </wpt>
//     // <trk>
//     //   <name>Amrutasya Ma Narmada Pad Parikrama with Vivek ji</name>
//     //   <trkseg>
//     //     <trkpt lat="22.24371" lon="76.1539446"></trkpt>
//     //     <trkpt lat="22.2420318" lon="76.1532257"></trkpt>
//     //     <trkpt lat="22.2412969" lon="76.1532257"></trkpt>
//     //     <trkpt lat="22.2408004" lon="76.1531292"></trkpt>
//     //     <trkpt lat="22.2405024" lon="76.1534832"></trkpt>
//     //     <trkpt lat="22.239847" lon="76.1536549"></trkpt>
//     //     <trkpt lat="22.2392611" lon="76.1537193"></trkpt>
//     //     <trkpt lat="22.2393703" lon="76.1522709"></trkpt>
//     //     <trkpt lat="22.2396981" lon="76.1514018"></trkpt>
//     //     <trkpt lat="22.2400556" lon="76.1502217"></trkpt>
//     //     <trkpt lat="22.2402343" lon="76.1490629"></trkpt>
//     //     <trkpt lat="22.2399662" lon="76.1467026"></trkpt>
//     //     <trkpt lat="22.239857" lon="76.1405871"></trkpt>
//     //   </trkseg>
//     // </trk>
//     // <trk>
//     //   <name>Amrutasya Ma Narmada Pad Parikrama with Vivek ji</name>
//     //   <desc>&lt;img src="https://doc-08-40-mymaps.googleusercontent.com/untrusted/hostedimage/ohbuchmejk661ppa6gmqs6qluo/kg1bj6ucu7826lk8o8g33a53hg/1702352314000/Pz8MbHGv2tWyGDjyHxBp5PhU5t8wOB-c/08405175580136552894/5AEQ8PiuN7ISGdpP5ZZXTwkiFaOP4BkRFpZwlZGdaYEWDkvusCakYMk-Fh1IjS9jZzUZXLgo_m-YW8hAn1G033kgEQdbhxc4EXTNMNnX43U3b9t56f7IZAO3HVwZxKT0vgX21fEXU1UGDfoNaREYhM6Ua_NdDw-k0jLljIOEGza1bhmams2yzq9p6OSV_4HCSVhdTd97t2tngMu-ZBoNpkGFu58u5doMiRvgUnQGJ_Am7xn6wcIc?session=0&amp;fife" height="200" width="auto" /&gt;&lt;br&gt;&lt;br&gt;Amrutasya Ma Narmada Pad Parikrama with Vivek ji- Mortakka to Raver                      Wednesday, November 9, 2022, 7:38 AM IST&lt;br&gt;Distance: 14.0 miles&lt;br&gt;Duration: 9 hours, 26 minutes, and 13 seconds&lt;br&gt;Average Speed: 1.5 mph&lt;br&gt;Minimum Elevation: 517 feet&lt;br&gt;Maximum Elevation: 608 feet&lt;br&gt;Total climb: 469 feet&lt;br&gt;Total descent: 516 feet</desc>
//     //   <trkseg>
//     //     <trkpt lat="22.222205" lon="76.040009">
//     //       <ele>178.578</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222213" lon="76.039974">
//     //       <ele>178.025</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222635" lon="76.038846">
//     //       <ele>174.079</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222726" lon="76.038643">
//     //       <ele>172.864</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222748" lon="76.038603">
//     //       <ele>173.204</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222773" lon="76.038519">
//     //       <ele>172.112</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222827" lon="76.038351">
//     //       <ele>170.108</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.222848" lon="76.03818">
//     //       <ele>169.563</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.173527" lon="75.876651">
//     //       <ele>162.208</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.173545" lon="75.876705">
//     //       <ele>163.7</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.17354" lon="75.876718">
//     //       <ele>164.183</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.17354" lon="75.876716">
//     //       <ele>163.817</ele>
//     //     </trkpt>
//     //     <trkpt lat="22.173541" lon="75.876719">
//     //       <ele>163.538</ele>
//     //     </trkpt>
//     //   </trkseg>
//     //    </trk></gpx>`
//     // parseString(xml, function (err:any, result:any) {
//     //     console.dir(result);
//     //     console.log("RESULT:",result.gpx.trk);
//     //     // writeFile("./sample.json",JSON.stringify(result))
//     //     // const parsedCoordinates = result.gpx.trk[0].trkseg[0].trkpt.map((point:any) => ({
//     //     //     latitude: parseFloat(point.$.lat),
//     //     //     longitude: parseFloat(point.$.lon),
//     //     //   }));
//     //     //   setCoordinates(parsedCoordinates);
//     // });

//     return <View style={styles.container}>
//          <ClusteredMapView
//         style={{flex: 1}}
//         data={waypoints}
//         initialRegion={location}
//         // ref={(r) => { this.map = r }}
//         renderMarker={renderMarker}
//         renderCluster={renderCluster} />
//         {/* <MapView
//             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//             showsUserLocation={true}
//             followsUserLocation={true}
//             scrollEnabled={true}
//             zoomEnabled={true}
//             pitchEnabled={true}
//             rotateEnabled={true}
//             onRegionChange={(_location, details) => {
//                 // console.log(_location);
//                 // console.log(details);
//                 setLocation(_location);
//             }}
//             initialRegion={location}
//             style={styles.map}
//             showsMyLocationButton
//             zoomControlEnabled
//         >
//             {waypoints.map((waypoint, index) => (
//                 <PointMarker key={index} point={waypoint} location={location} />
//             ))}
//             <Polyline
//                 coordinates={trackPoints.map((point) => ({
//                 latitude: point?.latitude,
//                 longitude: point?.longitude,
//                 }))}
//                 // coordinates={[
//                 //     {latitude:19.1485, longitude:77.3191},
//                 //     {latitude:19.2608, longitude:76.7748}
//                 //     // {latitude: 37.8025259, longitude: -122.4351431},
//                 //     // {latitude: 37.7896386, longitude: -122.421646},
//                 //     // {latitude: 37.7665248, longitude: -122.4161628},
//                 //     // {latitude: 37.7734153, longitude: -122.4577787},
//                 //     // {latitude: 37.7948605, longitude: -122.4596065},
//                 //     // {latitude: 37.8025259, longitude: -122.4351431},
//                 //   ]}
//                     strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
//                     strokeColors={[
//                     '#7F0000',
//                     '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
//                     '#B24112',
//                     '#E5845C',
//                     '#238C23',
//                     '#7F0000',
//                     ]}
//                 strokeWidth={6}
//             />
//         </MapView> */}
//     </View>
// }

{/* <Polyline
coordinates={trackPoints.map((point) => ({
latitude: point?.latitude,
longitude: point?.longitude,
}))} */}
// coordinates={[
//     {latitude:19.1485, longitude:77.3191},
//     {latitude:19.2608, longitude:76.7748}
//     // {latitude: 37.8025259, longitude: -122.4351431},
//     // {latitude: 37.7896386, longitude: -122.421646},
//     // {latitude: 37.7665248, longitude: -122.4161628},
//     // {latitude: 37.7734153, longitude: -122.4577787},
//     // {latitude: 37.7948605, longitude: -122.4596065},
//     // {latitude: 37.8025259, longitude: -122.4351431},
//   ]}
//     strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
//     strokeColors={[
//     '#7F0000',
//     '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
//     '#B24112',
//     '#E5845C',
//     '#238C23',
//     '#7F0000',
//     ]}
// strokeWidth={6}
// /> 