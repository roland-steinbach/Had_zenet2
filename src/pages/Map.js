import React, { useState, useEffect, Fragment, useContext, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, LoadScript } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';
import mapStyles from './MapStyles.json';
//import "./map.css";
import  {db}  from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import bag_2 from "./images/bag_2.ico";

const Map = () => {


  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 0, 
    lng: 0,
  });

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "flys");
  const [stateModified, setStateModified] = useState([]);
  const [newMarkers, setNewMarkers] = useState([]);
  const mapRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const [index, setIndex] = useState(0);


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
    setMapCenter({ lat: clickedLat, lng: clickedLng });
    // Add the new marker to the state
    setNewMarkers([...newMarkers, newMarker]);
    setIndex(index + 1);
  };

  const toggleFlag = () => {
    setFlag((prevFlag) => !prevFlag);
    console.log('Flag is :', flag); 
  };

  const toggleMapCenter = () => {
    setCurrentPosition((prev) => !prev);
  };



 useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,

          });
          //  console.log('Lat:'+ position.coords.latitude);
          //  console.log('Lng' + position.coords.longitude);
        },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      ); 
    } else {
      console.log('Geolocation not available');
    }
  }, []); 

  const Logstate = () => {
    setStateModified(users);
    console.log(users);
  }

  const mapContainerStyle = {
    //width: '100vh', 
    height: '100vh', 
  };

// Átírva a Firebase-ből beolvasott koordinátákra 
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
          icon={{
            url: bag_2, 
            scaledSize: new window.google.maps.Size(50, 50), 
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    } else {
      console.error('Invalid latitude or longitude:', user.latitude, user.longitude);
      return null; 
    }
    });
  }; 
  
  //ez az 1 sor jön lent a {displayNewMarkers()} fölé:
 

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
        icon={{
          url: bag_2, 
          scaledSize: new window.google.maps.Size(50, 50), 
        }}
        onClick={() => console.log('You clicked a new marker!')}
      />
    ))
    )
  }; 


  return (
    <div>
    <div className="container-big7">
    <LoadScript googleMapsApiKey="AIzaSyCg6M1oqiTQY4urstBRFmGiLeS7_txevRw">
        <div className="map-container"> 
      <GoogleMap


        mapContainerStyle={mapContainerStyle}
       
      /*  center={{
          lat: currentPosition.latitude,
          lng: currentPosition.longitude,
        }} */

        center={flag ? currentPosition : mapCenter
        }
          
        zoom={12}
        options={{ styles: mapStyles }}
        onClick={flag ? handleMapClick : null}
      >
        {displayMarkers()}
        {displayNewMarkers()}        



      </GoogleMap>
      <div
          className="custom-marker"
          onClick={toggleFlag}
          style={{
            position: 'absolute',
            top: '70%', // Adjust the top position as needed
            right: '82%', // Adjust the right position as needed
            cursor: 'pointer',
          }}
        >
          <img src={bag_2} alt="Custom Marker" width="10px" height="250px" />
        </div>
      </div>
  
     <div>

     </div>
   
    </LoadScript>
    </div>


  </div>
  );
};

export default Map;


