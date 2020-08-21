import {LOADING_END, LOADING_START, CREATE_CLEAR} from '../types';

export const loadingEnd = () => (dispatch) => dispatch({type: LOADING_END});

export const loadingStart = () => (dispatch) => dispatch({type: LOADING_START});

export const clearRecipeError = () => (dispatch) => dispatch({type: CREATE_CLEAR});