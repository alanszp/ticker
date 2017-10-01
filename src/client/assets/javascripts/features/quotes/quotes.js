// @flow

import { State } from 'models/friends';
import isFunction from 'lodash/isFunction';
import { createStructuredSelector } from 'reselect';
// Action Types

const SEARCH_QUOTE_REQUEST = 'redux-app/quotes/SEARCH_QUOTE_REQUEST';
const SEARCH_QUOTE_SUCCEED = 'redux-app/quotes/SEARCH_QUOTE_SUCCEED';
const SEARCH_QUOTE_FAILED = 'redux-app/quotes/SEARCH_QUOTE_FAILED';

// This will be used in our root reducer and selectors

export const NAME = 'quotes';

// Define the initial state for `friends` module

const initialState = {
  search: '',
  loading: false,
  loaded: false,
  response: null
};

// Reducer

export default function reducer(state = initialState, action = {}){
  const actions = {
  };

  console.log(action);
  return (isFunction(actions[action.type])) ? actions[action.type]() : state
}

// Action Creators

function quoteSearch(ticker) {
  return {
    type: SEARCH_QUOTE_REQUEST,
    ticker
  };
}


function quoteRequestSucceed(ticker, response) {
  return {
    type: SEARCH_QUOTE_SUCCEED,
    ticker,
    response
  };
}

function quoteRequestFailed(ticker, response) {
  return {
    type: SEARCH_QUOTE_FAILED,
    ticker,
    response
  };
}

// Selectors

const quotes = (state) => state[NAME];

export const selector = createStructuredSelector({
  quotes
});

export const actionCreators = {
  quoteSearch,
  quoteRequestSucceed,
  quoteRequestFailed
};
