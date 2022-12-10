// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXUSVxwwtbOK0lkdyYuC4gKm2FLp2e7ks",
  authDomain: "simple-firebase-authenti-260f8.firebaseapp.com",
  projectId: "simple-firebase-authenti-260f8",
  storageBucket: "simple-firebase-authenti-260f8.appspot.com",
  messagingSenderId: "939389225515",
  appId: "1:939389225515:web:65993a206d5d40c52c786e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export it (eita site a silona, nijer likhte hoice)
export default app;