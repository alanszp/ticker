// @flow

import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {actionCreators, actions} from './quotes'
import * as QuoteService from '../../utils/QuoteService'

function* searchQuote(action) {
    try {
        const quotes = yield call(QuoteService.search, action.search);
        yield put(actionCreators.quoteRequestSucceed(action.search, quotes));
    } catch (e) {
        yield put(actionCreators.quoteRequestFailed(action.search, e));
    }
}
const saga = [
    takeLatest(actions.SEARCH_QUOTE_REQUEST, searchQuote),
];

function* watchSearch() {
    let task;
    while (true) {
        const {input} = yield take(actions.SEARCH_QUOTE_REQUEST);
        if (task) {
            yield cancel(task)
        }
        task = yield fork(searchQuote, input)
    }
}


export default saga;
