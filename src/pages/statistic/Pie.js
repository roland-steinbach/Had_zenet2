
import React from 'react';
import {useNavigate} from 'react-router-dom';
import PieChartComponent from './PieChartComponent';
import './pie.css';

const Pie = () => {

  const navigate = useNavigate();
  const goBack = () => {       
    navigate(-1);     
     }  

  return (
    <div>
      <h1>Simple Pie Chart</h1>
      <PieChartComponent />
    

    <div className='button-div9'>
      <button className="button-back9" onClick={goBack}>Back</button>
    </div>    
   </div>

  );        
};

export default Pie;