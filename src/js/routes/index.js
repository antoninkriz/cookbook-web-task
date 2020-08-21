import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// Routes
import RecipesList from './RecipesList/RecipesList';
import RecipeDetail from "./RecipeDetail/RecipeDetail";

const Routing = () => (
  <BrowserRouter>
    <Route path='/' exact={true} component={RecipesList} />
    <Route path='/recipe/:id' component={RecipeDetail} />
  </BrowserRouter>
);

export default Routing;
