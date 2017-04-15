import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import setApp from './reducers/index';

import App from './components/App';
import { initializeStage } from '../utils/utils';

var store = createStore(
  setApp,
  { stage: initializeStage() },
);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('app')
);