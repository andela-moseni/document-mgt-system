import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import scss from './App.scss';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import rootReducer from './rootReducer';
import { setCurrentUser } from './actions/loginActions';

const store = createStore(
  rootReducer,
  compose(
    (state = {}) => state,
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));

export default store;
