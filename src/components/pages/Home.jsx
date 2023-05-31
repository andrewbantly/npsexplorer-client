import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import debounce from 'lodash.debounce'
import axios from "axios"

import activities from "../../activites";
import usStateCodes from "../../usStatesArray";


export default function Home(props) {
  const [message, setMessage] = useState('');
  const [hideCarousel, setHideCarousel] = useState(false)
  const { parksInfo, 
          handleAddDestinationClick,
          userDestinations,
          setUserDestinations,
          removeDestination,
          currentUser 
        } = props;

//   const [foundParks, setFoundParks] = useState([]);
  const [displayedParks, setDisplayedParks] = useState([]);
  const navigate = useNavigate();
  

useEffect(() => {
    if (!parksInfo || parksInfo.length === 0) return;
    // creates a random array from parks info with a max length of 24
    const generateRandomParks = () => {
      return Array.from({ length: 25 }, () => {
        const random = Math.floor(Math.random() * 469);
        return { park: parksInfo[random], originalIndex: random };
      });
    };
  
    setDisplayedParks(generateRandomParks());
  
    // we use parks info array here to have use effect run only once on load. the reason why parksInfo is in there is because incase the state is not ready we can load something
  }, [parksInfo]);



  //this piece watches for the user input on the form, and searches the state for parks related to the search, when it finds the stores the park into acc along with its original index 

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.value;
    const searchPark = parksInfo.reduce((acc, park, index) => {
      if (park.fullName.toLowerCase().includes(input.toLowerCase())) {
        acc.push({ park, originalIndex: index });
      }
      return acc;
    }, []);
    // setFoundParks(searchPark);
    setDisplayedParks(searchPark);
    console.log(currentUser) // Updated this line
  };
  
  const debouncedHandleSearch = debounce(handleSearch, 400);
  // when the usewr clicks the search button this sends the user to the search results page along with an object that we use to reference and render a response. to use this on the next page we need to install the useLocation hook. Note state IS NOT taco

const handleActivity = (activityName) => {
    // Filter the parks that have the specified activity
    const searchPark = parksInfo
      .map((park, index) => ({ park, originalIndex: index })) // Add originalIndex here
      .filter(({ park }) => {
        // Check if the park has the activity in its activities array
        return park.activities.some((activity) =>
          activity.name.toLowerCase().includes(activityName.toLowerCase())
        );
      });
  
    // Update the displayed parks with the filtered parks
    setDisplayedParks(searchPark);
  };



  const handleLocation = (stateCode) => {
    console.log("handleLocation called with stateCode:", stateCode);
    // Filter the parks that have the specified state code
    const searchPark = parksInfo
      .map((park, index) => ({ park, originalIndex: index })) // Add originalIndex here
      .filter(({ park }) => {
        // Check if the park has the state code in its addresses array
        return park.addresses.some((address) =>
          address.stateCode.toLowerCase() === stateCode.toLowerCase()
        );
      });
  
    // Update the displayed parks with the filtered parks
    setDisplayedParks(searchPark);
  };


  const debouncedHandleLocation = debounce(handleLocation, 400);
  const debouncedHandleActivity = debounce(handleActivity, 400);


    const compareId = (parkId) => {
        return userDestinations.find((id) => id === parkId)
    }
  

    // this is a functino to check if the user is on or not
    const checkLoginStatusAndRedirect = () => {
        console.log(currentUser)
        if (currentUser === null) {
          navigate('/users/login')
          return
        }
      }

    const renderDisplayedParks = () => {
        if (!parksInfo || parksInfo.length === 0) {
            return <div>Loading...</div>;
          }
        if (displayedParks.length === 0) {
            return <p>No parks found matching your search criteria.</p>;
          }
        return displayedParks.map(({ park, originalIndex }) => (
            <div className="parkContainer"
              style={{
              backgroundImage: `url(${park?.images[0]?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
             }}>
              <div>
            {(!compareId(park.id))?  
              <button
              onClick={() => {
                checkLoginStatusAndRedirect();
                if (currentUser) {
                    handleAddDestinationClick(park);
                }
              }}
              className="tileAddDestination"
            >
            </button> :
              <button 
              onClick={() => removeDestination(park.id)} className="tileRemoveDestination">         
              </button>}
              </div>
              <Link 
            to={`/parks/${park?.fullName}/${originalIndex}`} 
            key={`${park?.id}-${originalIndex}`} 
            className='parkLink'></Link>
              {/* <div className="tapBox"> */}
              <div className="parkText">
                <p className='parkName'>{park?.fullName}</p>
                <p className='parkLocation'>
                  {park?.addresses[0]?.city}, {park?.addresses[0]?.stateCode}
                </p>
              </div>
              {/* </div> */}
            </div>
        ));
      };

    
      const usState = usStateCodes.map((code, i) => {
        return (
          <div className="activityIcon" key={'code' + i}>
            <button
              onClick={() => debouncedHandleLocation(`${code}`)}
              disabled={!parksInfo || parksInfo.length === 0}
              className='stateButton'
            >
              {code}
            </button>
          </div>
        );
      });

      const listActivities = activities.map((act, i) => {
        return (
          <div className="activityIcon" key={'act' + i}>
            <button
              onClick={() => debouncedHandleActivity(`${act.key}`)}
              disabled={!parksInfo || parksInfo.length === 0}
              className='activityButton'
            >
              <img src={act.img} />
            </button>
            <p className='activityText'>{act.icon}</p>
          </div>
        );
      });
  
      

      const responsiveStates = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 20,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 10,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 5,
          slidesToSlide: 3 // optional, default to 1.
        }
      };



      return (
        <div className="container">
          {/* Carousel for states */}
          <div className="searchBar">
          <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="searchInput"
                id="name"
                placeholder="Search for a park by name"
                onChange={debouncedHandleSearch}
              />
            </form>
            <button onClick={() =>!hideCarousel ? setHideCarousel(!hideCarousel): setHideCarousel(!hideCarousel)} className='hideSorting'>{!hideCarousel ? "Sort by state or activity" : "Hide Filter"}</button>
            {!hideCarousel?  <></> :
            <div className='carouselHead'>
            <div>  
            <Carousel
              responsive={responsiveStates}
              centerMode={true}
              arrows={true}
              containerClass="carousel"
              infinite={true}
              swipeable={true}
              removeArrowOnDeviceType="mobile"
              >
              {usState}
            </Carousel>
            </div>
          {/* Carousel for activities */}
          <div>
            <Carousel
              responsive={responsiveStates}
              centerMode={true}
              arrows={true}
              containerClass="carousel"
              infinite={true}
              swipeable={true}
              removeArrowOnDeviceType='mobile'
              >
              {listActivities}
            </Carousel>
          </div>
          </div> }
        </div>
        <div className="parkBox">
          {renderDisplayedParks()}
        </div>  
        </div>
      );
    }