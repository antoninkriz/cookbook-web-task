import {RECIPE_DETAIL, RECIPE_EMPTY, RECIPE_LIST, RECIPE_RATE} from '../types';
import {ITEMS_PER_PAGE} from '../../consts';

const initialState = {
  endOfList: false,
  list: [],
  details: {},
  rated: JSON.parse(localStorage.getItem(RECIPE_RATE) ?? '{}')
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_LIST:
      // Remove possible duplicates
      const lookup = {};
      const list = state.list.concat(action.payload).filter(obj => !lookup[obj['id']] && (lookup[obj['id']] = true));

      return {
        ...state,
        endOfList: action.payload.length !== ITEMS_PER_PAGE,
        list: list
      };
    case RECIPE_EMPTY:
      return {
        ...state,
        endOfList: false,
        list: []
      };
    case RECIPE_DETAIL:
      return {
        ...state,
        details: {
          ...state.details,
          [action.payload.id]: {...action.payload}
        }
      }
    case RECIPE_RATE:
      const newState = {
        ...state,
        rated: {
          ...state.rated,
          [action.payload.id]: action.payload.score
        }
      };

      localStorage.setItem(RECIPE_RATE, JSON.stringify(newState.rated));
      return newState;
    default:
      return state;
  }
}

export default recipesReducer;
