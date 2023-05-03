// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdZh-17-r_bfP8N8h77bNbIMw0BNHkreQ",
  authDomain: "clothing-arcade.firebaseapp.com",
  projectId: "clothing-arcade",
  storageBucket: "clothing-arcade.appspot.com",
  messagingSenderId: "218796750029",
  appId: "1:218796750029:web:22299d4a655fbaa4ac6584",
  measurementId: "G-JQWBGZDYZX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
