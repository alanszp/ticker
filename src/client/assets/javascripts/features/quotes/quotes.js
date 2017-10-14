// @flow

import { State } from 'models/friends';
import isFunction from 'lodash/isFunction';
import startsWith from 'lodash/startsWith';
// Action Types

const SEARCH_QUOTE_REQUEST = 'ticker/quotes/SEARCH_QUOTE_REQUEST';
const SEARCH_QUOTE_SUCCEED = 'ticker/quotes/SEARCH_QUOTE_SUCCEED';
const SEARCH_QUOTE_FAILED = 'ticker/quotes/SEARCH_QUOTE_FAILED';
const GET_QUOTE_REQUEST = 'ticker/quotes/GET_QUOTE_REQUEST';
const GET_QUOTE_SUCCEED = 'ticker/quotes/GET_QUOTE_SUCCEED';
const GET_QUOTE_FAILED = 'ticker/quotes/GET_QUOTE_FAILED';

// This will be used in our root reducer and selectors

export const NAME = 'quotes';

// Define the initial state for `friends` module

const initialState = {
  search: {
    term: '',
    loading: false,
    loaded: false,
    items: null,
    error: null
  },
  quote: {
    ticker: null,
    loading: false,
    loaded: false,
    info: null,
    error: null
  }
};

// Reducer
const reucers = {
  [SEARCH_QUOTE_REQUEST]: (state, action) => {
    return {
      ...state,
      search: {
        ...state.search,
        term: action.search,
        loading: true,
        loaded: false
      }
    }
  },

  [SEARCH_QUOTE_SUCCEED]: (state, action) => {
    return {
      ...state,
      search: {
        ...state.search,
        loading: false,
        loaded: true,
        error: null,
        items: action.items
      }
    }
  },

  [SEARCH_QUOTE_FAILED]: (state, action) => {
    return {
      ...state,
      search: {
        ...state.search,
        loading: false,
        loaded: false,
        items: null,
        error: action.error
      }
    }
  },

  '@@router/LOCATION_CHANGE': (state, action) => {
      if (!startsWith(action.payload.pathname, '/quotes/')) {
          return state;
      }

      let quote = action.payload.pathname.replace('/quotes/', '').toUpperCase();
      return {
          search: {
              ...initialState.search,
              term: quote
          },
          quote: {
              ...initialState.quote,
              ticker: quote,
              loading: true
          }
      }
  }
};

export default function reducer(state = initialState, action = {}){
  return (isFunction(reucers[action.type])) ? reucers[action.type](state, action) : state
}

// Action Creators

function quoteSearch(search) {
  return {
    type: SEARCH_QUOTE_REQUEST,
    search
  };
}


function quoteRequestSucceed(search, items) {
  return {
    type: SEARCH_QUOTE_SUCCEED,
    search,
    items
  };
}

function quoteRequestFailed(search, error) {
  return {
    type: SEARCH_QUOTE_FAILED,
    search,
    error
  };
}

function getQuote(ticker) {
    return {
        type: GET_QUOTE_REQUEST,
        ticker
    };
}

// Selectors

const quotes = (state) => {
  return state[NAME];
};

export const selector = (state) => ({
  quotes: state.quotes
});

export const actionCreators = {
  quoteSearch,
  quoteRequestSucceed,
  quoteRequestFailed
};

export const actions = {
  SEARCH_QUOTE_REQUEST,
  SEARCH_QUOTE_SUCCEED,
  SEARCH_QUOTE_FAILED
};
