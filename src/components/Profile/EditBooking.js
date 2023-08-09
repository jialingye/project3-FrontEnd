import React, {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Profile.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditBooking = ({show,handleClose,bookingData}) => {
  // Edit Booking State
  const [startDate, setStartDate] = useState(new Date(bookingData.startDate.substr(0, 10)));
  const [endDate, setEndDate] = useState(new Date(bookingData.endDate.substr(0, 10)));
  const [getPrice, setGetPrice] = useState(null);
  const [listingBookedDates, setBookedDates]= useState(null);


  //get price from the property
  const url = `https://airbnb-main.onrender.com/listing/${bookingData.listing}`;
  
  useEffect(() => {
    const fetchThisProperty = async () => {
      // console.log("going to fetch property with id of: ", id);
      try {
        const responseData = await fetch(url);
        const thisPropertyData = await responseData.json();
        console.log(thisPropertyData, thisPropertyData.property.price, "get priceeeee")
        setGetPrice(thisPropertyData.property.price)
        setBookedDates(thisPropertyData.property.bookings)
        // console.log("📍", thisPropertyData.property.bookings)
        // console.log("📅",listingBookedDates)
      } catch (error) {
        console.log(error)
      }
    };
    fetchThisProperty();
    
  }, [url])
  
  //date picker

  const BookingDatePicker = () =>{

    const bookedDates = listingBookedDates?.map((info)=>(
      {start: new Date(info.startDate), end: new Date(info.endDate)}
      )) || [];

    const excludeDates = bookedDates.reduce((dates, range) => {
      const {start, end} = range;
      const currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate()+1);
      }
      return dates;
    }, []);
  
  //datepicker onchange

  const onChange = (dates)=>{
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }

  
  return (
    <DatePicker
     selected = {startDate}
     onChange={onChange}
     startDate = {startDate}
     endDate = {endDate}
     excludeDates={excludeDates}
     selectsRange
     selectsDisabledDaysInRange
     inline
     />
  )
}
  //onChange handler
  const onChangeHandler = (e, setValue) => {
    //console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  }; 

  // onSubmit
  const onSubmitHandler = async (e) => {
		e.preventDefault();
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
		const serviceFee = parseFloat((getPrice * days * 0.04).toFixed(2));
	  const tax = parseFloat((getPrice * days * 0.06).toFixed(2));
		const finalTotalPrice = parseFloat((getPrice * days + serviceFee + tax).toFixed(2));

    // Perform booking submission logic here
    const updatedBooking = {
      guest: bookingData.guest,
      listing: bookingData.listing,
			startDate: startDate,
			endDate: endDate,
      address: bookingData.address,
      image: bookingData.image,
      city: bookingData.city,
      listing: bookingData.listing,
			totalPrice: finalTotalPrice
    }
    console.log("updated booking",updatedBooking)
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking)
    }
    const responseData = await fetch(`https://airbnb-main.onrender.com/booking/${bookingData._id}` , options)
    const updatedBookingObj = await responseData.json()
    console.log(updatedBookingObj)
    handleClose();
    window.location.reload();
  }  //-------------onSubmit end

  //--------onDeleteHandler
  const onDeleteHandler = async (event) => {
    event.preventDefault();
    console.log("Delete review with ", bookingData._id)

    const options = {
      method: "DELETE",
    };

    const responseData = await fetch(`https://airbnb-main.onrender.com/booking/${bookingData._id}`, options);

    const response = await responseData.json();
    console.log(response);
    window.location.reload();
  };


  const start = new Date(startDate);
	const end = new Date(endDate);
	const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
	const serviceFee = parseFloat((getPrice * days * 0.04).toFixed(2));
	const tax = parseFloat((getPrice * days * 0.06).toFixed(2));
	const finalTotalPrice = parseFloat((getPrice * days + serviceFee + tax).toFixed(2));

  return (
    <div>
      <Modal show={show} onHide={handleClose} className='modal-background'>

        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title>Update Booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit ={onSubmitHandler}>

            <Form.Group style={{textAlign: "center"}}className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Reschedule</Form.Label>
              <BookingDatePicker />
              {/* <Form.Control
                type="date"
                autoFocus
                value = {startDate}
                onChange ={(e) => onChangeHandler(e,setStartDate)}
              /> */}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                value = {endDate}
                onChange ={(e) => onChangeHandler(e,setEndDate)}
              />
            </Form.Group> */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className='display-fee-update'>
              <Form.Label>Booking Fee: $ {getPrice} x {days} nights = $ {getPrice*days}</Form.Label>
              <Form.Label>Service Fee: $ {serviceFee}</Form.Label>
              <Form.Label>Tax: $ {tax} </Form.Label>
              <Form.Label style={{ borderTop:'1px solid lightgrey' }}>New Total: $ {finalTotalPrice} </Form.Label>
              </div>
            </div>
            <Button variant="warning" size="lg" type='submit'>Update Booking</Button>

            <Button variant="danger" size="lg" type='submit' onClick ={onDeleteHandler}>Cancel Booking</Button>  

          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>

      </Modal>
    </div>
  )
}

export default EditBooking