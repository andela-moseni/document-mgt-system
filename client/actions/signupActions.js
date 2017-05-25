import axios from 'axios';
import { browserHistory } from 'react-router';
import { notify } from 'react-notify-toast';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from './loginActions';

/**
 *
 * @export
 * @param {any} userData
 * @returns {Object} user
 */
export default function userSignupRequest(userData) {
  const myColor = { background: '#ff0000', text: '#FFFFFF' };
  return dispatch => axios.post('/api/users', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    browserHistory.push('/');
    notify.show('Signup successful', 'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}
