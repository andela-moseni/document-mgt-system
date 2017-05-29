import { combineReducers } from 'redux';
import auth from './reducers/auth';
import document from './reducers/documentsReducer';
import users from './reducers/usersReducer';
import roles from './reducers/rolesReducer';

export default combineReducers({
  auth,
  document,
  users,
  roles,
});
