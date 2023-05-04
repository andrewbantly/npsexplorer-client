import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function Home(){

    const [parksInfo, setParksInfo] = useState([])


    //  Pings the api and stores the response data in the parksInfo State
    useEffect(() =>{
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setParksInfo(response.data.data)
        })
    },[])


    // creates a functional component
    const Park = () => {

        // maps the array into a new array with a length of 10
        const parkElements = Array.from({ length: 10 }, () => {
            // uses math.random to generate a random number between 0-49 everytime the function loops, then renders a tile with the random number as a index array number
          const random = Math.floor(Math.random() * 50);
          return (
            <Link to={`/parks/${parksInfo[random]?.fullName}/${random}`}><div className="parkContainer" key={parksInfo[random]?.id}>
              <div>
                <img src={parksInfo[random]?.images[0].url} className="parkImage" alt={parksInfo[random]?.fullName} />
              </div>
              <div className="parkText">
                <h3>{parksInfo[random]?.fullName}</h3>
                <p>{parksInfo[random]?.addresses[0].city}, {parksInfo[random]?.addresses[0].stateCode}</p>
                <p>Activities: {parksInfo[random]?.activities[0]?.name}, {parksInfo[random]?.activities[1]?.name}, {parksInfo[random]?.activities[2]?.name}, {parksInfo[random]?.activities[3]?.name}, {parksInfo[random]?.activities[4]?.name}</p>
                <p>More Info...</p>
                
              </div>
            </div></Link>
          );
        });
      
        return <>{parkElements}</>;
      };
        
      
    

    return(
        <div className='container'>
        <div className='searchBar'>
            <form>
                <input id='name' placeholder='Search for park' ></input>
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