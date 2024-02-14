//Ez a videó alapján készült elsősorban
// https://www.youtube.com/watch?v=YOAeBSCkArA


import "./uploadFirebase.css";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { db} from "./firebase";
import {addDoc, doc, collection, setDoc} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
   } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import getCountryFromCoordinates from './getCountryFromCoordinates';

function UploadFirebase() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const userid = searchParams.get('id');
  const username = searchParams.get('name');
  const usermail = searchParams.get('mail');
  const userphone = searchParams.get('phone');
  const userplace = searchParams.get('place');
  const userlatitude = searchParams.get('latitude');
  const userlongitude = searchParams.get('longitude');
  const [country, setCountry] = useState(null);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const usersCollectionRef = collection(db,"Personal datas");

  //const [preview, setPreview] = useState(null);
  const [inputList, setInputList] = useState();

  const [userid, setUserid] = useState();

  const navigate = useNavigate();
  const goBack = () => {       
		navigate(-1);
    }

 const handleResetClick = () => {
      setImageUpload(null); // Reset the selected image
    };

 useEffect(() => {
   setUserid(uuidv4());
    }, []);

 const handleClick = () => {  
      uploadFile();
      handleSubmit();
 }

  

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${userid}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    let a = "Sikeres feltöltés, köszönjük!";
    setInputList(<div> {a} </div>);
  };
  
  const handleSubmit = async () => {
    try {
      const userRef = doc(collection(db, 'Personal datas'), userid);
  
      // Fetch the country using getCountryFromCoordinates
      const country = await getCountryFromCoordinates(userlatitude,userlongitude);
      await setDoc(userRef, {
        id: userid,
        name: username, 
        mail: usermail,
        phone: userphone,
        place: userplace,
        latitude: userlatitude,
        longitude: userlongitude,
        country: country,
      });
  
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  




 // megjegyzés: ezen useEffect nélkül is tökéletesen működik a feltöltés
 
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="container6">   
      <div>
          <p>
            <span>Képfeltöltés</span>&nbsp;
          </p>

          <div className="header6">
            <input  
             className="button-file-browser6"
             type="file"
             onChange={(event) => {
             setImageUpload(event.target.files[0]);    
              }}
                />

         { imageUpload && <img src={URL.createObjectURL(imageUpload)} />}

      </div>


      
    <div  className="div-button6">

        <button  onClick={handleClick} className="button-image-upload6">
           Submit datas</button>   

           <div>          
             {inputList}
           </div> 
         
         <div>
           <button
             onClick={handleResetClick}
             className="button-upload-reset6"
           >
            Reset
           </button>
         </div>
    </div>  
  </div>

        <div className='div-empty6'>
		       <button className="button-back6" onClick={goBack}>Back</button>	            
        </div> 

   </div>
  );
}

export default UploadFirebase;