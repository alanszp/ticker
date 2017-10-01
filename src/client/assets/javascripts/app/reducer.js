import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import quotes, { NAME as quotesName } from 'features/quotes';

export default combineReducers({
  routing,
  [quotesName]: quotes
});
