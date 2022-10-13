import { LatLngExpression } from 'leaflet';

export type MapProps = {
  defaultPosition: LatLngExpression;
  unloadingPoint?: LatLngExpression;
  loadingPoint?: LatLngExpression;
}
