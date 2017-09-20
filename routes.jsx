import React from 'react';
import {BrowserRouter, Route, IndexRoute} from 'react-router';

import {LandingPage} from './connectedComponents/LandingPage';
import {ViewingPage} from './connectedComponents/ViewingPage';
import {App} from './components/App';

const routes = (
  <div>
    <Route exact={true} path="/" component={LandingPage} />
    <Route path="/watch" component={ViewingPage} />
  </div>
);

export {routes};
