import {LOADING_END, LOADING_START} from '../types';

const initialState = {
  loading: false
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
    default:
      return state;
  }
}

export default uiReducer;
