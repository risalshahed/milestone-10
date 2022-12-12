import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usesigninwithemailandpassword
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  // setting a variable from default router useNavigate
  const navigate = useNavigate();

  const location = useLocation();

  // setting from (Login successful hoile, redirect to homepage)
  const from = location.state?.from?.pathame || '/';
  
  const handleEmailBlur = e => {
    setEmail(e.target.value);
  }
  const handlePasswordBlur = e => {
    setPassword(e.target.value);
  }

  // login hoye gele, if user exists, homepage a redirect kro
  if(user) {
    navigate(from);
    // navigate(from, {replace: true});
  }

  // handle login form submit
  const handleLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  return (
    <div className='login'>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="">Email</label>
            <input onBlur={handleEmailBlur} type="email" name="email" id="" required />
          </div>
          <div className="input-group">
            <label htmlFor="">Password</label>
            <input onBlur={handlePasswordBlur} type="password" name="password" id="" required />
          </div>
          {/* display error message if exists */}
          <p style={{color: 'red'}}>{ error?.message }</p>
          {/* display LOADING */}
          {
            loading && <p>Loading...</p>
          }
          <input type="submit" value="Login" className="form-submit" />  
        </form>

        <p>
          New to Ema-John? <Link to='/signup'>Create New Account Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;