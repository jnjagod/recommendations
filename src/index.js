import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './ducks/store'
import Scroll from './components/Scroll'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Scroll />
      <App />
    </HashRouter>
  </Provider>
  , document.getElementById('root'));