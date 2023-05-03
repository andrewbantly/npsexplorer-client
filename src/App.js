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


function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
          path='/'
          element={<Home />}
          />
          <Route 
          path='/destinations'
          element={<Destinations />}
          />
          <Route 
          path='/users/experiences/:name'
          element={<ExperienceView />}
          />
          <Route 
          path='/users/experiences/:name/edit'
          element={<ExperienceEdit />}
          />
          <Route 
          path='/users/login'
          element={<Login />}
          />
          <Route 
          path='/users/signup'
          element={<SignUp />}
          />
          <Route 
          path='/parks/:name'
          element={<ParkDetails />}
          />
          <Route 
          path='/users/signup'
          element={<SignUp />}
          />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
