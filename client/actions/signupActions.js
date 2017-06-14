import axios from 'axios';
import { browserHistory } from 'react-router';
import { notify } from 'react-notify-toast';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './loginActions';

/**
 * Signup a user
 * @export
 * @param {Object} userData - object
 * @returns {Object} user - object
 */
export default function userSignupRequest(userData) {
  const custom = { background: '#ff0000', text: '#FFFFFF' };
  return dispatch => axios.post('/api/users', userData).then((res) => {
    if (res.data.message === 'User already exist!') {
      return notify.show('User already exist!', 'custom', 3000, custom);
    }
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    browserHistory.push('/');
    notify.show('Signup successful', 'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
