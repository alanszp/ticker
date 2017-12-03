import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {actionCreators, selector} from '../../quotes';
import {bindActionCreators} from 'redux';
import {AutoComplete, MenuItem} from 'material-ui';
import {withRouter} from 'react-router';

import './QuotesSelection.scss'

@withRouter
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
        search: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    handleTextChange(value) {
        this.props.actions.quoteSearch(value);
    }

    handleSelectQuote(selected) {
        this.props.router.push('/quotes/'+selected.data.symbol.toLowerCase())
    }

    menuContent() {
        if (this.props.search.items && this.props.search.items.length != 0) {
            return this.props.search.items.map((stock, index) => {
                return {
                    text: stock.symbol,
                    value: (
                        <MenuItem
                            primaryText={stock.symbol}
                            secondaryText={stock.name}
                        />
                    ),
                    data: stock
                };
            })
        }
        if (this.props.search.loading) {
            return [{
                text: '',
                value: (
                    <MenuItem
                        primaryText="Loading..."
                        secondaryText="Keep calm"
                    />
                ),
            }];
        }
        if (this.props.search.loaded && this.props.search.items.length == 0) {
            return [{
                text: '',
                value: (
                    <MenuItem
                        primaryText="No matching stocks."
                        secondaryText="Please search again"
                    />
                ),
            }];
        }
        return []
    }

    render() {
        return (
            <div className="quotes-selection">
                <AutoComplete
                    hintText="Search for a quote"
                    className="search"
                    filter={AutoComplete.noFilter}
                    dataSource={this.menuContent()}
                    onUpdateInput={this.handleTextChange.bind(this)}
                    onNewRequest={this.handleSelectQuote.bind(this)}
                    openOnFocus={false}
                    fullWidth={true}
                />
            </div>
        );
    }
}
