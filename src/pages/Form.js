// forrás: https://www.freecodecamp.org/news/build-dynamic-forms-in-react/
// mármint a táblázatnak a forrása

// a firestore-ban az adatfeltöltés az alábbi videó alapján:
// https://www.youtube.com/watch?v=AUubLH88HBM



import * as React from 'react';
import { useState,  useEffect, useCallback, useRef  } from 'react';
import {useNavigate} from 'react-router-dom';
import { db} from "./firebase";
import {addDoc, collection, getDocs} from "firebase/firestore";
//import { v4 } from "uuid";
import { v4 as uuidv4 } from 'uuid';

import "./form.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import UploadFirebase from './UploadFirebase';

export const saveCoordinatesToFirebase = async (latitude, longitude) => {
  const usersCollectionRef = collection(db, "flys");

  try {
    await addDoc(usersCollectionRef, { latitude, longitude});
    console.log("Coordinates saved to Firebase!");
  } catch (error) {
    console.error("Error saving coordinates:", error);
  }
};



function Form() {

  const navigate = useNavigate();
  const [inputList, setInputList] = useState();
 // const [formFields, setFormFields] = useState();
  const [newname, setNewname] = useState();
  const [newmail, setNewmail] = useState();
  const [newphone, setNewphone] = useState();
  const [newplace, setNewplace] = useState();
  const [newlatitude, setNewlatitude] = useState();
  const [newlongitude, setNewlongitude] = useState();
  //const usersCollectionRef = collection(db,"Personal datas");
  
  const goBack = () => {       
        navigate(-1);
    }

  const addFields = () => {
    let object = {
      name: '',
      mail: '',
      phone: '',
      place: '',
      latitude: '',
      longitude: '',
    }
    setFormFields([...formFields, object])
  } 

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

 /* useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []); */

  //ez a rész az alábbi alapján íródott:
  //  https://codesandbox.io/s/add-react-component-onclick-oery4?file=/src/index.js
  // az a rész, hogy button-ra feljön egy react komponent, most egy div

  /* 
  Ez a rész a próba-button megnyomására reagál, keletkezik egy piros színű
  div, ennek semmi köze az eredetihez, csak sajnáltam kidobni...

  const [inputList, setInputList] = useState();

   const proba = () => {
    let a = "hello";
    setInputList(<div className="proba-div"> {a} </div>) }

    ez a rész a Return részbe való:
         <div>
            <button  onClick={proba}> Proba-button</button>
            {inputList}
         </div>
  } */
  
  const generateUniqueId = () => {
    return uuidv4();
  };

  const [formFields, setFormFields] = useState([
    { name: '', mail: '', phone: '', place: '', latitude: '', longitude: '' },
  ])

  const handleNavigate = (name, mail, phone, place, latitude, longitude) => {
    id: generateUniqueId()
    navigate(`/UploadFirebase?name=${name}&mail=${mail}&phone=${phone}&place=${place}&latitude=${latitude}&longitude=${longitude}`);
  };

  return (
    <div className="container3">

     <div>

      <form   className='form-style'>
        {formFields.map((form, index) => { 
          return (
            <div key={index}>
              <input                
                name='name'
                placeholder='Name'
                onChange={event =>(handleFormChange(event, index),  setNewname(form.name))}
                value={form.name}
              />
              <input            
                name='mail'
                placeholder='Mail'
                onChange={event => (handleFormChange(event, index), setNewmail(form.mail))}
                value={form.mail}
              />
               <input                
                name='phone'
                placeholder='Phone'
                onChange={event => (handleFormChange(event, index), setNewphone(form.phone))}
                value={form.phone}
              />
               <input
                name='place'
                placeholder='Place'
                onChange={event => (handleFormChange(event, index), setNewplace(form.place))}
                value={form.place}
              />
               <input
                name='lat'
                placeholder='latitude'
                onChange={event => (handleFormChange(event, index), setNewlatitude(form.lat))}
                value={form.lat}
              />
              <input
                name='long'
                placeholder='longitude'
                onChange={event => (handleFormChange(event, index), setNewlongitude(form.long))}
                value={form.long}
              />
              <input  
                          
                placeholder='PhotoUpload'
                onClick={() => handleNavigate(newname,newmail,newphone,newplace,newlatitude,newlongitude)}
                
              />

              <button className='button-remove' onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}  
      </form>
      </div>  

     <div className="button-div">
        <button className="button-add3" onClick={addFields}>Add More..</button>
      
          <br/>
    
        <button className="button-back3" onClick={goBack}>Back</button>	   

                   
     </div>    

    </div>

 );
}


export default Form;

