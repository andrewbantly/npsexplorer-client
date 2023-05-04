import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'


export default function ParkDetails() {

    const [parksInfo, setParksInfo] = useState([])
    const { name , id } = useParams()

    //  Pings the api and stores the response data in the parksInfo State
    useEffect(() =>{
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API_KEY}`)
        .then(response => {
            console.log(response.data)
            setParksInfo(response.data.data)
        })
    },[])

    const foundActivities = parksInfo[id]
    

    return(
        <>
        <div className='container'>
        <h2>{parksInfo[id]?.fullName}</h2>
        <div className="parkContainer" key={parksInfo[id]?.id}>
              <div>
                <img src={parksInfo[id]?.images[0].url} className="parkImage" alt={parksInfo[id]?.fullName} />
              </div>
              <div className="parkText">
                <p>{parksInfo[id]?.description}</p>
              </div>
            </div>
        </div>
        </>
    )
}