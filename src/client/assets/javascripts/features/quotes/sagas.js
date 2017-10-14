// @flow

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { actionCreators, actions } from './quotes'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* searchQuote(action) {
  try {
    console.log('hola');
    yield put(actionCreators.quoteRequestSucceed());
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}
const saga = [
  takeEvery(actions.SEARCH_QUOTE_REQUEST, searchQuote),
];


export default saga;
