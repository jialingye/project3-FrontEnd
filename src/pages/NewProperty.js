import React, {useContext, useState} from 'react';
import { Col, Container , Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Autocomplete from '../components/NewListing/Autocomplete';
import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';



const NewProperty = () => {
  const [titleState, setTitleState] = useState("");
  const [priceState, setPriceState] = useState("");
  const [propertyState, setPropertyState] = useState("");
  const [amenitiesState, setAmenitiesState] = useState([]);
  const [privacyState, setPrivacyState] = useState("");
  const [guestState, setGuestState] = useState("");
  const [roomState, setRoomState] = useState("");
  const [bedState, setBedState] = useState("");
  const [bathroomState, setBathroomState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [imgState, setImgState] = useState(['','','','','']);
  const navigate = useNavigate();
  //authentication
  const auth = useContext(AuthContext);

  //states handler
  const onChangeHandler = (e,setValue) => {
    setValue(e.target.value);
  }

  const handleAmenitiesChange = (e) => {
    const {value, checked} = e.target;
    if(checked) {
      setAmenitiesState((prevAmenities) => [...prevAmenities, value]);
    } else {
      setAmenitiesState((prevAmenities) => prevAmenities.filter((amenity) => amenity !== value))
    }
  }
  const handleImgChange = (e, index) => {
    const newImgUrls = [...imgState];
    newImgUrls[index] = e.target.value;
    setImgState(newImgUrls);
  }
 
  const handleSubmit = async (event) => {
      event.preventDefault();
      const newListing = {
        host: auth.userId,
        title: titleState,
        images: imgState.filter((url)=>url.trim()!==""),
        types: propertyState,
        price: priceState,
        share: privacyState,
        amenities: amenitiesState,
        address: addressState,
        guestNumber: guestState,
        bedroomNumber: roomState,
        bedNumber: bedState,
        bathroomNumber: bathroomState,
      }
     //console.log('new listing',newListing);
     
    try{   
     const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
     };

     const responseData = await fetch(
      "http://localhost:4000/listing", options
      )
   
      // const responseData = await fetch(
      //   "https://airbnb-jade.onrender.com/listing/", options
      //   )

        const newListingObj = await responseData.json();
        console.log(newListingObj)
 
      
  
      navigate('/')
    } catch (error){
      console.log(error)
     }
 
  };

  return (
    <Container >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label> Title</Form.Label>
          <Form.Control 
            type="text" 
            value ={titleState} 
            placeholder="Amazing Tower View Apartment" 
            onChange={(e) => onChangeHandler(e, setTitleState)}
            required
            style ={{marginTop:'70px'}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Address</Form.Label>
          <Autocomplete setAddress={setAddressState} address={addressState} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price Per Night</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="$" 
            value ={priceState} 
            onChange={(e) => onChangeHandler(e, setPriceState)}
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Property Type</Form.Label>
          <Form.Control 
            as="select" 
            defaultValue="Apartment"
            value ={propertyState}
            onChange={(e) => onChangeHandler(e, setPropertyState)}
            required>
             <option value="">Choose an option</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Camper">Camper</option>
            <option value="Wedding">Wedding Vendor</option>
            <option value="Treehouse">Treehouse</option>
            <option value="Cabin">Cabin</option>
            <option value="Castle">Castle</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Amenities</Form.Label>
          <Row>
            <Col className="checkbox" >
            <Form.Check type="checkbox" value="WiFi" label="WiFi" onChange={handleAmenitiesChange} />
            </Col>
            <Col className="checkbox" >
            <Form.Check type="checkbox" value="Free-parking" label="Free Parking" onChange={handleAmenitiesChange}/>
            </Col>
            <Col className="checkbox" >
            <Form.Check type="checkbox" value="Paid-parking" label="Paid Parking" onChange={handleAmenitiesChange}/>
            </Col>
            <Col className="checkbox" >
            <Form.Check type="checkbox" value="Kitchen" label="Kitchen" onChange={handleAmenitiesChange}/>
            </Col>
            <Col className="checkbox" >
              <Form.Check type="checkbox" value="Pool" label="Pool" onChange={handleAmenitiesChange}/>
            </Col>
            <Col className="checkbox" >
            <Form.Check type="checkbox" value="TV" label="TV" onChange={handleAmenitiesChange}/>
            </Col>
          </Row>
          <Row>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Laundry" label="Laundry" onChange={handleAmenitiesChange}/>
          </Col>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Air-conditioning" label="Air Conditioning" onChange={handleAmenitiesChange}/>
          </Col>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Work-space" label="Work-Space" onChange={handleAmenitiesChange}/>
          </Col>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Patio" label="Patio" onChange={handleAmenitiesChange}/>
          </Col>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Grill" label="Grill" onChange={handleAmenitiesChange}/>
          </Col>
          <Col className="checkbox" >
          <Form.Check type="checkbox" value="Gym" label="Gym" onChange={handleAmenitiesChange}/>
          </Col>
          </Row>
          
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Privacy</Form.Label>
          <Form.Control 
            as="select" 
            defaultValue="single-room"
            value ={privacyState}
            onChange={(e) => onChangeHandler(e, setPrivacyState)}
            required
            >
            <option value="">Choose an option</option>
            <option value="entire-house">Entire Place</option>
            <option value="single-room">Private Room with Ensuite Bathroom</option>
            <option value="share-room">Private Room and Shared Bathroom</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Guest Number</Form.Label>
          <Form.Control 
          type="number"
          min = "1"
          value ={guestState}
          onChange={(e) => onChangeHandler(e, setGuestState)}
          required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Room Number</Form.Label>
          <Form.Control 
          type="number" 
          min = "0"
          value ={roomState}
          onChange={(e) => onChangeHandler(e, setRoomState)}
          required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Bed Number</Form.Label>
          <Form.Control 
          type="number" 
          min = "1"
          value ={bedState}
          onChange={(e) => onChangeHandler(e, setBedState)} 
          required/>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicCheckbox">
          <Form.Label>Bathroom Number</Form.Label>
          <Form.Control 
          type="number" 
          min = "0"
          value ={bathroomState}
          onChange={(e) => onChangeHandler(e, setBathroomState)} 
          required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Images</Form.Label>
          <Form.Control type="text" placeholder="url" value ={imgState[0]} onChange={(e) => handleImgChange(e, 0)} />
          <Form.Control type="text" placeholder="url" value ={imgState[1]} onChange={(e) => handleImgChange(e, 1)} />
          <Form.Control type="text" placeholder="url" value ={imgState[2]} onChange={(e) => handleImgChange(e, 2)} />
          <Form.Control type="text" placeholder="url" value ={imgState[3]} onChange={(e) => handleImgChange(e, 3)} />
          <Form.Control type="text" placeholder="url" value ={imgState[4]} onChange={(e) => handleImgChange(e, 4)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create A Property
        </Button>
      </Form>
    </Container>
    
  )
}

export default NewProperty;