import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/destinations');
        setDestinations(response.data);
      } catch (error) {
        setMessage('Error fetching destinations');
      }
    };

    fetchDestinations();
  }, []);

  const removeDestination = async (destinationId) => {
    try {
      await axios.delete(`/destinations/${destinationId}`);
      setMessage('Destination removed from favorites');
      setDestinations(destinations.filter((destination) => destination._id !== destinationId));
    } catch (error) {
      setMessage('Error removing destination from favorites');
    }
  };

  return (
    <div>
      <h1>My Destinations</h1>
      {message && <p>{message}</p>}
      {destinations.map((destination) => (
        <div key={destination._id}>
          <img src={destination.imageUrl} alt={destination.name} />
          <h2>{destination.name}</h2>
          <p>{destination.description}</p>
          <button onClick={() => removeDestination(destination._id)}>Remove from Destinations</button>
        </div>
      ))}
    </div>
  );
};

export default DestinationsPage;
