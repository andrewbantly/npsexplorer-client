import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

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
          element={<Home />}
          />
          <Route 
          path='/search/results'
          element={<SearchResults />}
          />
          <Route 
          path='/parks/:parkname/:id'
          element={<ParkDetails />}
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
          path='/users/experiences/:parkname'
          element={<ExperienceView />}
          />
          <Route 
          path='/users/experiences/:parkname/edit'
          element={<ExperienceEdit />}
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
