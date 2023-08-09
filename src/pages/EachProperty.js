import React, { useEffect, useState, useContext } from 'react'
import './EachProperty.css'
import { useParams } from 'react-router-dom'
import Map from '../components/Listing/Map'
import Booking from '../components/Listing/Booking'
import BookingCalendar from '../components/Listing/BookingCalendar'
import Review from '../components/Listing/Review';
import HostInfo from '../components/Listing/HostInfo'
import { AuthContext } from '../context/auth-context'


const EachProperty = (property) => {
  //authentication
  const auth = useContext(AuthContext);
  
  const [errorMessage, setErrorMessage]=useState('');
  const [eachPropertyState, setEachPropertyState] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const likeIcon = '\u2665';
  const outlineLikeIcon = '\u2661'
  //console.log(eachPropertyState,"each property state")

  const { id } = useParams();
  // console.log(id)
  // console.log(useParams())
  //const url = `http://localhost:4000/listing/${id}`;
  const url = `https://airbnb-main.onrender.com/listing/${id}`;

  useEffect(() => {
    const fetchEachProperty = async () => {
      // console.log("going to fetch property with id of: ", id);
      try {
        const responseData = await fetch(url);
        // console.log("fetching checking start")
        // console.log(responseData)
        // console.log("fetching checking end")
        const eachPropertyData = await responseData.json();
        //console.log(eachPropertyData);
        setEachPropertyState(eachPropertyData);

        const checkListingSaved = async () => {
          try {
              if(!auth.userId){
                return;
              }
              const options = {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${auth.token}`
                },
              }
              const response = await fetch(`https://airbnb-main.onrender.com/listing/${id}/save`, options)
              //const response = await fetch(`http://localhost:4000/listing/${id}/save`, options)
              const {isSaved} = await response.json();
              //console.log("Response status:", response.status);
              //console.log("Response body:", isSaved);
              if(response.ok){
                setIsSaved(isSaved);
              }
            } catch (error) {
              console.log(error)
            }
     }  
     checkListingSaved()
     } catch (error) {
      console.log(error)
    }
  }

    fetchEachProperty();
      
  }, [id, url]);

  useEffect(() => {

        const checkListingSaved = async () => {
          try {
              if(!auth.userId){
                return;
              }
              const options = {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${auth.token}`
                },
              }
              const response = await fetch(`https://airbnb-main.onrender.com/listing/${id}/save`, options)
              //const response = await fetch(`http://localhost:4000/listing/${id}/save`, options)
              //console.log(response)
              const {isSaved} = await response.json();
              //console.log("Response status:", response.status);
              //console.log("Response body:", isSaved);
              if(response.ok){
                setIsSaved(isSaved);
              }
            } catch (error) {
              console.log(error)
            }
     }  
     checkListingSaved()
  
  }, [auth.token, auth.userId, id]);

  const solidStar = '\u2605';
  const handleSaveListing = async()=>{
    //console.log("📍token",auth.token,"📌id", auth.userId)
    try{
      if(!auth.token || !auth.userId){
        setErrorMessage("Please sign in to save the listing");
        return;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
       };
      const response = await fetch(`https://airbnb-main.onrender.com/listing/${id}/save`, options)
      //const response = await fetch(`http://localhost:4000/listing/${id}/save`, options)
      // console.log("Response status:", response.status);
      // console.log("Response body:", await response.json());
      if(response.ok){
        setIsSaved(true);
      }
    } catch (error){
      console.log(error)
    }
  }

  const deleteSaveListing = async()=>{
    
    try{
      if(!auth.token || !auth.userId){
        setErrorMessage("Please sign in to save the listing");
        return;
      }
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
       };
       //const response = await fetch(`http://localhost:4000/listing/${id}/save`, options)
       const response = await fetch(`https://airbnb-main.onrender.com/listing/${id}/save`, options)
      if(response.ok){
        setIsSaved(false);
      }
    } catch (error){
      console.log(error)
    }
  }

  return (
    <main className='propertyMain'>
      {eachPropertyState ? (
        <>
          <div className='eachProperty'>
            <h2 className='eachPropertyTitle'>{eachPropertyState.property.title}</h2>

            <div className='secRow'>
              <div>
                <span className='RatingAndLocation'>{solidStar}Rating: {eachPropertyState.property.rating.toFixed(2)}</span>
                <span className='RatingAndLocation'>{eachPropertyState.property.city}, {eachPropertyState.property.country}</span>
              </div>
              <div className='secRowLike'>
                {errorMessage && <p>{errorMessage}</p>}
                <input 
                    type='submit'
                    onClick={isSaved ? deleteSaveListing : handleSaveListing}
                    value={isSaved ? likeIcon : outlineLikeIcon}
                    className='saveButton'
                  />
              </div>
            </div>

            <div className='proertyImgRow'>
              {/* {eachPropertyState.property.images.map((image, index) => (
                <img
                  key={index}
                  className="eachProperty-pic"
                  src={image}
                  alt="property pic"
                />
              ))} */}
              <div className='propertyImgColMain'><img className="eachProperty-imgMain" src={eachPropertyState.property.images[0]} alt="property pic"/></div>
              <div className='propertyImgCol'>
                <img className="eachProperty-imgs1" src={eachPropertyState.property.images[1]} alt="property pic"/>
                <img className="eachProperty-imgs2" src={eachPropertyState.property.images[2]} alt="property pic"/>
                <img className="eachProperty-imgs3" src={eachPropertyState.property.images[3]} alt="property pic"/>
                <img className="eachProperty-imgs3" src={eachPropertyState.property.images[4]} alt="property pic"/>
              </div>
            </div>

            <div className='propertyInfoAndBooking'>

              <div className='propertyInfo'>

                <div>
                  <div className='propertyHost'>Entire home hosted by {eachPropertyState.property.host.username}</div>
                  <div className='propertyRooms'>{eachPropertyState.property.guestNumber} guests · {eachPropertyState.property.bedroomNumber} bedrooms · {eachPropertyState.property.bedNumber} beds · {eachPropertyState.property.bathroomNumber} bathrooms
                  </div>
                </div>
                <hr/>
                <div>
                  <div className='propertyOffers'>What this place offers</div>
                  <div className='propertyOffersList'>{eachPropertyState.property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                  </div>
                </div>
                <hr/>

                <div className='calendar'>
                      <BookingCalendar bookings={eachPropertyState.property.bookings} />
                </div>
              </div>

              <div className='bookingComponent'><Booking property={eachPropertyState} /></div>

            </div>
            <hr/>
            <div><Review reviews={eachPropertyState.property.reviews} rating={eachPropertyState.property.rating} /></div>
            <hr/>
            <div className='map'>
              <div className='mapTitle'>Where you'll be</div>
              <div><Map center={eachPropertyState.property.location} zoom={14} /></div>
            </div>
            <hr/>
            <div>
              <div className='hostTitle'>Hosted by {eachPropertyState.property.host.username} </div>
              <HostInfo host={eachPropertyState.property.host} />
            </div>

          </div>
        </>
      ) : (
        "...loading"
      )}
    </main>
  )
}

export default EachProperty;