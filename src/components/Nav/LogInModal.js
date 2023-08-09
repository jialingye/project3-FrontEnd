import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../context/auth-context';


function LogInModal(props) {

  ////////////////////states and props////////////////////
  const {show, handleClose} = props;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useContext(AuthContext)
  console.log(auth)

//////////////////////handle submit function///////////////
  const handleHostLogin = (event) => {
    setEmail('host1@example.com')
    setPassword('password123')
  }

  const handleGuestLogin = (event) => {
    setEmail('guest1@example.com')
    setPassword('password123')
  }  

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const logIn = {
      email: email,
      password: password,
    };

try{
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logIn),
      };
      // const responseData = await fetch(
      //   "http://localhost:4000/user/login", options
      // );
      const responseData = await fetch(
        "https://airbnb-main.onrender.com/user/login", options
      );

      const LoginObj = await responseData.json();
      //console.log(LoginObj)
      
      if(responseData.ok) {
        // set the auth with successfully login info
        auth.login(LoginObj.currentUser.id,LoginObj.token,LoginObj.currentUser)
   
        //console.log(LoginObj)
        //console.log("Login sucessful");
        //close modal
         handleClose();
      } else {
          setErrorMessage("Email or password do not match");
          //console.log("Login failed:")
      }

} catch(error){
    console.error('Login error:',error)
}   
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit ={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value = {email}
                onChange ={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                value = {password}
                onChange ={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <Button variant="warning" size="lg" style = {{margin:"10px"}} onClick={() => handleGuestLogin()}>
            Demo Guest
          </Button> 
            <Button variant="warning" size="lg" style = {{margin:"10px"}} onClick={() => handleHostLogin()}>
            Demo Host
          </Button> 
            <Button variant="warning" size="lg" style = {{margin:"10px"}} type='submit'>
            Log In
          </Button> 
            </div>
            </Form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInModal;