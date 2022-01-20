import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../modules/sagas';
import * as reducers from '../modules';
import { GlobalState } from '../modules';

const isTestEnv = process.env.NODE_ENV === 'test';
const shouldLog = process.env.NODE_ENV !== 'production' && !isTestEnv;

const rootReducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (shouldLog) {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

export default function configStore() {
  const store: Store<GlobalState> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
