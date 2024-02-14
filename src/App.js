import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UploadFirebase from './pages/UploadFirebase';
import Form from './pages/Form';
import MapNew from './pages/MapNew';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Pie from './pages/statistic/Pie';

//import './App.css';

function App() {
  return ( 
    <div className="App">

      <div className="App-header">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="uploadFirebase" element={<UploadFirebase />} />
          <Route path="form" element={<Form />} />
          <Route path="mapNew" element={<MapNew />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />  
          <Route path="statistic/pie" element={<Pie />} /> 
        </Routes>     
       </div>

    </div>
  );
}

export default App;
