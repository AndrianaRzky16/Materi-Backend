import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
      <Provider store={store}>
      <ToastContainer />
        <App />
      </Provider>
    </Router>  
  </React.StrictMode>,
)
