import React, {useState} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Profile.css';
import EditReview from './EditReview';

const ReviewSec = ({ review }) => {
  //console.log({review})
  const [editModalState,setEditModal] = useState(null)
  const handleEditModalClose = ()=>setEditModal(null);
  const handleEditModalOpen = (index)=>setEditModal(index);

  //display review from most recent date to oldest date
  const sortedReviews = review.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))

  const reviewsGiven = sortedReviews.map((info, index) => {

    const cleanNow = (info.cleanlinessRating/5)*100;
    const locationNow = (info.locationRating/5)*100;
    const serviceNow = (info.serviceRating/5)*100;
    const overallNow = (info.overallRating/5)*100;
    const createDate = new Date(info.createdAt).toLocaleDateString();
    return (
      <Card key={index} className='booking' style={{ borderRadius: '1em', width: '60%' }}>
        <NavLink style={{ color: 'black'}} to={`/listing/${info.listing}`}>
          <Card.Title as="h5" >Location Details</Card.Title>
        </NavLink>
        <Card.Body>
          <Row>
            <Col className='rating-bar'>
            <div className='rating-bar-content' >
              <Card.Text  style={{ margin: '0 auto' }} className='text-center'>Cleanliness</Card.Text>
              <div className='bar-num'>
              <ProgressBar variant="black" style={{ height: '5px' }} now={cleanNow} />
              <Card.Text>{info.cleanlinessRating}</Card.Text>
              </div>
            </div>
            </Col>
            <Col className='rating-bar'>
              <Card.Text style={{ margin: '0 auto' }}>Location</Card.Text>
              <div className='bar-num'>
              <ProgressBar variant="black" style={{ height: '5px' }} now={locationNow} />
              <Card.Text>{info.locationRating}</Card.Text>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='rating-bar'>
              <Card.Text style={{ margin: '0 auto' }}>Service</Card.Text>
              <div className='bar-num'>
              <ProgressBar variant="black" style={{ height: '5px' }} now={serviceNow} />
              <Card.Text>{info.serviceRating}</Card.Text>
              </div>
            </Col>
            <Col className='rating-bar'>
            <Card.Text style={{ margin: '0 auto' }}>Overall</Card.Text>
            <div className='bar-num'>
            <ProgressBar variant="black" style={{ height: '5px' }} now={overallNow} />
            <Card.Text>{info.overallRating}</Card.Text>
            </div>
       
            </Col>
          </Row>
          <Card.Text className='comment-section'>Comment: {info.comment}</Card.Text>
         
          <Button 
          variant="outline-secondary"
          show = {editModalState === index ? 'true':'false'}
          onClick = {() =>handleEditModalOpen(index)}
          >Edit or Delete</Button>
          {editModalState === index && (
              <EditReview 
              show = {true}
              handleClose = {handleEditModalClose}
              reviewData ={info}
              />
          )}
        </Card.Body>
        <p style={{ color: 'grey', fontSize: '10px' }}>Created at {createDate}</p>
      </Card>
    );
  });

  // No reviews
  if (!reviewsGiven || reviewsGiven.length === 0) {
    return <p>No Reviews Available</p>;
  }

  return <Row className="hostListing">{reviewsGiven}</Row>;
};

export default ReviewSec;
