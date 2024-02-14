import * as React from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import tree from "./images/tree_1.png";

export default function Home() {


  return ( 
   
   <div className='container1'  style={{ backgroundImage: `url(${tree})`,
   backgroundSize: "auto", backgroundPosition: 'center',
   backgroundRepeat: "no-repeat",
   opacity:1,  
   width: "90%", 
   height:600,
 }}>
            <div className='div1'>
                <h2 className=''> Hadüzenet szemetelőknek </h2>
            </div>
    
            <div>
             <Link to="/form" className="linkStyle1"> Itt tudja az adatait megadni ill. fényképet feltölteni</Link>
           </div>
      
            <div>
             <Link to="/mapNew" className="linkStyle1"> Itt tudja a helyet térképen bejelölni </Link>
            </div>
            
            <div>-------------</div>
            <div>
             <h5><Link to="/login" className="linkStyle1"> Admin oldal </Link> </h5>
            </div>
       
          
    </div>

  );
}               
 