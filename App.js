import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

// ****** Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// steps ( Build -> Authentication -> Web -> Get Started )
// create a firebase project & register your app
// npm install firebase
// see details on https://firebase.google.com/docs/web/setup?authuser=0#add-sdk-and-initialize

function App() {
  // user in useState
  const [user, setUser] = useState({});
  // create provider
  // https://firebase.google.com/docs/auth/web/google-signin
  const googleProvider = new GoogleAuthProvider();
  // https://firebase.google.com/docs/auth/web/github-auth
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(err => {
      console.error(err);
    })
  }



  // console.log('working');
  /* signInWithPopup(auth, googleProvider)
  .then(result => {
    const user = result.user;
    console.log(user);
  })
  .catch(error => {
    console.log('error', error);
  }) */



  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
      setUser(user);
    })
    .catch(error => console.error(error))
  }

  /* const handleSignOut = () => {
    signOut(auth)
    .then( () => setUser({}) )  // No Parameter Here
    .catch(error => setUser({}))  // Error khaileo user k BER kore dbo!
  } */

  const handleSignOut = () => {
    signOut(auth)
    // signOut krle, kono user thakbe NAA
    .then(setUser({}))
    .catch(err => {
      // err thakleo, signOut kore daao
      setUser({})
    })
  }


  return (
    <div className="App">
      {/* Toggle Sign in & Sign Out Button */}
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      }
      {/* {
        !user.uid ? <button onClick={handleGoogleSignIn}>Google Sign In</button>
        :
        <button onClick={handleGoogleSignOut}>Sign Out</button>
      } */}
      <h2>Hey {user.displayName}</h2>
      <p>Your email id is {user.email}</p>
      <img src={user.photoURL} alt={user.displayName} />
    </div>
  );
}

export default App;
