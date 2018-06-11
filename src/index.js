// Logging
import * as log from 'loglevel';
import Config from './config';
log.setLevel(Config.logLevel);

// Router
import { Router } from 'react-router-dom';
import Root from './containers/Root';
import history from './lib/history';

// Firebase
import { firebaseApp } from './lib/firebase';
firebaseApp.initializeApp(Config.firebase);

// State
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import auth from './reducers/authReducer';
const rootReducer = combineReducers({auth});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk),
);

// App Shell
import React from 'react';
import { render } from 'react-dom';
render(
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
