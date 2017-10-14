import React, { Component, PropTypes } from 'react';
import QuoteSelection from '../QuotesSelection';
import QuotesList from '../QuotesList';

export default class QuotesLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    quotes: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="layout">
        <QuoteSelection />
      </div>
    );
  }
}
