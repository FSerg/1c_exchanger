import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import drugstoresReducer from './drugstoresReducer';

export default combineReducers({
  notifications: notificationsReducer(),
  auth: authReducer,
  usersStore: usersReducer,
  drugstores: drugstoresReducer
});
