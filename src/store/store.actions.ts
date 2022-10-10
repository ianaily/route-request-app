import { RouteRequest } from 'src/domains/route-request.interface';
import { ActionType, RoutesRequestData } from './store.types';

export const getRoutesRequestAction = () => ({
    type: ActionType.GET_ROUTES_REQUEST,
});

export const getRoutesRequestSuccessAction = (payload: RoutesRequestData) => ({
    type: ActionType.GET_ROUTES_REQUEST_SUCCESS,
    payload,
});

export const getRoutesRequestFailureAction = (payload: RoutesRequestData) => ({
    type: ActionType.GET_ROUTES_REQUEST_FAILURE,
    payload,
});

export const updateRouteRequestAction = (payload: RouteRequest) => ({
    type: ActionType.UPDATE_ROUTE_REQUEST,
    payload,
});

export const updateRouteRequestSuccessAction = (payload: RouteRequest[]) => ({
    type: ActionType.UPDATE_ROUTE_SUCCESS_REQUEST,
    payload,
});

export const updateRouteRequestFailureAction = (payload: RouteRequest) => ({
    type: ActionType.UPDATE_ROUTE_FAILURE_REQUEST,
    payload,
});

export const setCurrentRouteAction = (payload: RouteRequest | null) => ({
    type: ActionType.SET_CURRENT_ROUTE,
    payload,
});
