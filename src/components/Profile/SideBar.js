import React , {useState} from 'react'
import './Profile.css'
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import EditProfile from './EditProfile';


const SideBar = ({profile}) => {
// Edit Profile State
  const [editModalState, setEditModal] = useState(false);
// Set State Function
  const handleEditModalOpen = () => setEditModal(true);
  const handleEditModalClose = () => setEditModal(false);

 const {username, description, occupation, image} = profile
  return (
    <div className='InSideBar'>
      <div style={{marginTop:'25px'}}>
      {image? (
            <Figure>
            <Figure.Image
              className='profile-image'
              alt="171x180"
              src={image}
            />
           </Figure>
      ): (     <Figure>
        <Figure.Image
          className='profile-image'
          alt="171x180"
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexBcYNZI8yGT2ELfzNvqsisnSDI1G4RR1HIVGAcafrg&s'
        />
       </Figure>)}
  
      </div>
    <div className='username'>
        <h1>
            {username}
        </h1>
        <h3>
            {occupation}
        </h3>
        <p>
          {description}
        </p>
    </div>
    
    <Button
      style={{marginBottom:"10px"}}
      variant="outline-secondary" 
      size="lg"
      onClick = {handleEditModalOpen}
      >
            Edit Profile
    </Button>
    <EditProfile
        show = {editModalState}
        handleClose = {handleEditModalClose}
        profile ={profile}/>
 
    <NavLink to="/listing/new">
        <Button variant="outline-secondary" size="lg">
                CasaAmor Your Home
        </Button>
    </NavLink>
    </div>
  )
}

export default SideBar