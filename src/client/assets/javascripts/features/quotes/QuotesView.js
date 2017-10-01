import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, selector } from './';
import QuotesLayout from './components/QuotesLayout/QuotesLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
}))
export default class QuotesView extends Component {
  render() {
    return (
      <div>
        <QuotesLayout {...this.props} />
      </div>
    );
  }
}
