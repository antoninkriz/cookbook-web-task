import {LOADING_END, LOADING_START} from '../types';

export const loadingEnd = () => (dispatch) => dispatch({type: LOADING_END});

export const loadingStart = () => (dispatch) => dispatch({type: LOADING_START});
