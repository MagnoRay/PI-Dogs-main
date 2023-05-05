import React from 'react';
import { createRoot } from "react-dom/client"

import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from "react-router-dom";

const divRoot = document.getElementById('root');
const root = createRoot(divRoot);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);*/


