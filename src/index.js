import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem('token')
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post['Context-Type'] = 'application/json';
root.render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
