import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// steps ( Build -> Authentication -> Web -> Get Started )
// create a firebase project & register your app
// npm install firebase
// see details on https://firebase.google.com/docs/web/setup?authuser=0#add-sdk-and-initialize

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // form validation (apparently optional)
  const [validated, setValidated] = useState(false);

  // Registered or NOT
  const [registered, setRegistered] = useState(false);

  // error handling
  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const handleNameBlur = e => {
    setName(e.target.value);
  }

  const handleEmailBlur = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }

  // checkIfRegistered
  const checkIfRegistered = e => {
    // console.log(e.target.checked);
    setRegistered(e.target.checked);
  }

  const handleFormSubmit = e => {
    e.preventDefault();

    // form validation portion
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      // return if NOT valid
      return;   // as it's a non-valid case
    }

    //  password between 7 to 15 characters which contain at least one numeric digit and a special character
    if(! /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password) ) {
      setError('Password must contain at least a numeric digit, a special character & between 7 to 15 characters');
      return;
    }

    setValidated(true); // End of form validation portion
    setSuccess('Login Successful');
    setError('');

    if(registered) {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
        // if login successful, clear email & password field
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })

    } else {
      // console.log(`submitted, ${email}, ${password}`);
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
        // if registration successful, clear email & password field
        setEmail('');
        setPassword('');
        // Call Email Verification Function
        verifyEmail();
        // Call Name Function
        setUserName();
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      })
    }

  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => console.log('email sent'))
    .catch(error => console.error(error))
  }


  // Declare Email Verification Function
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email Verification Sent');
    })
  }

  // Declare Name Function
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => console.log(name))
    .catch(error => {
      console.error(error);
      setError(error.message);
    })
  }

  return (
    <div className="App">
      <div className="registration w-50 mx-auto">
        <h2 className='text-primary my-3'>
          { registered ? 'Login' : 'Register' } Here
        </h2>
        {/* https://react-bootstrap.github.io -> forms -> overview */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* registered na hoile, i.e. sign up er somoy name field dekhao */}
          {
            registered ||
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your name" required />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>
          }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={checkIfRegistered} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className="text-success">{ success }</p>
          <p className="text-danger">{ error }</p>
          {
            registered && <Button onClick={handlePasswordReset} variant='link'>Forget Password</Button>
          }
          <Button variant="primary" type="submit">
            { registered ? 'Login' : 'Register' }
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;