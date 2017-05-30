import axios from 'axios';
import { notify } from 'react-notify-toast';
import * as types from '../actions/types';

const custom = { background: '#ff0000', text: '#FFFFFF' };

/**
 *
 *
 * @export
 * @param {any} role
 * @returns {Object}
 */
export function createRole(role) {
  return dispatch => axios.post('/api/roles', role).then((res) => {
    const newRole = res.data;
    dispatch({
      type: types.CREATE_ROLE,
      newRole,
    });
    notify.show('Role created successfully', 'success', 3000);
  })
  .catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}
 */
export function fetchRoles(offset = 0, limit = 10) {
  return dispatch => axios.get(`/api/roles?offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allRoles = res.data.roles;
    dispatch({
      type: types.DISPLAY_ALL_ROLES,
      allRoles,
      pagination: res.data.pagination,
    });
  })
  .catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 * @export
 * @param {any} role
 * @returns {Object}
 */
export function updateRole(role) {
  return dispatch => axios.put(`/api/roles/${role.id}`, role).then((res) => {
    const updatedRole = res.data.updatedRole;
    dispatch({
      type: types.DISPLAY_UPDATED_ROLE,
      updatedRole,
    });
    notify.show('Update successful',
      'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 * @export
 * @param {any} search
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}
 */
export function searchRoles(search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/roles?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allRoles = res.data.roles;
    dispatch({
      type: types.DISPLAY_ALL_ROLES,
      allRoles,
      pagination: res.data.pagination,
    });
  })
  .catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 * @export
 * @param {number} roleId
 * @returns {Object}
 */
export function deleteRole(roleId) {
  return dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatch({
      type: types.DELETE_ROLE,
      roleId,
    });
    notify.show('Role deleted successfully',
      'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
