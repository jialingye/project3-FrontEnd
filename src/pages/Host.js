import React, {useState, useEffect} from 'react'
import './Host.css'
import { useParams } from 'react-router-dom'
import { Col, Container, Row, Figure, Button} from 'react-bootstrap'
import HostListing from '../components/Host/HostListing'
import ReviewGiven from '../components/Host/ReviewGiven'

		  
function Host() {
	 
	 const [userState, setUserState] = useState(null)
	
	 const {id} = useParams();
	 useEffect(() => {
		const fetchUserData = async () => {
	
		  try {

			//const responseData = await fetch(`http://localhost:4000/user/${id}`);
			const responseData = await fetch(`https://airbnb-main.onrender.com/user/${id}`);
	
			const userData = await responseData.json();

			setUserState(userData);
			//console.log("userData,userState",userData)
		  } catch (error) {
			console.log(error)
		  }
		};
		fetchUserData();

	 },[id])
	 const tick = '\u2714'
	 const solidStar = '\u2605';
	 let averageRating = 0;
	 let listings = []
	 if(userState && userState.listing && userState.listing.length > 0) {
		listings = userState.listing;
		const totalRating = listings.reduce((sum, listing)=> sum+listing.rating, 0);
		 averageRating = (totalRating/listings.length).toFixed(2);
	 }

    return (
	    <Container style={{marginTop:"20px"}}>
			{userState? (
				<Row >
				<Col  sm={4}>
				<Col  md={{ span: 10, offset: 1 }} style = {{margin: '20px', borderRadius: '2em', boxShadow: `0 0 5px rgba(0, 0, 0, 0.5)`}}>
					<Row>
						<Col sm={6}>
						<Figure>
							<Figure.Image
								width={150}
								height={180}
								alt="171x180"
								src= {userState.image}
								className='user-image'
							/>
							<h1 style={{marginLeft: '50px'}}>{userState.username}</h1>
						</Figure>
			

						</Col>
						<Col style={{marginTop:'40px'}} sm={6}>
					{listings.length > 0 ? (
						<Col style = {{borderBottom:'1px lightgrey solid'}} md={{ span: 10, offset: 1 }}>
							<h4>{solidStar}	{averageRating}</h4>
							<h6>Rating</h6>
						</Col>
					): (
						<Col style = {{borderBottom:'1px lightgrey solid'}} md={{ span: 10, offset: 1 }}>
							<h6>Guest</h6>
						</Col>
					)}
						
						<Col style={{marginTop: '20px', marginBottom: '20px'}} md={{ span: 10, offset: 1 }}>
								<h6>{userState.reviewsGiven.length} Reviews</h6>
						</Col>
						<Col style = {{borderTop:'1px lightgrey solid', padding:"10px"}} md={{ span: 10, offset: 1 }}>
							<h6>2 years on CasaAmor</h6>
						</Col>

					</Col>
					</Row>
				</Col>
			
					<Col style = {{margin: '20px', borderRadius: '2em', border:'1px lightgrey solid'}}  md={{ span: 10, offset: 1 }}>
						<div style={{display:'flex', flexDirection:'column'}} >
						<ul style = {{listStyleType: 'none', paddingLeft: 0}}>
							<li style={{ textAlign: 'left', margin:'15px', fontWeight: 'bold' }}>{userState.username}'s Confirmed Information</li>
							<li style={{ textAlign: 'left', margin:'15px'  }}>{tick} Identity</li>
							<li style={{ textAlign: 'left', margin:'15px' }}>{tick} Email address</li>
							<li style={{ textAlign: 'left', margin:'15px'  }}>{tick} Phone Number</li>
							</ul>
						</div>
					</Col>
					<Button variant="secondary">Send Message</Button>

				</Col>
				<Col sm={8}>
					<div style={{ borderTop: '1px lightgrey solid', margin: '20px'}}>
						<h4 style={{ textAlign: 'left'}}>
							{userState.username}'s Profile
							<Col style={{ marginTop: '20px'}}md={{ span: 12, offset: 0 }}>
								{userState.occupation? 
									(<h5>{userState.occupation}</h5>):("")}
								{userState.description? 
									(<h5>{userState.description}</h5>
									):(
										`${userState.username}'s interests, fun facts, and other highlights will show up here once they have added some.`)}
							</Col>
						</h4>
					</div>
					<div style={{ borderTop: '1px lightgrey solid', margin: '20px'}}>
						<div>
						<h4 style={{ textAlign: 'left', marginTop:'10px', marginBottom:'20px'}}>
							{userState.username}'s Reviews
							</h4>
							</div>
							<div>
							<ReviewGiven reviews = {userState.reviewsGiven}/>
							</div>
						
					</div>
					{userState.listing.length>0 ? (
						<div style={{ borderTop: '1px lightgrey solid', margin: '20px'}}>
						<h4 style={{ textAlign: 'left'}}>
							{userState.username}'s Listing 
						</h4>
							<div>
							<HostListing listing = {userState.listing} />
							</div>
						</div>
					): (" ")}
				</Col>
			</Row>	
			):(
			<p>Loading</p>
			)}
  
    </Container>
	)
}
		  
export default Host
