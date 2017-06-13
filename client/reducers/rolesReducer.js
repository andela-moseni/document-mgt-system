import findIndex from 'lodash/findIndex';
import { DISPLAY_ALL_ROLES, DISPLAY_ALL_ROLES_FAILED, DISPLAY_UPDATED_ROLE,
  DELETE_ROLE_SUCCESS, CREATE_ROLE_SUCCESS } from '../actions/types';

const initialState = { roles: [], role: {}, pagination: {} };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_ROLE_SUCCESS: {
      const stateCopy = { ...state };
      stateCopy.roles.push(action.newRole);
      return stateCopy;
    }

    case DISPLAY_ALL_ROLES:
      return { ...state,
        roles: action.allRoles,
        pagination: action.pagination };

    case DISPLAY_ALL_ROLES_FAILED:
      return { ...state, roles: {}, pagination: {} };

    case DISPLAY_UPDATED_ROLE: {
      const roleIndex = findIndex(state.roles, { id: action.updatedRole.id });
      const stateCopy = { ...state };
      stateCopy.roles[roleIndex] = action.updatedRole;
      return stateCopy;
    }

    case DELETE_ROLE_SUCCESS:
      return { ...state,
        roles: state.roles.filter(role => role.id !== action.roleId) };

    default: return state;
  }
};
