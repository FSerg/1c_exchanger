import axios from 'axios';
import { GET_DRUGSTORES_INVOISES } from './drugstoresTypes';

export const getInvoises = () => dispatch => {
  axios
    .get('/api/drugstores/allinvoices', {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: GET_DRUGSTORES_INVOISES,
        payload: response.data.result
      });
    });
};
