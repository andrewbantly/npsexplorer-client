import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DestinationsPage = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const parksInfo = props.parksInfo;
  const userDestinations = props.userDestinations;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const options = {
          headers: {
            'Authorization': token,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`,
          options
        );

        setDestinations(response.data);
      } catch (error) {
        setMessage('Error fetching destinations');
      }
    };

    fetchDestinations();
  }, []);

  const removeDestination = async (destinationId) => {
    console.log('Removing destination with ID:', destinationId);
    try {
      const token = localStorage.getItem('jwt');
      const options = {
        headers: {
          'Authorization': token,
        },
      };
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations/${destinationId}`, options);
      setMessage('Destination removed from favorites');
      setDestinations(destinations.filter((destination) => destination._id !== destinationId));
    } catch (error) {
      setMessage('Error removing destination from favorites');
    }
  };
  
  
  const fetchDestinationById = (destinationId) => {
    console.log("=>", destinationId)
    const foundDestination = destinations.find(
      (destination) => destination._id === destinationId
    );
  
    if (foundDestination) {
      setSelectedDestination(foundDestination);
    } else {
      console.log('Destination not found');
    }
  };
  

      return (
        <div>
          <h1>My Destinations</h1>
          {message && <p>{message}</p>}
          {destinations.map((destination, index) => (
            <div key={index}>
              <img
                src={destination?.images?.[0]?.url || ''}
                alt={destination.fullName}
              />
              <h2>{destination.fullName}</h2>
              <p>{destination.description}</p>
              <button onClick={() => removeDestination(destination.id)}>Remove from Destinations</button>

              <button onClick={() => fetchDestinationById(destination.id)}>Display Destination</button>

            </div>
          ))}
          {selectedDestination && (
            <div>
              <h2>Selected Destination</h2>
              <img
                src={selectedDestination?.images?.[0]?.url || ''}
                alt={selectedDestination.fullName}
              />
              <h3>{selectedDestination.fullName}</h3>
              <p>{selectedDestination.description}</p>
            </div>
          )}
        </div>
      );
    };
    

export default DestinationsPage;