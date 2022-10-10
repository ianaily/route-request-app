import { LatLngExpression } from 'leaflet';

import { RouteRequest } from 'src/domains/route-request.interface';

export interface RoutesRequestState {
    routes: RouteRequest[];
    points: LatLngExpression[];
    currentRoute: RouteRequest | null;
}

export interface RoutesRequestData extends RoutesRequestState {
}

export enum ActionType {
    GET_ROUTES_REQUEST = 'GET_ROUTES_REQUEST',
    GET_ROUTES_REQUEST_SUCCESS = 'GET_ROUTES_REQUEST_SUCCESS',
    GET_ROUTES_REQUEST_FAILURE = 'GET_ROUTES_REQUEST_FAILURE',
    UPDATE_ROUTE_REQUEST = 'UPDATE_ROUTE_REQUEST',
    UPDATE_ROUTE_SUCCESS_REQUEST = 'UPDATE_ROUTE_SUCCESS_REQUEST',
    UPDATE_ROUTE_FAILURE_REQUEST = 'UPDATE_ROUTE_FAILURE_REQUEST',
    SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE',
}
