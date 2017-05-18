import axios from 'axios';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import omit from 'lodash/omit';
import { DISPLAY_ALL_USERS, DISPLAY_USER_DOCUMENTS,
  DISPLAY_USER_PROFILE, DISPLAY_UPDATED_USER,
  DELETE_USER } from '../actions/types';
import { logout } from './loginActions';

/**
 *
 *
 * @export
 * @returns {allUsers}
 */
export function fetchUsers() {
  return dispatch => axios.get('api/users').then((res) => {
    const allUsers = res.data.users;
    dispatch({
      type: DISPLAY_ALL_USERS,
      allUsers,
    });
  });
}

export function fetchUserDocuments(id) {
  return dispatch => axios.get(`api/users/${id}/documents`).then((res) => {
    const userDocs = res.data.documents;
    console.log('userdocs', userDocs);
    console.log('id', id);
    dispatch({
      type: DISPLAY_USER_DOCUMENTS,
      userDocs,
    });
  });
}

export function fetchUserProfile(id) {
  return dispatch => axios.get(`api/users/${id}`).then((res) => {
    const userData = res.data;
    console.log('my data', userData);
    dispatch({
      type: DISPLAY_USER_PROFILE,
      userData,
    });
  });
}

export function updateUser(user) {
  const newUser = omit(user, ['id']);
  const myColor = { background: '#ff0000', text: '#FFFFFF' };
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

export function deleteUser(userId) {
  const myColor = { background: '#ff0000', text: '#FFFFFF' };
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
