import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import styled from 'styled-components';

// using syled-components to style this page
const ParkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 7px solid #ccc;
    margin: 1rem;
    padding: 0;
    width: 18rem;
    height: auto;
    border-radius: 10px;
    position: relative;
    background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

    @media (max-width: 480px) {
        width: 90vw;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

const RemoveButton = styled.button`
    border: none;
    background-color: #b56576;
    color: white;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    margin: .5rem;
    border-radius: 4px;
`;

const ExperienceButton = styled.button`
    border: none;
    background-color: #88b04b;
    color: white;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    margin: .5rem;
    border-radius: 4px;
`;

const ParkImage = styled.img`
    width: 100%;
    object-fit: cover;
    margin-bottom: 0.5rem; 

    @media (max-width: 480px) {
        height: 60vw;
        object-fit: cover;
    }
`;

const ParkText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
    padding: 1rem 0;
    color: #556b2f;
  font-family: 'Arial', sans-serif;
`;

const ParkGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  max-width: 90%;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const NoDestinationsMessage = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #556b2f;
  font-family: 'Arial', sans-serif;
`;


const DestinationsPage = (props) => {
    const [message, setMessage] = useState('');
    const { parksInfo,
        userDestinations,
        handleRemoveDestination,
        handleAddExperienceClick,
        setUserDestinations } = props

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
            <ParkContainer>

                <Link to={`/parks/${park?.fullName}/${originalIndex}`} key={`${park?.id}-${originalIndex}`}>

                    <div>
                        <ParkImage
                            src={park?.images[0].url}
                            alt={park?.fullName}
                        />

                    </div>
                    <ButtonsContainer>
                        <RemoveButton
                            onClick={() => removeDestination(destination, park)}
                        >
                            Remove
                        </RemoveButton>

                        <ExperienceButton
                            onClick={() => handleAddExperienceClick(park)}
                        >
                            Add
                        </ExperienceButton>
                    </ButtonsContainer>

                    <ParkText>
                        <h3>{park?.fullName}</h3>
                        <div>
                            <p>
                                {park?.addresses[0]?.city}, {park?.addresses[0]?.stateCode}
                            </p>
                            <p>
                                Activities: {park?.activities[0]?.name},{" "}
                                {park?.activities[1]?.name}, {park?.activities[2]?.name},{" "}
                                {park?.activities[3]?.name}, {park?.activities[4]?.name}
                            </p>
                        </div>
                    </ParkText>
                </Link>
            </ParkContainer>
        );
    });

    return (
        <div>
            <h2>User Destinations</h2>
            {userDestinations.length === 0 && (
                <NoDestinationsMessage>You have no Destinations! Go and explore!</NoDestinationsMessage>
            )}
            <ul>
                <p>{message}</p>
                <ParkGrid>{userDestinationsList}</ParkGrid>
            </ul>
        </div>
    );
};


export default DestinationsPage;