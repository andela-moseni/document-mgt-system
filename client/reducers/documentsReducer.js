import { DISPLAY_ALL_DOCUMENTS, DISPLAY_MY_DOCUMENTS,
  UPDATE_DOCUMENT_SUCCESS, DOC_FETCHED, DELETE_DOCUMENT } from '../actions/types';

const initialState = { documents: [], isLoading: false };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_ALL_DOCUMENTS:
      return Object.assign({}, state, { documents: action.allDocs });

    case DISPLAY_MY_DOCUMENTS:
      return Object.assign({}, state, { documents: action.myDocs });

    // case DISPLAY_UPDATED_DOCUMENT:
    //   return Object.assign({}, state, { documents: action.updatedDocument });

    case UPDATE_DOCUMENT_SUCCESS:
      return [...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document),
      ];

    case DOC_FETCHED:
      const index = state.findIndex(doc => doc.id === action.document.id);
      if (index > -1) {
        return state.map((doc) => {
          if (doc.id === action.document.id) return action.document;
          return doc;
        });
      }
      return [
        ...state,
        action.document,
      ];


    case DELETE_DOCUMENT: {
      return Object.assign({}, state);
    }

    default: return state;
  }
};
