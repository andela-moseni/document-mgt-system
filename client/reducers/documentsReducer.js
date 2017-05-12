import { DISPLAY_ALL_DOCUMENTS }from '../actions/types';
import { DISPLAY_MY_DOCUMENTS }from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {documents: [], isLoading: false};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case DISPLAY_ALL_DOCUMENTS:
      return Object.assign({}, state, { documents: action.allDocs });
      
    case DISPLAY_MY_DOCUMENTS:
      return Object.assign({}, state, { documents: action.myDocs });

    default: return state;
  }
};
