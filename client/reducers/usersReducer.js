import findIndex from 'lodash/findIndex';
import { DISPLAY_ALL_USERS, DISPLAY_USER_DOCUMENTS, DISPLAY_USER_PROFILE,
  DISPLAY_UPDATED_USER, DISPLAY_UPDATED_USERS,
  DELETE_USER, CREATE_USER_SUCCESS } from '../actions/types';

const initialState = { users: [], documents: [], user: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS: {
      const stateCopy = Object.assign({}, state);
      stateCopy.users.push(action.newUser);
      return stateCopy;
    }

    case DISPLAY_ALL_USERS:
      return Object.assign({}, state,
      { users: action.allUsers, pagination: action.pagination });

    case DISPLAY_USER_DOCUMENTS:
      return Object.assign({}, state, { documents: action.userDocs });

    case DISPLAY_USER_PROFILE:
      return Object.assign({}, state, { user: action.userData });

    case DISPLAY_UPDATED_USER:
      return Object.assign({}, state, { user: action.updatedUser });

    case DISPLAY_UPDATED_USERS: {
      const userIndex = findIndex(state.users, { id: action.updatedUser.id });
      const stateCopy = Object.assign({}, state);
      stateCopy.users[userIndex] = action.updatedUser;
      return stateCopy;
    }
      // return Object.assign({}, state, { users:
      // [...state.users.filter(user => user.id !== action.updatedUser.id),
      //   Object.assign({}, action.updatedUser)],
      // });

    case DELETE_USER:
      return Object.assign({}, state,
      { users: state.users.filter(user => user.id !== action.userId) });

    default: return state;
  }
};
