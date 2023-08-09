import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../context/auth-context';
import Button from 'react-bootstrap/Button';
import SideBar from '../components/Profile/SideBar';
import './Profile.css';
import ListingSec from '../components/Profile/ListingSec';
import BookingSec from '../components/Profile/BookingSec';
import ReviewSec from '../components/Profile/ReviewSec';
import AnalyzeSec from '../components/Profile/AnalyzeSec';
import PastBooking from '../components/Profile/PastBooking';
import GuestBooking from '../components/Profile/GuestBooking';
import SaveListing from '../components/Profile/SaveListing';


const Profile = () => {
  //use authContext to grab id
  const auth = useContext(AuthContext);
  //profile state
  const [profile,setProfile] = useState(null);
  //  console.log("🤓",auth.userId)
  // Active State
  const [activeState,setActiveState] = useState('booking')
  const handleSectionChange = (section) =>{
    setActiveState(section)
  }
 
  useEffect(() => {

      if(auth.userId){
        
        const profileFetch = async() =>{
          try{
              const options = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              };

              const responseData = await fetch(
                `https://airbnb-main.onrender.com/user/${auth.userId}`, options
              );
              
              // const responseData = await fetch(
              //   `http://localhost:4000/user/${auth.userId}`, options
              // );
            
              const profileData = await responseData.json();
              setProfile(profileData);
              //console.log(profileData);
            
          } catch (error) {
            console.log(error);
          }
        }
        profileFetch();
      }
    }, [auth.userId])
 

 

  return (
    <div className='dashboard'>
  
        <>{profile? (
               <div className='SideBar'>
               <SideBar profile = {profile}/>
             </div>
        ): (
          <div className='SideBar'>
            <p>Loading</p>
          </div>
        )}
         {profile? (
                   <div className='ButtonBar'>
                   <div className = 'button-container'>
                   <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('booking')}>
                   Future Booking
                     </Button>
                     <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('pastbooking')}>
                   Past Booking
                     </Button>
                     <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('review')}>
                   Review
                     </Button>
                     {profile.listing.length > 0 ? (   
                       <>    
                        <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('listing')}>
                   Property
                   </Button>
                   <Button  style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('guestbooking')}>
                   Guest Booking
                     </Button>
                     <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('analyze')}>
                   Income
                     </Button>
                     </> 
                     ): (
                     ""
                     )}
                        <Button style={{ border: '1px solid transparent' }} variant="outline-secondary" size="lg" onClick={() => handleSectionChange('save')}>
                   Save
                     </Button>

                   </div>
                 </div>
         ):(
          <div className='ButtonBar'>
            Loading
          </div>
         )}
 
            {profile ? (
             <div className='MainSection container-scroll'>
              {activeState === 'guestbooking' && <GuestBooking /> }
              {activeState === 'listing' && <ListingSec listing={profile.listing} />}
              {activeState === 'booking' && <BookingSec booking={profile.bookings}/>}
              {activeState === 'pastbooking' && <PastBooking booking={profile.bookings}/>}
              {activeState === 'review' && <ReviewSec review={profile.reviewsGiven}/>}
              {activeState === 'analyze' && <AnalyzeSec profile={profile}/>}
              {activeState === 'save' && <SaveListing listing={profile.savedListing}/>}
              </div>
            ):(
              <div className='MainSection'>
                <p>Loading</p>
              </div>
            ) }
     
       
        </>
   
    </div>
  );
}

export default Profile
