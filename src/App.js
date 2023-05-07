import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios"

import './App.css';

import Destinations from "./components/pages/Destinations"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import ParkDetails from "./components/pages/ParkDetails"
import Profile from "./components/pages/Profile"
import Layout from './components/partials/Layout'
import { set } from 'mongoose';


function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [parksInfo, setParksInfo] = useState([]);
  const [userDestinations, setUserDestinations] = useState([])

  //  Pings the api and stores the response data in the parksInfo State
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://developer.nps.gov/api/v1/parks?limit=469&api_key=${process.env.REACT_APP_NPS_API_KEY}`
        );
        console.log(response.data);
        setParksInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // if the user navigates away form the page, we will log them back in
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])

  // pings mongoDB to set state of usersDestinations
  useEffect(async () => {
    try {
      const token = localStorage.getItem('jwt')
      const options = {
        headers: {
          'Authorization': token
        }
      }
      const foundDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options)
      setUserDestinations(foundDestinations.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }

  }

  // ON CLICK ADD TO DESTINATIONS (page details, )
  const handleAddDestinationClick = async (park) => {
    console.log(park)
    const parkId = { parkId: park.id };
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        'Authorization': token
      }
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, parkId, options);
    const updatedDestinations = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/destinations`, options);
    setUserDestinations(updatedDestinations.data)
  }

  // ONCLICK ADD TO EXPERIENCES 
  const handleAddExperienceClick = async (nationalPark) => {
    const newExperience = {
      park: {
        location: nationalPark.fullName,
        image: nationalPark.images[0].url
      }
    }
    const token = localStorage.getItem('jwt');
    const options = {
      headers: {
        'Authorization': token
      }
    }
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${currentUser._id}`, newExperience, options);
  }

  return (
    <div className="App">
      <div className="content">
        <Router>
          <Layout>
            <Routes>
              <Route
                path='/'
                element={<Home parksInfo={parksInfo} 
                handleAddDestinationClick={handleAddDestinationClick}
                userDestinations={userDestinations}
                />}
              />
              <Route
                path='/parks/:parkname/:id'
                element={<ParkDetails
                  parksInfo={parksInfo}
                  handleAddDestinationClick={handleAddDestinationClick}
                  handleAddExperienceClick={handleAddExperienceClick}
                  setUserDestinations={setUserDestinations}
                />}
              />
              <Route
                path='/users/register'
                element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />
              <Route
                path='/users/login'
                element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
              />
              <Route
                path='/users/profile'
                element={<Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser}
                />}
              />
              <Route
                path='/destinations'
                element={<Destinations parksInfo={parksInfo}
                  userDestinations={userDestinations}
                  handleAddExperienceClick={handleAddExperienceClick}
                  setUserDestinations={setUserDestinations}
                />}
              />
            </Routes>
          </Layout>
        </Router>

      </div>
    </div>
  );
}

export default App;