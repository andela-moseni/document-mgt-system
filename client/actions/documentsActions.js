import axios from 'axios';

export function createDocument (document) {
  return dispatch => {
    return axios.post('api/documents', document);
  };
}