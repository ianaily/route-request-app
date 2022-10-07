import { put, call, takeEvery } from 'redux-saga/effects';

import fakeFetch from 'src/api/fake-fetch';
import {
    getRoutesRequestFailureAction,
    getRoutesRequestSuccessAction
} from './store.actions';
import { ActionType, RoutesRequestData } from './store.types';

function* fetchRoutes() {
    try {
        const routes = yield call(() => fakeFetch('routes'));
        const points = yield call(() => fakeFetch('points'));
        yield put(getRoutesRequestSuccessAction({ routes, points } as RoutesRequestData));
    } catch (e) {
        yield put((getRoutesRequestFailureAction(e)));
    }
}

function* routesRequestsSaga() {
    yield takeEvery(ActionType.GET_ROUTES_REQUEST, fetchRoutes);
}

export default routesRequestsSaga;

