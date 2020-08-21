import {default as axios} from 'axios';
import {loadingEnd, loadingStart} from './uiActions';
import {RECIPE_DETAIL, RECIPE_EMPTY, RECIPE_LIST, RECIPE_RATE} from '../types';
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

export const getRecipeDetail = (id) => (dispatch) => {
  dispatch(loadingStart());
  axios.get(`${API_URL}/${id}`).then(r => {
    dispatch({
      type: RECIPE_DETAIL,
      payload: r.data
    });
  }).catch((e) => {
    dispatch({
      type: RECIPE_DETAIL,
      payload: {
        id: id,
        error: e.response?.status ?? 'unknown'
      }
    });
  }).finally(() => dispatch(loadingEnd()));
};

export const postRecipeRating = (id, score) => (dispatch) => {
  dispatch({
    type: RECIPE_RATE,
    payload: {
      id: id,
      score: score
    }
  });

  axios.post(`${API_URL}/${id}/rating`, {score: score})
    .then(() => {
    })
    .finally(() => dispatch(loadingEnd()));
};
