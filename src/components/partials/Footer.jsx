import {Link} from 'react-router-dom'

export default function Footer() {
    return(
        <div className='nav'>
            <Link to='/' className='navIcon'>Home</Link>
            <Link to='/destinations' className='navIcon'>Destinations</Link>
            <Link to='/users/profile' className='navIcon'>Profile</Link>
        </div>
    )
}