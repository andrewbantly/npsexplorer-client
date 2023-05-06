import { useParams } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ParkDetails(props) {
  const { parksInfo } = props
  const { name, id } = useParams()

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
      <div className='container'>
        <h2>{parksInfo[id]?.fullName}</h2>
        <div className="parkContainer" key={parksInfo[id]?.id}>
          <button onClick={() => props.handleAddDestinationClick(parksInfo[id])}>AddDestinations</button>
          <button onClick={() => props.handleAddExperienceClick(parksInfo[id])}>AddExperience</button>
          <div>
            <Carousel
           responsive={responsive}
           centerMode={false}
           arrows={true}
           containerClass="carousel"
        //    className="park-details-carousel"
           autoPlay={true}
           infinite={true}
            >
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[0].url} className="parkImage carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[1].url} className="parkImage carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            <div className='imageCarousel'>
            <img src={parksInfo[id]?.images[2].url} className="parkImage carouselImage" alt={parksInfo[id]?.fullName} />
            </div>
            </Carousel>
          </div>
          <div className="parkText">
            <p>{parksInfo[id]?.description}</p>
            <p>{parksInfo[id]?.operatingHours[0]?.description}</p>
            <p>{parksInfo[id]?.entranceFees[0]?.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}