import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { actionCreators, selector } from '../../quotes';
import { bindActionCreators } from 'redux';
import { TextField } from 'material-ui';

import './QuotesSelection.scss'

@connect(
    (state) => {
        return {
            search: selector(state).quotes.search
        }
    },
    (dispatch) => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)
export default class QuotesSelection extends Component {
    static propTypes = {
        search: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired
    };

    handleTextChange(e) {
        this.props.actions.quoteSearch(e.target.value);
    }

    render() {
        return (
            <div className="quotes-selection">
                <TextField
                    className="search"
                    label="Search for a quote"
                    value={this.props.ticker}
                    onChange={this.handleTextChange.bind(this)} />
            </div>
        );
    }
}
