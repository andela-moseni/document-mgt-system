import axios from 'axios';
import { notify } from 'react-notify-toast';
import * as types from '../actions/types';

const custom = { background: '#ff0000', text: '#FFFFFF' };

/**
 * Create new role
 * @export
 * @param {Object} role - object
 * @returns {Object} newRole - object
 */
export function createRole(role) {
  return dispatch => axios.post('/api/roles', role).then((res) => {
    const newRole = res.data;
    dispatch({
      type: types.CREATE_ROLE_SUCCESS,
      newRole,
    });
  });
}

/**
 * Fetch all roles
 * @export
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} allRoles - object
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
 * Update a role based on the id
 * @export
 * @param {Object} role - object
 * @returns {Object} updatedRole - object
 */
export function updateRole(role) {
  return dispatch => axios.put(`/api/roles/${role.id}`, role).then((res) => {
    const updatedRole = res.data.updatedRole;
    dispatch({
      type: types.DISPLAY_UPDATED_ROLE,
      updatedRole,
    });
  });
}

/**
 * Get all roles relevant to search term
 * @export
 * @param {String} search - search term
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} allRoles - object
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
    dispatch({
      type: types.DISPLAY_ALL_ROLES_FAILED,
      allRoles: {},
      pagination: {},
    });
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 * Delete a role based on the id
 * @export
 * @param {Number} roleId
 * @returns {Object} object
 */
export function deleteRole(roleId) {
  return dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatch({
      type: types.DELETE_ROLE_SUCCESS,
      roleId,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
