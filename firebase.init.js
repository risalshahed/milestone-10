// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0e2h9laixUHxIpjN_PyQ3HOwpXqR3D8k",
  authDomain: "email-password-auth-af236.firebaseapp.com",
  projectId: "email-password-auth-af236",
  storageBucket: "email-password-auth-af236.appspot.com",
  messagingSenderId: "538900144938",
  appId: "1:538900144938:web:6a8b4f80f3cca3e55df453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export it (eita site silona, nijer likhte hoice)
export default app;