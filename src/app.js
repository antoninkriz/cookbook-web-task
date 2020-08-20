import './sass/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Routing from './js/routes';
import configureStore from './js/redux/store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Routing />
  </Provider>,
  document.querySelector('body')
);
