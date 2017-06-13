import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import omit from 'lodash/omit';
import * as types from '../actions/types';
import { logout } from './loginActions';

const custom = { background: '#ff0000', text: '#FFFFFF' };

/**
 *
 * @export
 * @param {Object} user
 * @returns {Object} user
 */
export function createUser(user) {
  return dispatch => axios.post('/api/users', user).then((res) => {
    const newUser = res.data.user;
    dispatch({
      type: types.CREATE_USER_SUCCESS,
      newUser,
    });
  });
}

/**
 *
 *
 * @export
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} users
 */
export function fetchUsers(offset = 0, limit = 10) {
  return dispatch => axios.get(`/api/users?offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allUsers = res.data.users;
    dispatch({
      type: types.DISPLAY_ALL_USERS,
      allUsers,
      pagination: res.data.pagination,
    });
  });
}

/**
 *
 *
 * @export
 * @param {Number} id
 * @returns {Object} user
 */
export function fetchUserProfile(id) {
  return dispatch => axios.get(`/api/users/${id}`).then((res) => {
    const userData = res.data;
    dispatch({
      type: types.DISPLAY_USER_PROFILE,
      userData,
    });
  });
}

/**
 *
 *
 * @export
 * @param {Object} user
 * @returns {Object} user
 */
export function updateUser(user) {
  const newUser = omit(user, ['id']);
  return dispatch => axios.put(`/api/users/${user.id}`, newUser).then((res) => {
    const updatedUser = res.data.user;
    dispatch({
      type: types.DISPLAY_UPDATED_USER,
      updatedUser,
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
 * @param {Object} user
 * @returns {Object} user
 */
export function updateUsers(user) {
  const newUser = omit(user, ['id']);
  return dispatch => axios.put(`/api/users/${user.id}`, newUser).then((res) => {
    const updatedUser = res.data.user;
    dispatch({
      type: types.DISPLAY_UPDATED_USERS,
      updatedUser,
    });
    notify.show('Update successful',
      'success', 3000);
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 *
 * @export
 * @param {String} search
 * @param {Number} [offset=0]
 * @param {Number} [limit=10]
 * @returns {Object} users
 */
export function searchUsers(search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`/api/search/users?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allUsers = res.data.users;
    dispatch({
      type: types.DISPLAY_ALL_USERS,
      allUsers,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    dispatch({
      type: types.DISPLAY_ALL_USERS_FAILED,
      allUsers: {},
      pagination: {},
    });
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}

/**
 *
 * @export
 * @param {Number} userId
 * @param {Boolean} isAdmin
 * @returns {Object}
 */
export function deleteUser(userId, isAdmin) {
  return dispatch => axios.delete(`/api/users/${userId}`).then(() => {
    dispatch({
      type: types.DELETE_USER_SUCCESS,
      userId,
    });
    if (!isAdmin) {
      dispatch(logout());
      browserHistory.push('/signup');
    }
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, custom);
  });
}
