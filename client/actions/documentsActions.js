import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import * as types from '../actions/types';

const custom = { background: '#ff0000', text: '#FFFFFF' };

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {Object}
 */
export function createDocument(document) {
  return dispatch => axios.post('/api/documents', document).then((res) => {
    const newDoc = res.data.document;
    dispatch({
      type: types.CREATE_DOCUMENT_SUCCESS,
      newDoc,
    });
  })
  .catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 *
 * @export
 * @param {any} doc
 * @returns {Object}
 */
export function docFetched(doc) {
  return {
    type: types.DOC_FETCHED,
    doc,
  };
}

/**
 *
 *
 * @export
 * @param {any} offset
 * @param {any} limit
 * @returns {Object}
 */
export function fetchDocuments(offset, limit) {
  return dispatch => axios
  .get(`/api/documents?offset=${offset}&limit=${limit}`).then((res) => {
    const allDocs = res.data.documents;
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs,
      pagination: res.data.pagination,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {Object}
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
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}
 */
export function fetchMyDocuments(id, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/users/${id}/documents?offset=${offset}&limit=${limit}`)
  .then((res) => {
    const myDocs = res.data.documents;
    dispatch({
      type: types.DISPLAY_MY_DOCUMENTS,
      myDocs,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
    dispatch({
      type: types.NO_DOCUMENTS_FOUND,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} search
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}
 */
export function searchDocuments(search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/documents?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allDocs = res.data.documents;
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 * @export
 * @param {number} id
 * @param {string} search
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object} user documents
 */
export function searchUserDocuments(id, search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/documents?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allDocs = res.data.documents
      .filter(doc => doc.OwnerId === Number(id));
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
/**
 *
 *
 * @export
 * @param {any} document
 * @returns {Object}
 */
export function updateDocument(document) {
  return dispatch => axios
  .put(`/api/documents/${document.id}`, document).then((res) => {
    const updatedDocument = res.data.updatedDocument;
    dispatch({
      type: types.UPDATE_DOCUMENT_SUCCESS,
      updatedDocument,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 *
 * @export
 * @param {any} documentId
 * @returns {Object}
 */
export const deleteDocument = documentId => dispatch => axios
.delete(`/api/documents/${documentId}`).then(() => {
  dispatch({
    type: types.DELETE_DOCUMENT_SUCCESS,
    documentId,
  });
}).catch((error) => {
  notify.show(error.response.data.message, 'custom', 3000, custom);
  browserHistory.push('/documents');
});
