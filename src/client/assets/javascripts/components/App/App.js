import React, {PropTypes} from 'react';

import Header from 'components/Header';

const App = (props) => {
    return (
        <div className="app">
            <Header />
            <div className="content container">
                {React.cloneElement({...props}.children, {...props})}
            </div>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;
