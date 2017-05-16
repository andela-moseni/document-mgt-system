import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import { DISPLAY_ALL_DOCUMENTS, DISPLAY_MY_DOCUMENTS,
  UPDATE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT, DOC_FETCHED } from '../actions/types';

/**
 *
 *
 * @export
 * @param {any} document
 * @returns
 */
export function createDocument(document) {
  return dispatch =>
    axios.post('api/documents', document);
}


/**
 *
 *
 * @export
 * @param {any} doc
 * @returns
 */
export function docFetched(doc) {
  return {
    type: DOC_FETCHED,
    doc,
  };
}
/**
 *
 *
 * @export
 * @returns
 */
export function fetchDocuments() {
  return dispatch => axios.get('api/documents').then((res) => {
    const allDocs = res.data.documents;
    dispatch({
      type: DISPLAY_ALL_DOCUMENTS,
      allDocs,
    });
  });
}


/**
 *
 *
 * @export
 * @param {any} id
 * @returns
 */

export function fetchDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
      .then((res) => {
        dispatch(docFetched(res.data.document));
      });
  };
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns
 */
export function fetchMyDocuments(id) {
  return dispatch => axios.get(`api/users/${id}/documents`).then((res) => {
    const myDocs = res.data.documents;
    dispatch({
      type: DISPLAY_MY_DOCUMENTS,
      myDocs,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns
 */
export function updateDocument(document) {
  return dispatch => axios
  .put(`/api/documents/${document.id}`, document).then(((res) => {
    const updatedDocument = res.data.updatedDocument;
    dispatch({
      type: UPDATE_DOCUMENT_SUCCESS,
      updatedDocument,
    });
  }));
}

/**
 *
 *
 * @export
 * @param {any} documentId
 * @returns
 */
export const deleteDocument = (documentId) => {
  const myColor = { background: '#ff0000', text: '#FFFFFF' };
  return dispatch => axios.delete(`/api/documents/${documentId}`).then(() => {
    dispatch({
      type: DELETE_DOCUMENT,
      documentId,
    });
    notify.show('Document deleted successfully',
      'success', 3000);
    browserHistory.push('/my-documents');
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
    browserHistory.push('/documents');
  });
};
