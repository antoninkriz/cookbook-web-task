import {CREATE_CLEAR, CREATE_ERROR, CREATE_OK, LOADING_END, LOADING_START} from '../types';

const initialState = {
  loading: false,
  createError: ''
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_END:
      return {
        ...state,
        loading: false
      };
    case CREATE_ERROR:
      return {
        ...state,
        createError: action.payload
      };
    case CREATE_OK:
      return {
        ...state,
        createError: false
      };
    case CREATE_CLEAR:
      return {
        ...state,
        createError: ''
      };
    default:
      return state;
  }
}

export default uiReducer;
