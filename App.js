import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  // check if registered or not
  const [registered, setRegistered] = useState(false);
  
  
  const handleEmailBlur = e => {
    setEmail(e.target.value);
  }

  const handlePasswordBlur = e => {
    setPassword(e.target.value);
  }

  const handleRegistrationState = e => {
    // console.log(e.target.checked);  // ******* this line
    setRegistered(e.target.checked);
  }

  // https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email verification sent');
    })
  }

  // reset password
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('email sent');
    })
  }

  const handleSubmit = e => {
    // https://react-bootstrap.github.io/forms/validation/
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;   // if invalid, don't progress (to firebase)
    }
    if(! /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) ) {
      setError('Password must contain at least eight characters, at least one letter and one number');
      return;
    }
    setValidated(true); // else (if not invalid i.e. valid)
    setError('');   // if not invalid i.e. valid



    if(registered) {
      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        // clear input fileds after successful registration
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })     
    } else {  // not registered? sign up kro
      // signup when click on submit button (https://firebase.google.com/docs/auth/web/password-auth)
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        // clear input fileds after successful registration
        setEmail('');
        setPassword('');
        // call verifyEmail function to verify your email
        verifyEmail();
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      // console.log('submitted nigga', email)
    }
  }

  return (
    <div className="App">
      {/* https://react-bootstrap.github.io/forms/overview/ */}
      <div className="registration w-50 mx-auto">
        <h2 className='text-primary'>{ registered ? 'Login' : 'Register' } Here</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {/* https://react-bootstrap.github.io/forms/validation/ */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            {/* https://react-bootstrap.github.io/forms/validation/ */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegistrationState} type="checkbox" label="Already Registered?" />
          </Form.Group>

          <p className="text-danger">{error}</p>

          <Button onClick={resetPassword} variant="link">Password Reset?</Button>
          <br />
          <Button variant="primary" type="submit">
            { registered ? 'Login' : 'Register' }
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;