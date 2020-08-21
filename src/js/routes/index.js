import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// Routes
import RecipesList from './RecipesList/RecipesList';

const Routing = () => (
  <BrowserRouter>
    <Route path='/' exact={true}>
      <RecipesList />
    </Route>
    <Route path='/recipe/:id'>
      <h1>Recipe Detail</h1>
    </Route>
  </BrowserRouter>
);

export default Routing;
