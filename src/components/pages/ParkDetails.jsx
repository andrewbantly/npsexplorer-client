import { useParams, useNavigate } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ParkDetails(props) {
  const { parksInfo, 
          currentUser,
          removeDestination,
          userDestinations } = props
  const { name, id } = useParams()
  const navigate = useNavigate()

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
        <div className='infoContainer'>
        <div className='detailsHeader'>
        <div className='detailName'>   
        <h2>{parksInfo[id]?.fullName}</h2>
        <p>
            {parksInfo[id]?.addresses[0]?.city}, {parksInfo[id]?.addresses[0]?.stateCode}
        </p>
        </div>
        <div className='selectorBox'>
          {(!compareId(parksInfo[id]?.id))? 
          <button onClick={() => {checkLoginStatusAndRedirect()
          if(currentUser) {props.handleAddDestinationClick(parksInfo[id])}
          }} className="tileAddDestination"></button> :
          <button 
              onClick={() => removeDestination(parksInfo[id].id)} className="tileRemoveDestination">         
              </button>}
          <button onClick={() => {checkLoginStatusAndRedirect()
          if(currentUser) {props.handleAddExperienceClick(parksInfo[id])}
          }}className="tileAddExperience"></button>
          </div>
        </div>  
        <div className="parkDetails" key={parksInfo[id]?.id}>
          <div>
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
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[0].url} className="carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[1].url} className="carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[2].url} className="carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            </Carousel>
          </div>
          <div className="parkDetailText">
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