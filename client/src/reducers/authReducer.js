import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_STARTED
} from '../actions/authTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_STARTED:
      return { ...state, error: '', authLoading: true };
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        authLoading: false
      };
    case UNAUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        authenticated: false,
        authLoading: false
      };
    default:
      return state;
  }
};
