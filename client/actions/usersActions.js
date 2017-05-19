import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import omit from 'lodash/omit';
import { DISPLAY_ALL_USERS, DISPLAY_USER_DOCUMENTS,
  DISPLAY_USER_PROFILE, DISPLAY_UPDATED_USER,
  DELETE_USER } from '../actions/types';
import { logout } from './loginActions';

const myColor = { background: '#ff0000', text: '#FFFFFF' };

/**
 *
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object} allUsers
 */
export function fetchUsers(offset = 0, limit = 10) {
  return dispatch => axios.get(`api/users?offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allUsers = res.data.users;
    dispatch({
      type: DISPLAY_ALL_USERS,
      allUsers,
      pagination: res.data.pagination,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {Object} userDocs
 */
export function fetchUserDocuments(id) {
  return dispatch => axios.get(`api/users/${id}/documents`).then((res) => {
    const userDocs = res.data.documents;
    dispatch({
      type: DISPLAY_USER_DOCUMENTS,
      userDocs,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {Object} userData
 */
export function fetchUserProfile(id) {
  return dispatch => axios.get(`api/users/${id}`).then((res) => {
    const userData = res.data;
    dispatch({
      type: DISPLAY_USER_PROFILE,
      userData,
    });
  });
}

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {Object} updatedUser
 */
export function updateUser(user) {
  const newUser = omit(user, ['id']);
  return dispatch => axios.put(`/api/users/${user.id}`, newUser).then((res) => {
    const updatedUser = res.data.user;
    dispatch({
      type: DISPLAY_UPDATED_USER,
      updatedUser,
    });
    notify.show('Update successful',
      'success', 3000);
    browserHistory.push('/my-documents');
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}

/**
 *
 *
 * @export
 * @param {any} search
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object} allUsers
 */
export function searchUsers(search, offset = 0, limit = 10) {
  return dispatch => axios
  .get(`api/search/users?search=${search}&offset=${offset}&limit=${limit}`)
  .then((res) => {
    const allUsers = res.data.users;
    dispatch({
      type: DISPLAY_ALL_USERS,
      allUsers,
      pagination: res.data.pagination,
    });
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}

/**
 *
 *
 * @export
 * @param {any} userId
 * @returns {Object}
 */
export function deleteUser(userId) {
  return dispatch => axios.delete(`/api/users/${userId}`).then(() => {
    dispatch({
      type: DELETE_USER,
      userId,
    });
    notify.show('User deleted successfully',
      'success', 3000);
    dispatch(logout());
    browserHistory.push('/signup');
  }).catch((error) => {
    notify.show(error.response.data.message, 'custom', 3000, myColor);
  });
}
