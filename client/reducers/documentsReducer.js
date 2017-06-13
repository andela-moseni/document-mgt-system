import findIndex from 'lodash/findIndex';
import { DISPLAY_ALL_DOCUMENTS, DISPLAY_MY_DOCUMENTS,
  UPDATE_DOCUMENT_SUCCESS, DOC_FETCHED, DELETE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_SUCCESS, NO_DOCUMENTS_FOUND,
  DISPLAY_ALL_DOCUMENTS_FAILED } from '../actions/types';

const initialState = { documents: [], document: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state);

    case DISPLAY_ALL_DOCUMENTS:
      return Object.assign({}, state,
      { documents: action.allDocs, pagination: action.pagination });

    case DISPLAY_ALL_DOCUMENTS_FAILED:
      return Object.assign({}, state,
      { documents: {}, pagination: {} });

    case DISPLAY_MY_DOCUMENTS:
      return Object.assign({}, state,
      { documents: action.myDocs, pagination: action.pagination });

    case NO_DOCUMENTS_FOUND:
      return Object.assign({}, state, { documents: [] });

    case UPDATE_DOCUMENT_SUCCESS: {
      // return Object.assign({}, state, { document: action.updatedDocument });
      const docIndex = findIndex(state.documents,
      { id: action.updatedDocument.id });
      const stateCopy = Object.assign({}, state);
      stateCopy.documents[docIndex] = action.updatedDocument;
      return stateCopy;
    }

    case DOC_FETCHED:
      return Object.assign({}, state, { document: action.doc });

    case DELETE_DOCUMENT_SUCCESS: {
      // return Object.assign({}, state);
      return Object.assign({}, state,
        { documents: state.documents
        .filter(document => document.id !== action.documentId) });
    }

    default: return state;
  }
};
