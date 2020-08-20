import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import RecipesList from "./List/list";

const Routing = () => (
  <BrowserRouter>
    <Route path='/'>
      <RecipesList />
    </Route>
  </BrowserRouter>
);

export default Routing;
