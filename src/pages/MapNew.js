import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, LoadScript,InfoWindow, Autocomplete } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import mapStyles from './MapStyles.json';
import './mapNew.css';
import './mapStyle.css';
import  {db}  from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { saveCoordinatesToFirebase} from "./Form";
import Form from "./Form";
import {useNavigate} from 'react-router-dom';
import PieChartComponent from './PieChartComponent';




const Map2 = ({ isLoaded }) => {

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "Personal datas");
    const [stateModified, setStateModified] = useState([]);
    const [newMarkers, setNewMarkers] = useState([]);
    const mapRef = useRef(null);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [index, setIndex] = useState(0);
    const [map, setMap] = useState(null); // Store the map instance
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [selectedPlaceCoords, setSelectedPlaceCoords] = useState({ lat: 0, lng: 0 });
    //..........................-----------------------------------------------------
    const navigate = useNavigate();
    const [inputList, setInputList] = useState();
   // const [formFields, setFormFields] = useState();
  
    const [newname, setNewname] = useState();
    const [newmail, setNewmail] = useState();
    const [newphone, setNewphone] = useState();
    const [newplace, setNewplace] = useState();

    //const usersCollectionRef = collection(db,"Personal datas");
  
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
      const [formFields, setFormFields] = useState([
      { name: '', mail: '', phone: '', place: '' },
    ])
  
    const handleNavigate = (name, mail, phone, place) => {
      navigate(`/UploadFirebase?name=${name}&mail=${mail}&phone=${phone}&place=${place}&latitude=${selectedMarker.latitude}&longitude=${selectedMarker.longitude}`);};
  
    //--------------------------------------------------------------------------------


    const mapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        showMyLocationButton: true, // Enables the My Location button
      };
    
    
      const onMapLoad = (map) => {
        mapRef.current = map;
        setMap(map);
      };

    
      const [mapCenter, setMapCenter] = useState({
        lat: 0, 
        lng: 0,
      });

        const [lat, setLat] = useState(null);
        const [lng, setLng] = useState(null);
        const [status, setStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const watchUserPosition = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            if (isMounted) {
              setStatus(null);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
              console.log('Lat:' + position.coords.latitude);
              console.log('Lng:' + position.coords.longitude);
            }
          },
          () => {
            setStatus('Unable to retrieve your location');
          }
        );
        return () => {
          isMounted = false;
          navigator.geolocation.clearWatch(watchId);
        };
      }
    };

    const unsubscribe = watchUserPosition();
    return () => unsubscribe();
  }, []); 
  
  
    const currentPosition = {
            lat: lat,
            lng: lng,
          };
        
      const handleMapClick = (e) => {
        const clickedLat = e.latLng.lat();
        const clickedLng = e.latLng.lng();
        console.log('Clicked pin: lat:'+ e.latLng.lat() + ' lng: '+e.latLng.lng());
    
        // Create a new marker object
        const newMarker = {
          id: uuidv4(),
          latitude: clickedLat,
          longitude: clickedLng,
        };

        // Save coordinates to Firebase
        //saveCoordinatesToFirebase(clickedLat, clickedLng);

        setMapCenter({ lat: clickedLat, lng: clickedLng });
        // Add the new marker to the state
        setNewMarkers([...newMarkers, newMarker]);
        setIndex(index + 1);
        setFlag(false);
        setFlag2(true);
        setSelectedMarker(newMarker);
      };
    
      const toggleFlag = () => {
        setFlag((prevFlag) => !prevFlag);
        console.log('Flag is :', flag); 
      };
    
    
      useEffect(
        () => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers(); 
      }, []
      );
    
      const Logstate = () => {
        setStateModified(users);
        console.log(users);
      }

      // --------------------      C O N T A I N E R   S T Y L E        -------------------------- //
      const mapContainerStyle = {  
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: '#757575',
        width: 'calc(70% - 30px)',
        height: 'calc(100vh - 100px)',
        marginLeft: 'auto', // Align the map container to the right side
        marginRight: '20px', // Add margin to the right for spacing
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,1)', // Add a shadow effect
        height: '100%',
        // Responsive height using media queries within inline styles
        '@media (min-width: 768px)': {
          height: '400px', // Adjust height for medium-sized screens
        },
        '@media (min-width: 992px)': {
          height: '600px', // Adjust height for larger screens
        },
      };  

