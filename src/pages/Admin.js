import './admin.css';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import  {db}  from "./firebase";
import { ref, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import {
  collection, getDocs, doc, updateDoc, deleteDoc,
} from "firebase/firestore";
import Pie from './Pie';

function Admin() {

 const navigate = useNavigate();

 const navigateToPie = () => {
    navigate('/statistic/pie');
     };
   
    // here are the States defined, in these states can we put different datas
    // and also the 2 collections, this is a Storage function, which is called from
    // the Firebase/Storage
 const [users, setUsers] = useState([]);
 const usersCollectionRef = collection(db, "Personal datas");
 const [imageURL, setImageURL] = useState(null);
 const [showImage, setShowImage] = useState(false);
 const [selectedUserId, setSelectedUserId] = useState(null);


 useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })
      ));
    };  
    getUsers();
  }, []); 

// this async function calls the Firestore/Storage with the images
// and sets the images to the imageUrl State with the setImageUrl command
const fetchImage = async (name) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${name}`); // Adjust the path to your images

  try {
    const downloadURL = await getDownloadURL(imageRef);
    setImageURL(downloadURL);
    
  } catch (error) {
    // Handle any errors, e.g., image not found
    console.error('Error fetching image:', error);
    setImageURL(null);
  }
};

// showImage is a logical State, /true or false/ in case of true is the image
// visible, in case false is invisible 
// the "toggle" function changes this State
const toggleImage = () => {
  setShowImage(!showImage);
};

//const [inputList, setInputList] = useState();

const handleDelete = async (itemId) => {
  try {
    const dataRef = doc(collection(db, 'Personal datas'), itemId); 
    await deleteDoc(dataRef);
    
    const storage = getStorage();
    const imageStorageRef = ref(storage, `images/${itemId}`);
    await deleteObject(imageStorageRef);

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })
      ));
    };  
    getUsers();

    console.log(`Item with ID ${itemId} deleted`);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};


const goBack = () => {       
  navigate(-1);     
   } 



return (      

  <div className='main8'> 
  <div className='proba-div8'>
    <h1>Admin oldal</h1>
  </div>  


<div className="container8">
      
<table>
   <tr>  
{/*head line of the table */}
<th>Id</th>
<th>Name</th>
<th>Mail</th>
<th>Phone</th>
<th>Place</th>
<th>Photo</th>
<th>Lat</th>
<th>Long</th>
<th>Töröl</th>
    </tr>

{/*the next part shows the picture
with the "and = &&" logical function */}
{imageURL && showImage && (
<div className="overlay"> 
<img src={imageURL} alt="Fetched Image" />  
{/*close button, calls the toggle function, wich changes the 
"showImage" state to false" */}
<button onClick={toggleImage} className="close-button">
Close  
</button>
</div>
)}

{/*here begins the main cycle, the main parameter is the "user", 
user is a state, and in this state is located the data file named
Personal datas from the Firestore/Database
and in the first useEffect function are these datas set in the users state */}


    {users.map((user, key) => { 

        return (

            <tr key={key}> 
  {/*we are here in the main cycle, for every name writes the cycle
  the name, mail, etc.  */}
  <td>{user.id}</td>
  <td>{user.name}</td>
  <td>{user.mail}</td>
  <td>{user.phone}</td>
  <td>{user.place}</td>

  {/*here calls the onClick event the picture */}
  <td><button  onClick={() => {fetchImage(user.id);
     toggleImage();  }}>
    Click here</button></td>	
  <td>{user.latitude}</td>
  <td>{user.longitude}</td>


    <td><button  onClick={() => {
        handleDelete(user.id); }}> Delete </button></td>
            </tr>
        )
    }  )}

</table> 

  <div className='button-div8'>
   <button className="button-back8" onClick={goBack}>Back</button>         
   <button className="button-back8" onClick={navigateToPie}>Statistic</button>
  </div>

  </div>
  </div>
   )
}

export default Admin;