import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducer';
import rootSaga from '../saga'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [promiseMiddleware, sagaMiddleware];

const enhancer = compose(
  applyMiddleware(...middlewares)
)(createStore);

sagaMiddleware.run(rootSaga);

export default function configureStore(initialState) {
  return enhancer(rootReducer, initialState);
}
