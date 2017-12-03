// @flow

import {State} from 'models/friends';
import isFunction from 'lodash/isFunction';
// Action Types

const SEARCH_QUOTE_REQUEST = 'ticker/quotes/SEARCH_QUOTE_REQUEST';
const SEARCH_QUOTE_SUCCEED = 'ticker/quotes/SEARCH_QUOTE_SUCCEED';
const SEARCH_QUOTE_FAILED = 'ticker/quotes/SEARCH_QUOTE_FAILED';
const SEARCH_QUOTE_RESET = 'ticker/quotes/SEARCH_QUOTE_RESET';
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
        detail: null,
        error: null
    }
};

// Reducer
const reucers = {
    [SEARCH_QUOTE_RESET]: (state) => {
        return {
            ...state,
            search: {
                ...initialState.search
            }
        }
    },
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

    [GET_QUOTE_REQUEST]: (state, action) => {
        return {
            ...state,
            quote: {
                ...initialState.quote,
                ticker: action.ticker,
                loading: true,
            }
        }
    },

    [GET_QUOTE_SUCCEED]: (state, action) => {
        return {
            ...state,
            quote: {
                ticker: action.ticker,
                loading: false,
                loaded: true,
                error: null,
                detail: action.detail
            }
        }
    },

    [GET_QUOTE_FAILED]: (state, action) => {
        return {
            ...state,
            quote: {
                ticker: action.ticker,
                loading: false,
                loaded: false,
                detail: null,
                error: action.error
            }
        }
    }
};

export default function reducer(state = initialState, action = {}) {
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

function getQuoteSuceed(ticker, detail) {
    return {
        type: GET_QUOTE_SUCCEED,
        ticker,
        detail
    };
}

function getQuoteFailed(ticker, error) {
    return {
        type: GET_QUOTE_FAILED,
        ticker,
        error
    };
}

function resetQuoteSearch() {
    return {
        type: SEARCH_QUOTE_RESET,
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
    quoteRequestFailed,
    resetQuoteSearch,
    getQuote,
    getQuoteSuceed,
    getQuoteFailed,
};

export const actions = {
    SEARCH_QUOTE_REQUEST,
    SEARCH_QUOTE_SUCCEED,
    SEARCH_QUOTE_FAILED,
    GET_QUOTE_REQUEST,
    GET_QUOTE_SUCCEED,
    GET_QUOTE_FAILED
};
