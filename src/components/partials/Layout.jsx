import '../../index.css'
import Header from "./Header.jsx"


import {Link} from 'react-router-dom'

export default function Layout(props) {
    const {handleLogout, currentUser, setCurrentUser} = props

    return(
        <>
        <Header  
        handleLogout={handleLogout}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        />
        <div className="main-content">{props.children}</div>
        </>
    )
}