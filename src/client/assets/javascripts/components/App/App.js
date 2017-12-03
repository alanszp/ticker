import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();


const App = (props) => {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div className="app">
                <Header />
                <div className="content container">
                    {React.cloneElement({...props}.children, {...props})}
                </div>
            </div>
        </MuiThemeProvider>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
