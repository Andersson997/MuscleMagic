// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP3QLuZW4PXUdwFAolmJpJgZQel36WQr4",
  authDomain: "musclemagic-efc33.firebaseapp.com",
  projectId: "musclemagic-efc33",
  storageBucket: "musclemagic-efc33.appspot.com",
  messagingSenderId: "994962203436",
  appId: "1:994962203436:web:bb859d6071e278b5198289"
};

// Initialize Firebase
export const MuscleMagicApp = initializeApp(firebaseConfig);
export const MuscleMagicAuth = getAuth(MuscleMagicApp);
export const MuscleMagicDb = getFirestore(MuscleMagicApp);