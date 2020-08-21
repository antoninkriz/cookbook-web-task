import {applyMiddleware, combineReducers, compose, createStore, Store} from 'redux';
import thunk from 'redux-thunk';

// Redux
import reducers from './reducers';

/**
 * Creates a new Redux store
 * @returns {Store}
 */
const configureStore = () => {
  const initialState = {};
  const middlewares = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) || compose;

  return createStore(combineReducers(reducers), initialState, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;
