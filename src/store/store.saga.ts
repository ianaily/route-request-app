import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { select } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';

import fakeFetch from 'src/api/fake-fetch';
import { RouteRequest } from 'src/domains/route-request.interface';
import {
    getRoutesRequestFailureAction,
    getRoutesRequestSuccessAction,
    updateRouteRequestFailureAction,
    updateRouteRequestSuccessAction
} from './store.actions';
import { ActionType, RoutesRequestData, RoutesRequestState } from './store.types';

function* fetchRoutes() {
    try {
        const routes = yield call(fakeFetch, 'routes');
        const points = yield call(fakeFetch, 'points');
        yield put(getRoutesRequestSuccessAction({routes, points} as RoutesRequestData));
    } catch (e) {
        yield put((getRoutesRequestFailureAction(e)));
    }
}

const getRoutes = (state: RoutesRequestState) => state.routes;

function* updateRoute(action: AnyAction) {
    const routes = yield select(getRoutes)

    try {
        const oldRoutes = [...routes];
        const newRoutes = oldRoutes.map((route: RouteRequest) =>
            route.id === action.payload.id
                ? action.payload
                : route
        );

        yield put(updateRouteRequestSuccessAction(newRoutes));
    } catch (e) {
        yield put((updateRouteRequestFailureAction(e)));
    }
}

function* routesRequestsSaga() {
    yield all([
        takeLatest(ActionType.GET_ROUTES_REQUEST, fetchRoutes),
        takeEvery(ActionType.UPDATE_ROUTE_REQUEST, updateRoute)
    ]);
}

export default routesRequestsSaga;

