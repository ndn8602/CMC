// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fir-cmc-9cbb4.firebaseapp.com",
  databaseURL: "https://fir-cmc-9cbb4-default-rtdb.firebaseio.com",
  projectId: "fir-cmc-9cbb4",
  storageBucket: "fir-cmc-9cbb4.appspot.com",
  messagingSenderId: "947578128352",
  appId: "1:947578128352:web:3a57f57a273862cd158d85",
  measurementId: "G-955HB1W1RC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
