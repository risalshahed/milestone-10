// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8YKgjcX-GHKGDEllUYNQewzXCh9sRIYI",
  authDomain: "ema-john-simple-fc4b8.firebaseapp.com",
  projectId: "ema-john-simple-fc4b8",
  storageBucket: "ema-john-simple-fc4b8.appspot.com",
  messagingSenderId: "980390305422",
  appId: "1:980390305422:web:4dcce35fda1929f26173df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;