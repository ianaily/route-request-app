import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import App from 'src/components/app/app.component';
import reducer from './store/store.reducer';
import rootSaga from './store/store.saga';
import reportWebVitals from './reportWebVitals';

import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.css';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware()
    .concat(sagaMiddleware)
    .concat(logger)
});

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

reportWebVitals();
