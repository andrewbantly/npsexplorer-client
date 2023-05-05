import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios"

import logo from './logo.svg';
import './App.css';

import Destinations from "./components/pages/Destinations"
import ExperienceEdit from "./components/pages/ExperienceEdit"
import ExperienceView from "./components/pages/ExperienceView"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import ParkDetails from "./components/pages/ParkDetails"
import Profile from "./components/pages/Profile"
import SearchResults from "./components/pages/SearchResults"
import Footer from './components/partials/Footer';
import Layout from './components/partials/Layout'


function App() {
  // the currently logged in user will be stored up here in state
	const [currentUser, setCurrentUser] = useState(null)
  const [parksInfo, setParksInfo] = useState([])

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

	// useEffect -- if the user navigates away form the page, we will log them back in
	useEffect(() => {
		// check to see if token is in storage
		const token = localStorage.getItem('jwt')
		if (token) {
			// if so, we will decode it and set the user in app state
			setCurrentUser(jwt_decode(token))
		} else {
			setCurrentUser(null)
		}
	}, []) // happen only once

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

  return (
  <div className="App">
    <div className="content">
      <Router>
        <Layout>
        <Routes>
          <Route 
          path='/'
          element={<Home parksInfo={parksInfo}/>}
          />
          <Route 
          path='/search/results'
          element={<SearchResults parksInfo={parksInfo}/>}
          />
          <Route 
          path='/parks/:parkname/:id'
          element={<ParkDetails parksInfo={parksInfo}/>}
          />
          <Route 
          path='/users/register'
          element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />
          <Route 
          path='/users/login'
          element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />
          <Route 
          path='/users/profile'
          element={<Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
          />
          <Route 
          path='/destinations'
          element={<Destinations />}
          />
        </Routes>
        </Layout>
      </Router>
      
    </div>
    </div>
  );
}

export default App;
