import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.react';

import { store } from '../redux/Store';

it('renders ok', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
});
