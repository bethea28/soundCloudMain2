
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import AppContainer from './app';
import {render} from 'react-dom';
import ShowUserTracks from './showUserTracks';
import ShowTracksByGenre from './showTracksByGenre';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';



const routes = (
  <div>

    <Route path = '/'  component={AppContainer} >
      <IndexRoute component={ShowTracksByGenre} />
      <Route path = '/:id'  component={ShowUserTracks} />
    </Route>

  </div>


)

render(
  <Provider store={store}>
    <Router history={hashHistory} routes= {routes} />
  </Provider>,
  document.getElementById('root')
);
