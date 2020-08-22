import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, useLocation} from 'react-router-dom';

// Routes
import RecipesList from './RecipesList/RecipesList';
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import RecipeCreate from "./RecipeCreate/RecipeCreate";

/**
 * Helper components that forces browser to scroll to top when changing a route
 */
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
      <Route path='/create' exact={true} component={RecipeCreate} />
    </Switch>
  </BrowserRouter>
);

export default Routing;
