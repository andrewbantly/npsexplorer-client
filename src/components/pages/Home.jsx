import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function Home(){

    const [parksInfo, setParksInfo] = useState([])

    useEffect(() =>{
        axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${process.env.REACT_APP_NPS_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setParksInfo(response.data.data)
        })
    },[])


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
            <div className='parkContainer'>
                <div>
                    <img src={parksInfo[0]?.images[0].url} className='parkImage'/>
                </div>
                <div className='parkText'>
                    <h3>{parksInfo[0]?.fullName}</h3>
                    <p>{parksInfo[0]?.description}</p>
                </div>
            </div>
        </div>
    )
}