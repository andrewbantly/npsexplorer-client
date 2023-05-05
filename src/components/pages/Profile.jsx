import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ExperienceView from "./ExperienceView"

export default function Profile({ currentUser, handleLogout }) {
    // state for the secret message (aka user privilaged data)
    const [msg, setMsg] = useState('')

    const [experiencesList, setExperiencesList] = useState([]);
    const [showExperience, setShowExperience] = useState(false);
    const [experienceView, setExperiencesView] = useState({});
    const navigate = useNavigate()

    // useEffect for getting the user data and checking auth

    const handleClick = experience => {
        console.log(experience)
        setExperiencesView(experience)
        setShowExperience(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get the token from local storage
                const token = localStorage.getItem('jwt')
                // make the auth headers
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                // hit the auth locked endpoint
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)

                const findExperiences = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${currentUser._id}`, options)
                // example POST with auth headers (options are always last argument)
                // await axios.post(url, requestBody (form data), options)
                // set the secret user message in state
                setMsg(response.data.msg)
                setExperiencesList(findExperiences)
            } catch (err) {
                // if the error is a 401 -- that means that auth failed
                console.warn(err)
                if (err.response) {
                    if (err.response.status === 401) {
                        // panic!
                        handleLogout()
                        // send the user to the login screen
                        navigate('/users/login')
                    }
                }
            }
        }
        fetchData()
    }, [handleLogout, navigate]) // only fire on the first render of this component

    const experiences = experiencesList.data?.map((experience, i) => {
        return (
            <div>
                <p onClick={() => handleClick(experience)} key={`experience-${i}`}>{experience.location}</p>
            </div>
        )
    })

    const profileView = (

            <div>
                <h1>Hello, {currentUser?.name}</h1>

                <p>your email is {currentUser?.email}</p>

                <h2>Here is the secret message that is only availible to users of User App:</h2>

                <h3>{msg}</h3>
                {experiences}
            </div>
        )
    
    const showExperienceView = (
            <ExperienceView 
            experienceView={experienceView}
            setShowExperience={setShowExperience}
            setExperiencesView={setExperiencesView}
            currentUser={currentUser}
            />
    )


    return (
        <div>

            {showExperience ? showExperienceView : profileView}

        </div>
    )
}
