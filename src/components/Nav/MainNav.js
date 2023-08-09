//import { NavLink } from "react-router-dom";
import "./MainNav.css";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useContext} from 'react';
import SignUpModal from './SignUpModal.js';
import LogInModal from './LogInModal.js';
import SearchBar from "./SearchBar";
import { AuthContext } from "../../context/auth-context";


function MainNav() {

const [showSignUpModal, setShowSignUpModal] = useState(false);
const [showLogInModal, setShowLogInModal] = useState(false);
const [currentUser, setCurrentUser] = useState(" ");
//const [isLoggedIn, setIsLoggedIn] = useState(" ");

const handleSignUpModalOpen = () => setShowSignUpModal(true);
const handleSignUpModalClose = () => setShowSignUpModal(false);
const handleLogInModalOpen = () => setShowLogInModal(true);
const handleLogInModalClose = () => setShowLogInModal(false);
const auth = useContext(AuthContext)


const handleCurrentUser = (data) => {
  setCurrentUser(data);
}

//console.log(currentUser)

  return (
    <div className="mainNavBar">
    <Navbar className="navMain" expand="lg" fixed="top">
      <div className="logo"><a className="logoCasaAmor" href="/">CasaAmor</a></div>
      <div className="searchBar"><SearchBar/></div>
      <div className="dropDown">
          <NavDropdown className="dropdownTitle" title={auth.isLoggedIn ? `Welcome` : "User"} id="navbarScrollingDropdown" >
            {auth.isLoggedIn? (
              <>
                <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>auth.logout()}>Log Off</NavDropdown.Item>
              </>
             
            ):(
              <>
                <NavDropdown.Item onClick = {handleLogInModalOpen}>Log In</NavDropdown.Item>
                    <LogInModal 
                      show={showLogInModal}
                      handleCurrentUser
                      handleClose ={handleLogInModalClose}
                    />
                <NavDropdown.Item onClick = {handleSignUpModalOpen}>Sign Up</NavDropdown.Item>
                    <SignUpModal 
                    show={showSignUpModal} 
                    handleClose = {handleSignUpModalClose}/>
              </>
            )}      
              <NavDropdown.Divider />
              <NavDropdown.Item href="/listing/new">
                CasaAmor Your Home
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
              </NavDropdown.Item>
            </NavDropdown>
            </div>
    </Navbar>
    <div className="emptyDiv"></div>
    </div>
  );
}

export default MainNav;
