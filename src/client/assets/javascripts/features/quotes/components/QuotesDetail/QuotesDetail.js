import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {actionCreators, selector} from '../../quotes';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import './QuotesDetail.scss'

@withRouter
@connect(
    (state, ownProps) => {
        return {
            quote: selector(state).quotes.quote,
            routeParams: ownProps.params
        }
    },
    (dispatch) => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)
export default class QuotesDetail extends Component {
    static propTypes = {
        quote: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    init(quote) {
        this.props.actions.getQuote(quote);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeParams.quote !== nextProps.routeParams.quote) {
            this.init(nextProps.routeParams.quote);
        }
    }

    componentDidMount(){
        this.init(this.props.routeParams.quote);
    }

    render() {
        return (
            <div className="quotes-detail">
                { this.props.quote.ticker }
            </div>
        );
    }
}