// -------------------------------------------------------------- //

     const displayMarkers = () => {
        console.log('Displaying markers:', users); 
        console.log('Flag is :', flag);
        return users.map((user, index) => {
         const latitude = parseFloat(user.latitude);
         const longitude = parseFloat(user.longitude);
         if (!isNaN(latitude) && !isNaN(longitude)) {
          return (
            <Marker
              key={index}
              id={user.id}
              position={{
                lat: latitude,
                lng: longitude,
              }}
              
              onClick={() => {setSelectedMarker(user);}}
              />    
          );
        } else {
          console.error('Invalid latitude or longitude:', user.latitude, user.longitude);
          return null; 
        }
        });
      }; 
      
  const displayNewMarkers = () => {
        console.log('Displaying new markers:', newMarkers); 
        return (
        newMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            onClick={() => {setSelectedMarker(marker);}}
            />
        ))
        )
      }; 

  if (!isLoaded ) {
    return <div>Loading...</div>;
  }
  
  const handleAutocompleteLoad = (auto) => {
    setAutocomplete(auto);
  };

  const handlePlaceSelect = () => {
    if (autocomplete && map) { 
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.geometry) {
        const newCoords = {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        };
        
        console.log('Selected search at search bar: Lat:' + newCoords.lat +' , Lng:' + newCoords.lng)  
        const isLocal = (
          selectedPlaceCoords.lat === currentPosition.lat &&
          selectedPlaceCoords.lng === currentPosition.lng
        );
        setShowButton(!isLocal);
        const zoomLevel = 15;
        map.setZoom(zoomLevel);      
        map.panTo(newCoords);
        // Optionally, set a marker on the selected place
      }
    }
  };

  const setMapCenterToLocal = () => {
    if (map) {
      map.panTo(currentPosition);
      setShowButton(false);
      const zoomLevel = 18;
      map.setZoom(zoomLevel); 
    }
  };

  return (

    <div className="map-wrapper">
      <div class = "mapContainerStyle1"> 
      
        <GoogleMap googleMapsApiKey="AIzaSyCg6M1oqiTQY4urstBRFmGiLeS7_txevRw"
           mapContainerStyle={mapContainerStyle}
           center={flag2 ? mapCenter : currentPosition}
           zoom={flag ? 20 : 18}
           onLoad={onMapLoad}
           options={{ mapOptions, styles: mapStyles }}
           onClick={flag ? handleMapClick : null}
        >

     <div className="search-bar-div">
  
       <Autocomplete googleMapsApiKey="AIzaSyCg6M1oqiTQY4urstBRFmGiLeS7_txevRw" 
              onLoad={handleAutocompleteLoad} onPlaceChanged={handlePlaceSelect}>

         <input className='search-input-box'
             type="text"
             placeholder="Search..."
             onChange={(e) => setSearchTerm(e.target.value)}
         />      
       </Autocomplete>
     </div>

      <div
        className="toggle-flag-button"
        onMouseOver={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'} // Add box shadow on hover
        onMouseOut={(e) => e.target.style.boxShadow = 'none'}// Remove box shadow on mouse out
        onClick={() => setFlag(true)}
        >
      
       {flag ? 'DROP PIN' : 'PRESS TO DROP PIN'}
      </div>

      {selectedMarker && (
       <InfoWindow
          position={{
            lat: parseFloat(selectedMarker.latitude),
            lng: parseFloat(selectedMarker.longitude),
          }}
      onCloseClick={() => {
        setSelectedMarker(null); // Close the InfoWindow
      }}
      options={{ // Style options for the InfoWindow
        //maxWidth: 200,
        pixelOffset: new window.google.maps.Size(0, -30), // Adjust vertical positioning
        zIndex: 100,
        /* Add more style options as needed */
      }}
    >
      {/* Content of the InfoWindow */}
    <div className='info-div'>
     
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
                          
                placeholder='PhotoUpload'
                onClick={() => handleNavigate(newname,newmail,newphone,newplace)}
                
              />

              <button className='button-remove' onClick={() => removeFields(index)}>Remove</button> 
            </div>  
          )
        })}  
      </form>
      </div>
    </InfoWindow>
  )}
    { showButton && (
        <div
          className="jump-to-local-button"
       
         onMouseOver={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'} // Add box shadow on hover
         onMouseOut={(e) => e.target.style.boxShadow = 'none'}// Remove box shadow on mouse out
         onClick={setMapCenterToLocal}>
          JUMP TO LOCAL
        </div>
      )}
    {displayMarkers()}
    {displayNewMarkers()}
    </GoogleMap>
    </div>

    <div className='sideContainerStyle1'> {/*style={sideContainerStyle1}>*/}
      <p>fly-tipping</p><br></br>
      <p><a href="https://en.wikipedia.org/wiki/Illegal_dumping" target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '10px' }}>Wiki</a></p>
    </div>

    <div className='sideContainerStyle2'>
        <div className="fly-tipping-title"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow to the text
           }} >
          <h1>Diagrams</h1>
          <PieChartComponent/>
        </div>
    </div>

  </div>
  );
};




function MapNew() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkLoadStatus = () => {
      // Perform the check for API load status here, for example:
      const isApiLoaded = window.google && window.google.maps ;

      setIsLoaded(isApiLoaded);
    };

    
    // Poll the loading status every second (adjust the interval as needed)
    const intervalId = setInterval(checkLoadStatus, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="App"
    style={{
        backgroundColor:'#757575',
    }}
    >
      <div className="fly-tipping-title"
      style={{
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow to the text
      }} >
      <h1>📍 Fly-Tipping Here</h1>
      </div>
      
      <LoadScript googleMapsApiKey="AIzaSyCg6M1oqiTQY4urstBRFmGiLeS7_txevRw" libraries={['places']}>
        <Map2 isLoaded={isLoaded} />
      </LoadScript>
    </div>
  );
}

export default MapNew;