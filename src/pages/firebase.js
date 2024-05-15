

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage}   from "firebase/storage";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXhglM9ixWLwgGaxFKfboEAo4hErgt-rI",
  authDomain: "haduzenet-1aa66.firebaseapp.com",
  projectId: "haduzenet-1aa66",
  storageBucket: "haduzenet-1aa66.appspot.com",
  messagingSenderId: "509761022975",
  appId: "1:509761022975:web:8b14cf50d834c2d59895ca",
  measurementId: "G-EKLYD2FF7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


