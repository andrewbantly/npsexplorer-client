import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ExperienceView from "./ExperienceView"

export default function Profile({ currentUser, handleLogout }) {
    const [experiencesList, setExperiencesList] = useState([]);
    const [showExperience, setShowExperience] = useState(false);
    const [experienceView, setExperiencesView] = useState({});
    const navigate = useNavigate()

    const handleClick = experience => {
        console.log(experience)
        setExperiencesView(experience)
        setShowExperience(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)

                const findExperiences = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${currentUser._id}`, options)
                setExperiencesList(findExperiences)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    if (err.response.status === 401) {
                        handleLogout()
                        navigate('/users/login')
                    }
                }
            }
        }
        fetchData()
    }, [handleLogout, navigate])

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
            <h2>Look at all the places you've been!</h2>
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