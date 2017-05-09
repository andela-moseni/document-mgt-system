import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

export function loginActions (userData) {
  return dispatch => {
    return axios.post('api/users/login', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      console.log(jwt.decode(token));
    })
  }
}