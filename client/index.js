import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import scss from './App.scss';
import routes from './routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

setAuthorizationToken(localStorage.jwtToken);

render(
  <Provider store={store}> 
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
