import axios from 'axios';
import { DISPLAY_ALL_DOCUMENTS } from '../actions/types';
import { DISPLAY_MY_DOCUMENTS } from '../actions/types';

export function createDocument (document) {
  return dispatch => {
    return axios.post('api/documents', document);
  };
}

export function fetchDocuments () {
  return dispatch => {
    return axios.get('api/documents').then((res) => {
      const allDocs = res.data.documents;
      dispatch({
        type: DISPLAY_ALL_DOCUMENTS,
        allDocs
      });
    })
  };
}

export function fetchMyDocuments (id) {
  return dispatch => {
    return axios.get(`api/users/${id}/documents`).then((res) => {
      const myDocs = res.data.documents;
      dispatch({
        type: DISPLAY_MY_DOCUMENTS,
        myDocs
      });
    })
  };
}