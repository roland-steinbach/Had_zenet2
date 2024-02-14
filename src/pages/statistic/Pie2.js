

import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, LoadScript,InfoWindow, Autocomplete } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import mapStyles from '../MapStyles.json';
import '../mapNew.css';
import '../mapStyle.css';
import  {db}  from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { saveCoordinatesToFirebase} from "../Form";
import Form from "../Form";
import {useNavigate} from 'react-router-dom';
import PieChartComponent from './PieChartComponent';



function Pie2() {


return (

<div className='sideContainerStyle2'>
<div className="fly-tipping-title"
  style={{
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow to the text
   }} >
  <h1>Diagrams</h1>
  <PieChartComponent/>
</div>
</div>

)
}

export default Pie2;