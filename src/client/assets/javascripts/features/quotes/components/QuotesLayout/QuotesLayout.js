import React, { Component, PropTypes } from 'react';

export default class QuotesLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    quotes: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="friendListApp">
        <h1>Quoty</h1>
      </div>
    );
  }
}
