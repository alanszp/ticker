import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './Header.scss';

export default class Header extends Component {
    static propTypes = {};

    render () {
        return (
            <div className="header">
                <Link className="logo" to="/">
                    Ticker
                </Link>
            </div>
        )
    }

}
