import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import { notify } from 'react-notify-toast';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 *
 * @export
 * @param {any} user
 * @returns {Object} user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/**
 *
 * @export
 * @returns {Object}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 *
 * @export
 * @param {any} userData
 * @returns {Object} user
 */
export function login(userData) {
  const custom = { background: '#ff0000', text: '#FFFFFF' };
  return dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    browserHistory.push('/');
    notify.show('Login successful', 'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
