import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth);

  const handleEmailBlur = e => {
    setEmail(e.target.value);
  }
  const handlePasswordBlur = e => {
    setPassword(e.target.value);
  }
  const handleConfirmPasswordBlur = e => {
    setConfirmPassword(e.target.value);
  }
  // signup hoye gele, if user exists, homepage a redirect kro
  if(user) {
    navigate('/');
  }


  const handleCreateUser = e => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setError('Passwords didn\'t match');
      return;
    }
    if(password.length < 8) {
      setError('Password must conitain 8 characters minimum');
      return;
    }

    createUserWithEmailAndPassword(email, password)


  }

  return (
    <div>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleCreateUser}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onBlur={handleEmailBlur} type="email" name="email" id="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onBlur={handlePasswordBlur} type="password" name="password" id="password" required />
          </div>
           <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input onBlur={handleConfirmPasswordBlur} type="password" name="confirm-password" id="confirm-password" required />
          </div>

          <p style={{color: 'red'}}>{ error }</p>
          <input type="submit" value="Sign Up" className="form-submit" />  
        </form>

        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;