import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'


export default function ParkDetails(props) {

    const {parksInfo} = props
    const { name , id } = useParams()

    const foundActivities = parksInfo[id]
    

    return(
        <>
        <div className='container'>
        <h2>{parksInfo[id]?.fullName}</h2>
        <div className="parkContainer" key={parksInfo[id]?.id}>
          <button onClick={() => props.handleAddDestinationClick(parksInfo[id])}>AddDestinations</button>
              <div>
                <img src={parksInfo[id]?.images[0].url} className="parkImage" alt={parksInfo[id]?.fullName} />
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