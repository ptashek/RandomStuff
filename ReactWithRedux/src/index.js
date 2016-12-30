// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react';

import { store } from './redux/Store';

import './css/index.css';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
