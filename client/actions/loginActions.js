import axios from 'axios';

export function loginActions (userData) {
  return dispatch => {
    return axios.post('api/users/login', userData);
  }
}