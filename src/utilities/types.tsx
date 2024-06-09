

export interface TrackPoint {
  latitude: number;
  longitude: number;
}
export interface WayPoint {
  latitude: number;
  longitude: number;
  name: string;
  elevation: number;
}
export interface PartJSON {
  trackPoints: TrackPoint[];
  waypoints: WayPoint[];
}
export interface LocationType {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface PointMarker {
  point: WayPoint;
}
export interface UserOrientationType {
  heading: number;
  accuracy: number;
}
export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};
