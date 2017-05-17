import { combineReducers } from 'redux';
import auth from './reducers/auth';
import document from './reducers/documentsReducer';
import users from './reducers/usersReducer';

export default combineReducers({
  auth,
  document,
  users,
});
