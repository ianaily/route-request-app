import { LatLngExpression } from 'leaflet';

export interface RouteRequest {
  id: number;
  title: string;
  loadingPoint: LatLngExpression;
  unloadingPoint: LatLngExpression;
}
