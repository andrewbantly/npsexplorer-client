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
  width: 10rem;
  height: auto;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    width: 80vw;
  }
`;

const DestinationsTitle = styled.h2`
  margin-bottom: -2rem;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -25px;
  margin-bottom: -30px;

  @media (max-width: 480px) {
    flex-direction: row;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  width: 30px;
  height: 70px;
  padding: 0;
  margin: 0;
  margin-right: 16px; 
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('https://ucarecdn.com/70eb6013-f9b9-4377-9c48-4ded6a690e9f/');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const ExperienceButton = styled.button`
  border: none;
  background-color: transparent;
  width: 30px;
  height: 70px;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url('https://ucarecdn.com/e8ede673-cced-4a2a-a020-941e395828ff/');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const ParkImage = styled.img`
    width: 100%;
    object-fit: cover;
    margin-bottom: 0.1rem; 
    border-radius: 5px;

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
    text-align: left;
    width: 100%;
    padding: 1rem 0;
    color: black;
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

const ImageAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DestinationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.1rem;
`;


const DestinationsPage = (props) => {
    const [message, setMessage] = useState('');
    const [experienceMessage, setExperienceMessage] = useState('');
    const { parksInfo,
        userDestinations,
        handleRemoveDestination,
        handleAddExperienceClick,
        setUserDestinations } = props

    //const removeDestination = async (destinationId, park) => { ... }: This line defines an asynchronous function called removeDestination. This function takes two arguments: destinationId (the ID of the destination to be removed) and park (an object containing the details of the park associated with the destination).

    //Retrieve the JSON Web Token (JWT) from the browser's local storage.

    //After successfully deleting the destination, the code sends another request to the server to fetch the updated list of user destinations using the axios.get method

    //The updated list of destinations is then passed to the setUserDestinations function to update the state in the parent component.

    const removeDestination = async (event, destinationId, park) => {
        event.stopPropagation();
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

    //event: The event object that is automatically passed when the function is called from an event listener (onClick in this case). The event object contains information about the event that occurred, such as the target element and the type of event.

    // event.stopPropagation(); is used to prevent the parent element from reciving the click

    const handleExperienceButtonClick = (event, park) => {
        event.stopPropagation();
        handleAddExperienceClick(park);
        setExperienceMessage(`${park.fullName} was added to experience`);
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
            <ParkContainer key={`${park?.id}-${originalIndex}`}>
                <ImageAndButtons>
                    <Link to={`/parks/${park?.fullName}/${originalIndex}`}>
                        <ParkImage
                            src={park?.images[0].url}
                            alt={park?.fullName}
                        />
                    </Link>
                    <ButtonsContainer>
                        <RemoveButton
                            onClick={(event) => removeDestination(event, destination, park)}
                        >
                        </RemoveButton>
                        <ExperienceButton
                            onClick={(event) => handleExperienceButtonClick(event, park)}
                        >
                        </ExperienceButton>
                    </ButtonsContainer>
                </ImageAndButtons>

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
            </ParkContainer>
        );
    });

    return (
        <DestinationsContainer>
            <DestinationsTitle>User Destinations:</DestinationsTitle>
            {userDestinations.length === 0 && (
                <NoDestinationsMessage>
                    You have no Destinations! Go and explore!
                </NoDestinationsMessage>
            )}
            <ul>
                <p>{message}</p>
                <p>{experienceMessage}</p>
                <ParkGrid>{userDestinationsList}</ParkGrid>
            </ul>
        </DestinationsContainer>
    );
};


export default DestinationsPage;