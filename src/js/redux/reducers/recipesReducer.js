import {RECIPE_LIST} from '../types';
import {ITEMS_PER_PAGE} from "../../consts";

const initialState = {
  endOfList: false,
  list: [],
  details: {}
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIPE_LIST:
      return {
        ...state,
        endOfList: action.payload.length !== ITEMS_PER_PAGE,
        list: state.list.slice().concat(action.payload)
      };
    default:
      return state;
  }
}

export default recipesReducer;
