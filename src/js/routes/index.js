import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, useLocation} from 'react-router-dom';

// Routes
import RecipesList from './RecipesList/RecipesList';
import RecipeDetail from "./RecipeDetail/RecipeDetail";

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Routing = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <Route path='/' exact={true} component={RecipesList} />
      <Route path='/recipe/:id' component={RecipeDetail} />
    </Switch>
  </BrowserRouter>
);

export default Routing;
