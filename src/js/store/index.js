import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import reducers from '../reducers';

const configureStore = () => {
    const middlewares = [/* if you need some middlewares */];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;