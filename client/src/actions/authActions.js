import axios from 'axios';
import { addNotification as notify } from 'reapop';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_STARTED } from './authTypes';
import history from '../history';

export const signoutUser = () => {
  localStorage.removeItem('token');
  history.push('/');
  return { type: UNAUTH_USER };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const notifySuccessAuth = () => {
  return notify({
    message: 'Вы успешно авторизовались',
    status: 'success'
  });
};

export const signupSubmit = userData => dispatch => {
  dispatch({ type: AUTH_STARTED });
  axios
    .post('/api/users/signup', userData)
    .then(response => {
      dispatch({ type: AUTH_USER });
      // - Save the JWT token
      localStorage.setItem('token', response.data.result.token);
      dispatch(notifySuccessAuth());
      history.push('/drugstores');
    })
    .catch(error => {
      // console.log(error.response);
      dispatch(authError(error.response.data.result));
    });
};

export const loginSubmit = userData => dispatch => {
  dispatch({ type: AUTH_STARTED });
  axios
    .post('/api/users/login', userData)
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.result.token);
      dispatch(notifySuccessAuth());
      history.push('/drugstores');
    })
    .catch(error => {
      // console.log(error.response);
      if (error.response.status === 500) {
        dispatch(authError('Внутренняя ошибка сервера!'));
      } else {
        dispatch(authError('Неверный адрес эл.почты или пароль!'));
      }
    });
};
