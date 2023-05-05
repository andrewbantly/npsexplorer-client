import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'



export default function Home(props){

    const {parksInfo} = props
    console.log(parksInfo)
    const [foundParks, setFoundParks] = useState([])
    const navigate = useNavigate()

    // creates a functional component
    const Park = () => {

        // maps the array into a new array with a length of 10
        const parkElements = Array.from({ length: 25 }, () => {
            // uses math.random to generate a random number between 0-49 everytime the function loops, then renders a tile with the random number as a index array number
          const random = Math.floor(Math.random() * 469);
          return (
            <Link to={`/parks/${parksInfo[random]?.fullName}/${random}`}><div className="parkContainer" key={parksInfo[random]?.id}>
              <div>
                <img src={parksInfo[random]?.images[0].url} className="parkImage" alt={parksInfo[random]?.fullName} />
              </div>
              <div className="parkText">
                {/* theres a bunch of ? conditionals this is so that it does not error out if the state has not loaded yet */}
                <h3>{parksInfo[random]?.fullName}</h3>
                <p>{parksInfo[random]?.addresses[0]?.city}, {parksInfo[random]?.addresses[0]?.stateCode}</p>
                <p>Activities: {parksInfo[random]?.activities[0]?.name}, {parksInfo[random]?.activities[1]?.name}, {parksInfo[random]?.activities[2]?.name}, {parksInfo[random]?.activities[3]?.name}, {parksInfo[random]?.activities[4]?.name}</p>
                <p>More Info...</p>
                
              </div>
            </div></Link>
          );
        });
      
            return <>{parkElements}</>;
        };
        

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
            setFoundParks(searchPark);
            console.log(foundParks);
          };

    // when the usewr clicks the search button this sends the user to the search results page along with an object that we use to reference and render a response. to use this on the next page we need to install the useLocation hook. Note state IS NOT taco
    const handleClick = () => {
        if (foundParks.length > 0) {
            // foundParks is object literal {foundParks : foundParks}
        navigate("/search/results", { state: { foundParks } });
        }
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
            <button onClick={handleClick}>Search</button>
            </form>
        </div>
        <div className='activityBar'>
            <div className="activityIcon">
                <p>Beach</p>
            </div>
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
        <Park />
        </div>
    )
}