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


function* quoteInfo(action) {
    try {
        const quotes = yield call(QuoteService.chart, action.ticker);
        yield put(actionCreators.getQuoteSuceed(action.ticker, quotes));
    } catch (e) {
        yield put(actionCreators.getQuoteFailed(action.ticker, e));
    }
}

const saga = [
    takeLatest(actions.SEARCH_QUOTE_REQUEST, searchQuote),
    takeLatest(actions.GET_QUOTE_REQUEST, quoteInfo),
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
