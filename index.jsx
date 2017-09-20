import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import {routes} from './routes';

// const reducer = combineReducers({});
const reducer = () => ({});
const initialState = {};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

const rootComponent = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(rootComponent, document.getElementById('app'));
