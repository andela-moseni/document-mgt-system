import { combineReducers } from 'redux';
import auth from './reducers/auth';
import document from './reducers/documentsReducer';

export default combineReducers ({
  auth,
  document
});