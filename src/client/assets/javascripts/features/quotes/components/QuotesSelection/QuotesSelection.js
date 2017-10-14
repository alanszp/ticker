import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { actionCreators, selector } from '../../quotes';
import { bindActionCreators } from 'redux';
import { TextField, Menu, MenuItem } from 'material-ui';
import { Link } from 'react-router';

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
        search: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    state = {
      open: false,
    };

    handleTextChange(e) {
        this.props.actions.quoteSearch(e.target.value);
        this.setState({open: true});
    }

    handleRequestClose() {
        this.setState({open:false});
    }

    handleSelectQuote(ticker) {
        console.log(ticker);
        this.setState({open:false});
    }

    menuContent() {
        if (this.props.search.loading) {
            return (
                <MenuItem key="0">Loading...</MenuItem>
            );
        }
        if (this.props.search.loaded && this.props.search.items.length == 0) {
            return (
                <MenuItem key="0">No matching stocks. Please search again</MenuItem>
            );
        }
        if (this.props.search.loaded && this.props.search.items.length != 0) {
            return this.props.search.items.map((stock, index) => {
                return (
                    <Link
                        key={index}
                        className="logo" to={'/quotes/'+stock.symbol.toLowerCase()}>
                        <MenuItem
                            onClick={this.handleSelectQuote.bind(this, stock.symbol)}
                        >{stock.symbol}</MenuItem>
                    </Link>
                );
            })
        }
        return null
    }

    render() {
        return (
            <div className="quotes-selection">
                <TextField
                    className="search"
                    label="Search for a quote"
                    value={ this.props.search.term }
                    ref={(input) => { this.textInput = input }}
                    onChange={this.handleTextChange.bind(this)} />

                <Menu
                    id="simple-menu"
                    anchorEl={this.textInput}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    {this.menuContent()}
                </Menu>
            </div>

        );
    }
}
