import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Movies from './pages/Movies';
import Search from './pages/Search';
import MovieDetail from './pages/MovieDetail';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Movies} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/search" component={Search} />
            <Route path="/movies/:movie_id" component={MovieDetail} />
        </Switch>
    );
}

export default Routes;