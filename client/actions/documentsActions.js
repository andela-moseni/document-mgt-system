import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import * as types from '../actions/types';

const custom = { background: '#ff0000', text: '#FFFFFF' };

/**
 * Create new document
 * @export
 * @param {Object} document - object
 * @returns {Object} newDoc - object
 */
export function createDocument(document) {
  return dispatch => axios.post('/api/documents', document).then((res) => {
    const newDoc = res.data.document;
    dispatch({
      type: types.CREATE_DOCUMENT_SUCCESS,
      newDoc,
    });
  });
}

/**
 * Fetch documents
 * @export
 * @param {Object} doc - object
 * @returns {Object} doc - object
 */
export function docFetched(doc) {
  return {
    type: types.DOC_FETCHED,
    doc,
  };
}

/**
 * Fetch all Documents
 * @export
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object} allDocs - object
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
 * Fetch a document based on id
 * @export
 * @param {Number} id - documentId
 * @returns {Object} document - object
 */
export function fetchDocument(id) {
  return (dispatch) => {
    axios.get(`/api/documents/${id}`)
      .then((res) => {
        dispatch(docFetched(res.data.document));
      }).catch(error => error);
  };
}

/**
 * Fetch a user's documents
 * @export
 * @param {Number} id - userId
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} myDocs - object
 */
export function fetchMyDocuments(id, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/users/${id}/documents?offset=${offset}&limit=${limit}`)
  .then((res) => {
    if (res.data.message === 'No document match the request.') {
      dispatch({
        type: types.DISPLAY_ALL_DOCUMENTS_FAILED,
        allDocs: {},
        pagination: {},
      });
      return notify
      .show('No document match the request.', 'custom', 3000, custom);
    }
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
 * Get all documents relevant to search term
 * @export
 * @param {String} search - search term
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} allDocs - object
 */
export function searchDocuments(search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/documents?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    if (res.data.message === 'Search does not match any document!') {
      dispatch({
        type: types.DISPLAY_ALL_DOCUMENTS_FAILED,
        allDocs: {},
        pagination: {},
      });
      return notify
      .show('Search does not match any document!', 'custom', 3000, custom);
    }
    const allDocs = res.data.documents;
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS_FAILED,
      allDocs: {},
      pagination: {},
    });
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 * Search through a user's documents to get-
 * all documents relevant to search term
 * @export
 * @param {Number} id - userId
 * @param {String} search - search term
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} allDocs - object
 */
export function searchUserDocuments(id, search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/documents?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    if (res.data.message === 'Search does not match any document!') {
      dispatch({
        type: types.DISPLAY_ALL_DOCUMENTS_FAILED,
        allDocs: {},
        pagination: {},
      });
      return notify
      .show('Search does not match any document!', 'custom', 3000, custom);
    }
    const allDocs = res.data.documents
      .filter(doc => doc.OwnerId === Number(id));
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS,
      allDocs,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    dispatch({
      type: types.DISPLAY_ALL_DOCUMENTS_FAILED,
      allDocs: {},
      pagination: {},
    });
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
/**
 * Update a document based on the id
 * @export
 * @param {Object} document - object
 * @returns {Object} updatedDocument - object
 */
export function updateDocument(document) {
  return dispatch => axios
  .put(`/api/documents/${document.id}`, document).then((res) => {
    const updatedDocument = res.data.updatedDocument;
    dispatch({
      type: types.UPDATE_DOCUMENT_SUCCESS,
      updatedDocument,
    });
  });
}

/**
 * Delete a document based on the id
 * @export
 * @param {Number} documentId
 * @returns {Object} object
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
