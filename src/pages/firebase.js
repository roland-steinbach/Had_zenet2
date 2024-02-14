

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage}   from "firebase/storage";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6HMZvHsyNOpCBPJDebTY0KmiVht3HSA8",
  authDomain: "flytippinghere.firebaseapp.com",
  databaseURL: "https://flytippinghere-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flytippinghere",
  storageBucket: "flytippinghere.appspot.com",
  messagingSenderId: "838310825301",
  appId: "1:838310825301:web:85061365423a02ebcb33dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


