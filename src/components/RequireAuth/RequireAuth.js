import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const [user] = useAuthState(auth);
  const location = useLocation();

  if(!user) {
    // Redirect them to the "/login" page, but save the current location they were trying to go to when they were redirected. This allows us to send them along to that page after they login, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  // jodi user thake, App.js a MENTION kora RequireAuth er child component a navigate kro!
  // For example, order route a click kore RequireAuth a jabe, loggend in NAA thakle login a navigate hbe; otherwise, logged in thakle ba login krle, RequiteAuth er Child Component (Look at App.js) Order a chole jabe
  return children;
};

export default RequireAuth;