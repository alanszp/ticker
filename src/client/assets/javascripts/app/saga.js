import { all } from 'redux-saga/effects'

import { default as quotesSagas } from '../features/quotes/sagas';

export default function* rootSaga() {
  yield all([
    ...quotesSagas
  ])
}
