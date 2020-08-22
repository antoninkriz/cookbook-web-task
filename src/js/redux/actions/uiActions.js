import {CREATE_CLEAR, CREATE_ERROR, CREATE_OK, LOADING_END, LOADING_START} from '../types';

/**
 * Loading starts
 */
export const loadingStart = () => (dispatch) => dispatch({type: LOADING_START});

/**
 * Loading ends
 */
export const loadingEnd = () => (dispatch) => dispatch({type: LOADING_END});

/**
 * Create Recipe was successful
 */
export const createRecipeOk = () => (dispatch) => dispatch({type: CREATE_OK});

/**
 * Set Create Recipe error state to default
 */
export const createRecipeClear = () => (dispatch) => dispatch({type: CREATE_CLEAR});

/**
 * Set Create Recipe Error message
 * @param {string} error Error text
 */
export const createRecipeError = (error) => (dispatch) => dispatch({
  type: CREATE_ERROR,
  payload: error
});
