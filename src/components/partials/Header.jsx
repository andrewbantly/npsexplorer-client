import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';

export default function Header(props) {
  const [isOpen, setOpen] = useState(false);
  const {handleLogout, currentUser, setCurrentUser} = props


  console.log(currentUser)
  return (
    <div className="header">
      <div className='bar'>
      {!isOpen && <Link to='/' className="navIcon"><p>NPS Explorer</p></Link>}
      <Hamburger toggled={isOpen} toggle={setOpen} direction="left"/>
      {isOpen && (
        <div className="menu">
          <Link to="/" className="navIcon" onClick={()=> setOpen(false)}>
            Home
          </Link>
          <Link to="/destinations" className="navIcon" onClick={()=> setOpen(false)}>
            Destinations
          </Link>
          <Link to="/users/profile" className="navIcon" onClick={()=> setOpen(false)}>
            Profile
          </Link>
          {currentUser?
          <Link to="/users/login" className="navIcon" onClick={()=> {handleLogout(); setOpen(false)}}>Log out</Link> :
          <Link to="/users/login" className="navIcon" onClick={()=> setOpen(false)}>Login</Link>}
        </div>
      )}
      </div>
      <div className='largeHeader'>
        <div>
        <Link to='/' className="logo"><p>NPS Explorer</p></Link>
        </div>
        <div className="menu">
          <Link to="/" className="navIcon" >
            Home
          </Link>
          <Link to="/destinations" className="navIcon" >
            Destinations
          </Link>
          <Link to="/users/profile" className="navIcon" >
            Profile
          </Link>
          {currentUser?
          <Link to="/users/login" className="navIcon" onClick={()=> handleLogout()}>Logout</Link> :
          <Link to="/users/login" className="navIcon">Log in</Link>}
        </div>
      </div>
    </div>
  );
}