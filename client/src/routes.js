import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Movies from './pages/Movies';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Movies} />
        </Switch>
    );
}

export default Routes;