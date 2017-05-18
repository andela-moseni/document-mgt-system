import { DISPLAY_ALL_USERS, DISPLAY_USER_DOCUMENTS, DISPLAY_USER_PROFILE,
  DISPLAY_UPDATED_USER, DELETE_USER } from '../actions/types';

const initialState = { users: [], documents: [], user: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_ALL_USERS:
      return Object.assign({}, state, { users: action.allUsers, pagination: action.pagination });

    case DISPLAY_USER_DOCUMENTS:
      return Object.assign({}, state, { documents: action.userDocs });

    case DISPLAY_USER_PROFILE:
      return Object.assign({}, state, { user: action.userData });

    case DISPLAY_UPDATED_USER:
      return Object.assign({}, state, { user: action.updatedUser });

    case DELETE_USER:
      return Object.assign({}, state);

    default: return state;
  }
};
