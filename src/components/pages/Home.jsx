import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        return parksInfo[random];
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
    setDisplayedParks(searchPark.map(({ park }) => park)); 
  };
  
  // when the usewr clicks the search button this sends the user to the search results page along with an object that we use to reference and render a response. to use this on the next page we need to install the useLocation hook. Note state IS NOT taco

//   const handleClick = () => {
//     if (foundParks.length > 0) {
//       navigate("/search/results", { state: { foundParks } });
//     }
//   };
    

const handleActivity = (activityName) => {
    // Filter the parks that have the specified activity
    const searchPark = parksInfo.filter((park) => {
      // Check if the park has the activity in its activities array
      return park.activities.some((activity) =>
        activity.name.toLowerCase().includes(activityName.toLowerCase())
      );
    });
  
    // Update the displayed parks with the filtered parks
    setDisplayedParks(searchPark);
  };

  const handleLocation = (stateCode) => {
    // Filter the parks that have the specified state code
    const searchPark = parksInfo.filter((park) => {
      // Check if the park has the state code in its addresses array
      return park.addresses.some((address) =>
        address.stateCode.toLowerCase() === stateCode.toLowerCase()
      );
    });
  
    // Update the displayed parks with the filtered parks
    setDisplayedParks(searchPark);
  };


    const renderDisplayedParks = () => {
        return displayedParks.map((park, index) => (
          <Link to={`/parks/${park?.fullName}/${index}`} key={`${park?.id}-${index}`}>
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
      
   


    return(
        <div className='container'>
        <div className='searchBar'>
        <form>
            <input
                id='name'
                placeholder='Search for park'
                // value={search}
                onChange={handleSearch}
            />
            {/* <button onClick={handleClick}>Search</button> leaving this here now in case we want it back*/}
            </form>
        </div>
        <button className="activityIcon" onClick={() => handleLocation('CA')}>
  <p>CA</p>
</button>
        <div className='activityBar'>
        <button className="activityIcon" onClick={() => handleActivity('Astronomy')}>
  <p>Astronomy</p>
</button>
            <div className="activityIcon">
                <p>Hiking</p>
            </div>
            <div className="activityIcon">
                <p>Swim</p>
            </div>
            <div className="activityIcon">
                <p>Ski</p>
            </div>
            <div className="activityIcon">
                <p>Camp</p>
            </div>
        </div>
        {renderDisplayedParks()} 
        </div>
    )
}