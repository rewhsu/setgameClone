import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import setApp from './reducers/index';

import App from './components/App';

var store = createStore(
  setApp, 
  {
    stage: [false, false, false, false, false, false, false, false, false]
  }
);
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('app')
);