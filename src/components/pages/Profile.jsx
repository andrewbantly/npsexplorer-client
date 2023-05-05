import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ExperienceView from "./ExperienceView"

// imported the default widget that they give you on page
import 'uploadcare-widget/uploadcare.lang.en.min.js';
import uploadcare from 'uploadcare-widget';


export default function Profile({ currentUser, handleLogout }) {
    const [experiencesList, setExperiencesList] = useState([]);
    const [showExperience, setShowExperience] = useState(false);
    const [experienceView, setExperiencesView] = useState({});
    const [userImage, setUserImage] = useState(currentUser?.image) // IMPORT AVATAR FROM PUBLIC
    const navigate = useNavigate()
   

    const handlePictureUpload = e => {
        console.log(e.target)
    }


    // edited the upload care function to be a named function and binds it to the event listener, so when the file is uploaded the event is triggered and the file is passed.  The fileInfo.cdnUrl contains the uploaded file's URL. and the image is set to the state
    const initUploadcareWidget = () => {
        const widget = uploadcare.Widget('#uploadcare-uploader');
        widget.onUploadComplete(fileInfo => {
          console.log('File uploaded:', fileInfo.cdnUrl);
          setUserImage(fileInfo.cdnUrl);
        });
      };

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
        // this mounts the widget and waits for a timeout incase it doesnt load on mount
        setTimeout(() => {
            initUploadcareWidget();
          }, 0);
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


    const profileView = (

        <div>
            <img src={require("../../media/defaultAvatar.png")}
                style={{
                    height: "100px",
                    borderRadius: "50%"
                }}

            ></img>

            <input type="hidden" role="uploadcare-uploader" data-public-key="e667ec242e718125294d" data-tabs="file facebook gphotos instagram" />


            <button onClick={() => handleLogout()}>Logout</button>
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
            <input
        id="uploadcare-uploader"
        type="hidden"
        role="uploadcare-uploader"
        data-public-key="e667ec242e718125294d"
        data-tabs="file facebook gphotos instagram"
      />
        </div>
    )
}