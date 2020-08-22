import {default as axios} from 'axios';
import {createRecipeError, createRecipeOk, loadingEnd, loadingStart} from './uiActions';
import {RECIPE_CREATE, RECIPE_DETAIL, RECIPE_LIST, RECIPE_RATE} from '../types';
import {API_URL, ITEMS_PER_PAGE} from '../../consts';

export const getRecipesList = (page) => (dispatch) => {
  dispatch(loadingStart());
  axios.get(`${API_URL}/?limit=${ITEMS_PER_PAGE}&offset=${ITEMS_PER_PAGE * page}`).then(r => {
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

  axios.post(`${API_URL}/${id}/rating`, {score: score}).then();
};

export const postRecipeNew = (name, description, ingredients, duration, info) => (dispatch) => {
  dispatch(loadingStart());
  axios.post(`${API_URL}`, {
    name,
    description,
    ingredients,
    duration,
    info
  }).then(r => {
    dispatch({
      type: RECIPE_CREATE,
      payload: r.data
    });
    dispatch(createRecipeOk());
  }).catch(e => {
    dispatch(createRecipeError(e.response?.status === 422
      ? 'Recept s tímto názvem již existuje'
      : e.response.data.message.startsWith('Name must obtain Ackee at least once! This is Ackee cookbook GOD DAMN IT.')
        ? 'Název receptu musí obsahovat "Ackee"'
        : 'Nastala chyba při přidávání receptu'));
  }).finally(() => dispatch(loadingEnd()));
}
