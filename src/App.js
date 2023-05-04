import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


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
          element={<SignUp />}
          />
          <Route 
          path='/users/login'
          element={<Login />}
          />
          <Route 
          path='/users/profile'
          element={<Profile />}
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
