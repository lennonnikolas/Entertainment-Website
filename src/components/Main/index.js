import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Series from '../../containers/Series'
import SingleSeries from '../../containers/SingleSeries';
import SingleSeriesSeason from '../../containers/SingleSeriesSeason';
import Games from '../../containers/Games';
import Movies from '../../containers/Movies';
import SingleMovie from '../../containers/SingleMovie';
import Home from '../Home'

const Main = (props) => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tvseries' component={Series} />
        <Route path="/series/:id" component={SingleSeries} />
        <Route path="/episodes/:id/:seasonNumber" component={SingleSeriesSeason} />
        <Route path="/games" component={Games} />
        <Route path="/movies" component={Movies} />
        <Route path="/movie/:id" component={SingleMovie} />
    </Switch>
);

export default Main;