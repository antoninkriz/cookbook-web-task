import {default as axios} from 'axios';
import {loadingEnd, loadingStart} from './uiActions';
import {RECIPE_LIST, RECIPE_EMPTY} from '../types';
import {API_URL, ITEMS_PER_PAGE} from '../../consts';

export const getRecipesList = (page, purge = false) => (dispatch) => {
  dispatch(loadingStart());
  axios.get(`${API_URL}/?limit=${ITEMS_PER_PAGE}&offset=${ITEMS_PER_PAGE * page}`).then(r => {
    if (purge) {
      dispatch({
        type: RECIPE_EMPTY,
      });
    }

    dispatch({
      type: RECIPE_LIST,
      payload: r.data
    });
  }).finally(() => dispatch(loadingEnd()));
};
