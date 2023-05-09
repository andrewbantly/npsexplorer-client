import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ParkDetails(props) {
  const { parksInfo, 
          currentUser,
          removeDestination,
          userDestinations } = props
  const { name, id } = useParams()
  const navigate = useNavigate()
  const [showText, setShowText] = useState(false);

  function NewScreen() {
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [])
  }

  NewScreen()

  const checkLoginStatusAndRedirect = () => {
    console.log(currentUser)
    if (currentUser === null) {
      navigate('/users/login')
      return
    }
  }

  const compareId = (parkId) => {
        return userDestinations.find((id) => id === parkId)
    }

  const activityNames = parksInfo[id]?.activities.map(activity => activity.name).join(', ')

  const handleClick = () => {
    checkLoginStatusAndRedirect();
    if (currentUser) {
      props.handleAddExperienceClick(parksInfo[id]);
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
      }, 3000);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <>
      <div className='parkDetailsContainer'>
        <div className='sizingBox'>
        <div className='detailsHeader'>
        <div className='detailName'>   
        <p className='parkTitle'>{parksInfo[id]?.fullName}</p>
        <p>
            {parksInfo[id]?.addresses[0]?.city}, {parksInfo[id]?.addresses[0]?.stateCode}
        </p>
        </div>
        <div className='carouselContainer'>  
            <Carousel
           responsive={responsive}
           centerMode={false}
           arrows={false}
           containerClass="detailCarousel"
        //    className="park-details-carousel"
           autoPlay={true}
           interval={6000}
           infinite={true}
           transitionDuration={1500}
            >
            <div className='carouselImageContainer' 
              style={{backgroundImage: `url(${parksInfo[id]?.images[0]?.url || 'https://ucarecdn.com/f8de35d1-470c-4e0d-a341-949fb45e1bbc/'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
            <div className='carouselImageContainer' 
              style={{backgroundImage: `url(${parksInfo[id]?.images[1]?.url || 'https://ucarecdn.com/f8de35d1-470c-4e0d-a341-949fb45e1bbc/'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
            <div className='carouselImageContainer' 
             style={{backgroundImage: `url(${parksInfo[id]?.images[2]?.url || 'https://ucarecdn.com/f8de35d1-470c-4e0d-a341-949fb45e1bbc/'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            </div>
            </Carousel>
          </div>
          </div>
          <div className='iconBox'>
          {!showText && (
          <div className='selectorBox'>
          {(!compareId(parksInfo[id]?.id))? 
          <button onClick={() => {checkLoginStatusAndRedirect()
          if(currentUser) {props.handleAddDestinationClick(parksInfo[id])}
          }} className="tileAddDestination"></button> :
          <button 
              onClick={() => removeDestination(parksInfo[id].id)} className="tileRemoveDestination">         
              </button>}
              {!showText && (
              <button onClick={handleClick} className="tileAddExperience">
          </button> )}
          </div>)}
          {showText && <p className='addedText'>An experience added to your profile</p>}
          </div>
          <div className="parkDetails" key={parksInfo[id]?.id}>
          <div className="parkDetailText">
            <h4>Activities:</h4>
            <p>{activityNames}</p>
            <h4>Description:</h4>
            <p>{parksInfo[id]?.description}</p>
            <p>{parksInfo[id]?.operatingHours[0]?.description}</p>
            <p>{parksInfo[id]?.entranceFees[0]?.description}</p>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}