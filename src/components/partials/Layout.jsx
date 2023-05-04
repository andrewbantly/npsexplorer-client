import '../../index.css'


import {Link} from 'react-router-dom'

export default function Layout(props) {
    return(
        <>
        <div className="main-content">{props.children}</div>
        <div className='footer'>
        <footer>
            <Link to='/' className='navIcon'>Home</Link>
            <Link to='/destinations' className='navIcon'>Destinations</Link>
            <Link to='/users/profile' className='navIcon'>Profile</Link>
        </footer>
        </div>
        </>
    )
}