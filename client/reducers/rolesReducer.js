import findIndex from 'lodash/findIndex';
import { DISPLAY_ALL_ROLES, DISPLAY_UPDATED_ROLE,
  DELETE_ROLE } from '../actions/types';

const initialState = { roles: [], role: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DISPLAY_ALL_ROLES:
      return Object.assign({}, state,
      { roles: action.allRoles, pagination: action.pagination });

    case DISPLAY_UPDATED_ROLE: {
      const roleIndex = findIndex(state.roles, { id: action.updatedRole.id });
      const stateCopy = Object.assign({}, state);
      stateCopy.roles[roleIndex] = action.updatedRole;
      return stateCopy;
    }

      // return Object.assign({}, state, { role: action.updatedRole });
      // return Object.assign({}, state, { roles:
      // [...state.roles.filter(role => role.id !== action.updatedRole.id),
      //   Object.assign({}, action.updatedRole)],
      // });

    case DELETE_ROLE:
      // return Object.assign({}, state);
      return Object.assign({}, state, { roles: state.roles.filter(role => role.id !== action.roleId) });

    default: return state;
  }
};
