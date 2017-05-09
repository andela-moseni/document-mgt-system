import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function loginActions (userData) {
  return dispatch => {
    return axios.post('api/users/login', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}