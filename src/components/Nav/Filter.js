import React, { useState } from 'react'
import './Filter.css'
import { Button, Col, Form, Modal } from 'react-bootstrap';

function Filter({show,handleClose,filterData}) {
    const [price, setPrice] = useState(null);
    const [bedroomNumber, setBedroomNumber] = useState(null);
    const [bedNumber, setBedNumber] = useState(null);
    const [bathroomNumber, setBathroomNumber] = useState(null);
    const [amenities, setAmenities] = useState([]);
  
    const onChangeHandler = (e, setValue) => {
        //console.log(e.target.value);
        setValue(e.target.value);
    };
    const handleAmenitiesChange = (e) => {
        const {value, checked} = e.target;
        if(checked) {
          setAmenities((prevAmenities) => [...prevAmenities, value]);
        } else {
          setAmenities((prevAmenities) => prevAmenities.filter((amenity) => amenity !== value))
        }
      }
  
    const queryBuilder = async() => {
      const queryObject = {
        price,
        bedroomNumber,
        bedNumber,
        bathroomNumber,
        amenities
    };
  
    let queryArr = []
    for (let key in queryObject){
        if(key === "amenities" ) {
            if(queryObject[key].length > 0) {
                //console.log(key)
                queryArr.push(`${key}=${queryObject[key]}`)
            }
        } else if(queryObject[key] !== null ) {
            //console.log(key)
            queryArr.push(`${key}=${queryObject[key]}`)
        }
    }
  
    //console.log(queryArr);
    const queryString = queryArr.join("&")
    //console.log(`http://localhost:4000/listing/?${queryString}`)
    const listings = await fetch(`http://localhost:4000/listing/?${queryString}`);
    //console.log(listings);
    const data = await listings.json();
    //console.log(data);
    filterData(data);
};
    const clearFilter = () => {
      window.location.reload();
    };
  
    return (
        <>
        <Modal show={show} onHide={handleClose} className='modal-background'>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' autoFocus value={price || ''} onChange={(e) => onChangeHandler(e, setPrice)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control type='number' autoFocus value={bedroomNumber || ''} onChange={(e) => onChangeHandler(e, setBedroomNumber)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                <Form.Label>Beds</Form.Label>
                <Form.Control type='number' autoFocus value={bedNumber || ''} onChange={(e) => onChangeHandler(e, setBedNumber)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput4'>
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control type='number' autoFocus value={bathroomNumber || ''} onChange={(e) => onChangeHandler(e, setBathroomNumber)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Amenities</Form.Label>
                
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
                    
            </Form.Group>
            <Button variant='warning' size='lg' onClick={() => { queryBuilder(); handleClose(); }}>
                Apply
            </Button>
            <Button variant='secondary' size='lg' onClick={() =>{clearFilter(); handleClose();}}>
                Clear
            </Button>
            </Form>
          </Modal.Body>
  
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    )
  }   
export default Filter