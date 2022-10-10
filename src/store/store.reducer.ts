import { AnyAction } from '@reduxjs/toolkit';

import { RouteRequest } from 'src/domains/route-request.interface';
import { ActionType, RoutesRequestState } from './store.types';

const initialState: RoutesRequestState = {
    routes: [],
    points: [],
    currentRoute: null,
};

export default function (state = initialState, action: AnyAction) {
    switch (action.type) {
        case ActionType.GET_ROUTES_REQUEST_SUCCESS: {
            return {
                ...state,
                routes: action.payload.routes,
                points: action.payload.points,
            };
        }
        case ActionType.GET_ROUTES_REQUEST_FAILURE: {
            return {
                ...state,
                routes: [],
                points: [],
                currentRoute: null,
            };
        }
        case ActionType.UPDATE_ROUTE_REQUEST: {
            return {
                ...state,
                newRoute: action.payload,
            };
        }
        case ActionType.UPDATE_ROUTE_SUCCESS_REQUEST: {
            return {
                ...state,
                routes: action.payload,
            };
        }
        case ActionType.UPDATE_ROUTE_FAILURE_REQUEST: {
            return {
                ...state,
                routes: [],
            };
        }
        case ActionType.SET_CURRENT_ROUTE: {
            const {routes} = state;
            const currentRoute = routes
                .find((route: RouteRequest) => route.id === action.payload.id) || null;

            return {
                ...state,
                currentRoute,
            };
        }
        default: {
            return state;
        }
    }
};
