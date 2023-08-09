import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../context/auth-context';
function SignUpModal({show,handleClose}) {
  ////////////////////states and props////////////////////

  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useContext(AuthContext)
  console.log(auth)

  ///////////////handle submit function///////////////////
  const handleSubmit = async (event) => {
    event.preventDefault();

    // check password
    if(password !== confirmPassword){
      setErrorMessage('Passwords do not match');
      return;
    }

    const signUpData = {
      username: username,
      email: email,
      password: password,
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      };
      // const responseData = await fetch(
      //   "http://localhost:4000/user/signup", options
      // );
      const responseData = await fetch(
        "https://airbnb-main.onrender.com/user/signup", options
      );

      const signUpObj = await responseData.json();
      //console.log(signUpObj)
      
      if(responseData.ok) {
        // set the auth with successfully login info
        //console.log(signUpObj)
        //console.log("Login sucessful");
        logIn();
        //close modal
         handleClose();
      } else {
          setErrorMessage(signUpObj.error);
          //console.log("Login failed:")
      }

} catch(error){
    console.error('Login error:',error)
}   
  }

//login 
const logIn = async () => {
  const loginData = {
    email: email,
    password: password,
  };

  try {
    const loginOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    };
    
    const responseData = await fetch('https://airbnb-main.onrender.com/user/login', loginOptions);
    //const responseData = await fetch('http://localhost:4000/user/login', loginOptions);
    const loginObj = await responseData.json();

    if (responseData.status === 200) {
      auth.login(loginObj.currentUser.id, loginObj.token, loginObj.currentUser);
      //console.log('Login successful');
      handleClose();
    } else {
      setErrorMessage('Email or password do not match');
      //console.log('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit = {handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                value = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" size="lg" type='submit'>
            Create an account
          </Button>
          </Form>
          {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
        </Modal.Body>

      </Modal>
    </>
  );
}

export default SignUpModal;