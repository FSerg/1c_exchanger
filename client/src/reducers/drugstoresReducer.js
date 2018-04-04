import { GET_DRUGSTORES_INVOISES } from '../actions/drugstoresTypes';

export default (state = { invoises: [] }, action) => {
  switch (action.type) {
    case GET_DRUGSTORES_INVOISES:
      return { ...state, invoises: action.payload };
    default:
      return state;
  }
};
