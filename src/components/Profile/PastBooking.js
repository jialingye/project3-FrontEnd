import React, { useState } from 'react';
import { Card, Button, Row, Col, Figure } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import AddReview from './AddReview';

const PastBooking = ({booking}) => {
  const [AddModalState,setAddModal] = useState(null)
  const handleAddModalClose = ()=>setAddModal(null);
  const handleAddModalOpen = (index)=>setAddModal(index);

    const currentDate= new Date();
    const pastBooking = booking.filter(booking => {
      const bookingDate = new Date(booking.startDate);
      return bookingDate < currentDate;
    });

//console.log(pastBooking)
   
     const pbooking = pastBooking.map((info, index) => {
       const startDate = new Date(info.startDate).toLocaleDateString();
       const endDate = new Date(info.endDate).toLocaleDateString();
       const createDate = new Date(info.createdAt).toLocaleDateString()
       return (
        <Card key={index} style={{ borderRadius: '1em', width: '60%' }} className='booking'>
        <Card.Body>
        <Row>
          <Col >
          <Figure>
              <Figure.Image
                className='booking-image'
                width={250}
                height={400}
                alt="171x180"
                src={info.image}
              />
            </Figure>
          </Col>
          <Col className='booking-col'>
          <NavLink style={{ color: 'black'}} to={`/listing/${info.listing}`}>
        <Card.Title as="h5">{info.city}</Card.Title>
        </NavLink>
          <Card.Title> {startDate} to {endDate}</Card.Title>
           <Card.Text className='text-left'>
            {info.address}
           </Card.Text>
          <Card.Text>
          Total ${info.totalPrice} USD 
          </Card.Text>
          <Button 
          variant="outline-secondary"
          show = {AddModalState === index ? true : false}
          onClick={() => handleAddModalOpen(index)}
          >Add Review</Button>
          
          {AddModalState === index && 
          <AddReview
          show ={true}
          handleClose = {handleAddModalClose}
          bookingData = {info}/>
          }
          </Col>
          </Row>
        </Card.Body>
        <p style={{ color: 'grey', fontSize: '10px' }}>Created at {createDate}</p>
  </Card>
       )
   });
      // No booking
      if (!booking || booking.length === 0) {
       return <p>No Post Booking Available</p>;
     }
   
     return <Row className="hostListing">{pbooking}</Row>;
   };

export default PastBooking;