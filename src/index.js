import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MapNewOld from './pages/MapNewOld';
import MapNew1 from './pages/MapNew1';
import MapNew from './pages/MapNew';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Form from './pages/Form';
import UploadFirebase from './pages/UploadFirebase';
import getCountryFromCoordinates from './pages/getCountryFromCoordinates';
import Pie from './pages/Pie';
import 'chart.js/auto';
import PieChartComponent from './pages/PieChartComponent';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
