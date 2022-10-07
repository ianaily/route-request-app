import { AnyAction } from '@reduxjs/toolkit';

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
                routes: [],
                points: [],
                currentRoute: null,
            };
        }
        case ActionType.SET_CURRENT_ROUTE: {
            return {
                ...state,
                currentRoute: action.payload,
            };
        }
        case ActionType.UPDATE_ROUTE_REQUEST: {
            return {
                ...state,
                routes: state.routes.map((route) => (
                    route.id === action.payload.id
                        ? action.payload
                        : route
                )),
            };
        }
        default: {
            return state;
        }
    }
};
