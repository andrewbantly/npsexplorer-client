import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

const DestinationsPage = (props) => {
    const [message, setMessage] = useState('');
    const { parksInfo,
         userDestinations, 
         handleRemoveDestination, 
         handleAddExperienceClick,
         setUserDestinations} = props

//const removeDestination = async (destinationId, park) => { ... }: This line defines an asynchronous function called removeDestination. This function takes two arguments: destinationId (the ID of the destination to be removed) and park (an object containing the details of the park associated with the destination).

//Retrieve the JSON Web Token (JWT) from the browser's local storage.

//After successfully deleting the destination, the code sends another request to the server to fetch the updated list of user destinations using the axios.get method

//The updated list of destinations is then passed to the setUserDestinations function to update the state in the parent component.

    const removeDestination = async (destinationId, park) => {
        try {
            const token = localStorage.getItem('jwt');
            const options = {
                headers: {
                    'Authorization': token,
                },
            };
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations/${destinationId}`, options);

            const foundDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options)
            setUserDestinations(foundDestinations.data)

            // console.log(foundDestinations)

            setMessage(`${park.fullName} was removed from favorites`);
        } catch (error) {
            setMessage(`Error removing ${park.fullName} from favorites`);
        }
    };
    
    // the findParkById function takes destinationId as an argument, destionsIs is the Id of the park we want to find
    // the findIndex method is used on the parksInfo array. This method goes through each element "park" in the array and checks if the id of the park is equal to the destinationId. If it finds a match, it returns the index of that element "park" in the array. The result is stored in the parkIndex variable.
    //  The originalIndex property holds the value of parkIndex, which is the original index of the park in the parksInfo array.
    // returns this object containing the park and originalIndex properties.

    const findParkById = (destinationId) => {
        const parkIndex = parksInfo.findIndex((park) => park.id === destinationId);
        return {
            park: parksInfo[parkIndex],
            originalIndex: parkIndex
        };
    };
    
    //The userDestinations array is being mapped over, which means a new array is being created by transforming each destination
    // For each destination, the findParkById function is called it passes the destination as an argument. This returns an object containing the park and originalIndex properties
    // The returned object is then destructured using the syntax const { park, originalIndex } = findParkById(destination);. This means that the park and originalIndex properties are extracted from the returned object 

    const userDestinationsList = userDestinations.map((destination) => {
        const { park, originalIndex } = findParkById(destination);
        return (
            <div className='parkContainer'>
                <button
                    onClick={() => removeDestination(destination, park)}
                    className="removeButton"
                >
                    Remove from Destinations
                </button>
                <button
                    onClick={() => handleAddExperienceClick(park)}
                    className="experienceButton"
                >
                    Add to Experience
                </button>
                
                <Link to={`/parks/${park?.fullName}/${originalIndex}`} key={`${park?.id}-${originalIndex}`}>

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
                    </div>
                </Link >
            </div>
        );
    });

    return (
        <div>

            <h2>User Destinations</h2>
            <ul>
                <p>{message}</p>
                {userDestinationsList}
            </ul>

        </div>
    );

};


export default DestinationsPage;