import axios from 'axios';
/**
 * sets authorization token
 *
 * @export
 * @param {String} token - string
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
