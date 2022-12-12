import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const Shipment = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleNameBlur = e => {
    setName(e.target.value);
  }
  const handleAddressBlur = e => {
    setAddress(e.target.value);
  }
  const handleNumber = e => {
    setNumber(e.target.value);
  }

  // signup hoye gele, if user exists, homepage a redirect kro
  


  const handleCreateUser = e => {
    e.preventDefault();
    const shipping = { name, email, address, number };
    console.log(shipping);
    


  }

  return (
    <div>
      <div className="form-container">
        <h2>Shipping Info</h2>
        <form onSubmit={handleCreateUser}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input onBlur={handleNameBlur} type="text" name="name" id="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input value={user?.email} readOnly type="email" name="email" id="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input onBlur={handleAddressBlur} type="text" name="address" id="address" required />
          </div>
          <div className="input-group">
            <label htmlFor="number">Number</label>
            <input onBlur={handleNumber} type="number" min='0' name="number" id="number" />
          </div>
          

          <p style={{color: 'red'}}>{ error }</p>
          <input type="submit" value="Add Shipping" className="form-submit" />  
        </form>
      </div>
    </div>
  );
};

export default Shipment;