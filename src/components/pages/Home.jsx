import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import activities from "../../activites";
import usStateCodes from "../../usStatesArray";

export default function Home(props) {
  const { parksInfo } = props;
//   const [foundParks, setFoundParks] = useState([]);
  const [displayedParks, setDisplayedParks] = useState([]);
//   const navigate = useNavigate();

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
    setDisplayedParks(searchPark); // Updated this line
  };
  
  
  // when the usewr clicks the search button this sends the user to the search results page along with an object that we use to reference and render a response. to use this on the next page we need to install the useLocation hook. Note state IS NOT taco

//   const handleClick = () => {
//     if (foundParks.length > 0) {
//       navigate("/search/results", { state: { foundParks } });
//     }
//   };
    

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


  
    const renderDisplayedParks = () => {
        if (displayedParks.length === 0) {
            return <p>No parks found matching your search criteria.</p>;
          }
        return displayedParks.map(({ park, originalIndex }) => (
            <Link to={`/parks/${park?.fullName}/${originalIndex}`} key={`${park?.id}-${originalIndex}`}>
              <div className="parkContainer">
              <div>
                <img
                  src={park?.images[0].url}
                  className="parkImage"
                  alt={park?.fullName}
                  />
              </div>
              <div className="parkText">
                <h3>{park?.fullName}</h3>
                <h3>{originalIndex}</h3>
                <p>
                  {park?.addresses[0]?.city}, {park?.addresses[0]?.stateCode}
                </p>
                <p>
                  Activities: {park?.activities[0]?.name},{" "}
                  {park?.activities[1]?.name}, {park?.activities[2]?.name},{" "}
                  {park?.activities[3]?.name}, {park?.activities[4]?.name}
                </p>
                <p>More Info...</p>
              </div>
            </div>
          </Link>
        ));
      };

    
      const usState = usStateCodes.map((code, i) => {
        return (
          <div className="activityIcon" key={'code' + i}>
            <button
              onClick={() => handleLocation(`${code}`)}
              disabled={!parksInfo || parksInfo.length === 0}
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
              onClick={() => handleActivity(`${act}`)}
              disabled={!parksInfo || parksInfo.length === 0}
            >
              {act}
            </button>
          </div>
        );
      });
  
      

      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 50,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
     
   


      return (
        <div className="container">
          {/* Carousel for states */}
          <div className="searchBar">
          <form>
              <input
                id="name"
                placeholder="Search for park"
                onChange={handleSearch}
              />
            </form>
            <Carousel
              responsive={responsive}
              centerMode={true}
              arrows={true}
              containerClass="carousel"
              >
              {usState}
            </Carousel>
    
          {/* Carousel for activities */}
          <div>
            <Carousel
              responsive={responsive}
              centerMode={true}
              arrows={true}
              containerClass="carousel"
              >
              {listActivities}
            </Carousel>
          </div>
                </div>
    
    
          {renderDisplayedParks()}
        </div>
      );
    }