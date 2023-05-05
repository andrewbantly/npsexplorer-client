import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ExperienceView from "./ExperienceView"
import uploadcare from 'uploadcare-widget/uploadcare.lang.en.min.js';
import { uploadFile } from '@uploadcare/upload-client'


export default function Profile({ currentUser, handleLogout }) {
    const [experiencesList, setExperiencesList] = useState([]);
    const [showExperience, setShowExperience] = useState(false);
    const [experienceView, setExperiencesView] = useState({});
    const [userImage, setUserImage] = useState(currentUser?.image) // IMPORT AVATAR FROM PUBLIC
    const navigate = useNavigate()

    const handlePictureUpload = e => {
        console.log(e.target)
    }

    const handleClick = experience => {
        setExperiencesView(experience)
        setShowExperience(true)
    }
    const handleDeleteClick = async (experience) => {
        console.log(experience)
        console.log("delete button clicked")
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }

            const deleteExperience = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${experience._id}`, options);

            const updatedExperiences = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${currentUser._id}`, options)
            setExperiencesList(updatedExperiences)
            setShowExperience(false)
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
                console.log("response: ", response)

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

    const result = uploadFile(fileData, {
        publicKey: 'e667ec242e718125294d',
        store: 'auto',
        metadata: {
            subsystem: 'uploader'
        }
    })
    console.log(`URL: ${file.cdnUrl}`)

    const profileView = (

        <div>
            <img src={require("../../media/defaultAvatar.png")}
                style={{
                    height: "100px",
                    borderRadius: "50%"
                }}

            ></img>

            <input type="hidden" role="uploadcare-uploader" data-public-key="e667ec242e718125294d" data-tabs="file facebook gphotos instagram" />



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
            handleDeleteClick={handleDeleteClick}
            setExperiencesList={setExperiencesList}
        />
    )

    return (
        <div>

            {showExperience ? showExperienceView : profileView}

        </div>
    )
}