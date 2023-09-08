import { useState, useEffect } from "react";
import ExperienceEdit from "./ExperienceEdit";
import axios from "axios"
import experienceView from "../../styles/experienceView.css"

export default function ExperienceView(props) {
    const [experienceDetails, setExperienceDetails] = useState(props.experienceView)
    const [showEditForm, setShowEditForm] = useState(false);
    const [showExperienceDescription, setShowExperienceDescription] = useState(false)

    useEffect(() => {
        if (experienceDetails.description !== "") {
            setShowExperienceDescription(true)
        }
        window.scrollTo(0, 0)
    }, [experienceDetails])

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            // update experience 
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${experienceDetails._id}`, form, options);

            const updatedExperience = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/experience/${experienceDetails._id}`, options);
            setExperienceDetails(updatedExperience.data[0])

            const updatedExperiencesList = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${props.currentUser._id}`, options)
            console.log("previous exps? ", props.experiencesList)
            props.setExperiencesList(updatedExperiencesList.data)
            console.log("updated exps: ", updatedExperiencesList.data)
            
            setShowEditForm(false)
        } catch (err) {
            console.warn(err)
            if (err.response) {
            }
        }
    }

    const experienceDescription = (
        <p className="experienceViewDescription">{experienceDetails.description}</p>
    )
    const noExperienceDescription = (
        <p className="experienceViewDescription">Add some memories to your experience visiting {experienceDetails.location}!</p>
    )

    const showExperience = (
        <div className="experienceViewContainer">
            <div onClick={() => {props.setShowExperience(false)}} className="backButton">
                <img src={require("../../media/backButton.png")}
                    className='backButtonImg'></img>
            </div>
            <h1 className="experienceViewHeader">{experienceDetails.location}</h1>
            <img className="experienceViewImg" src={experienceDetails.image}
            />
            {showExperienceDescription ? experienceDescription : noExperienceDescription}
            <div className="experienceViewButtonsContainer">
                <div className="buttons">
                <div className="deleteButton" onClick={() => props.handleDeleteClick(experienceDetails)}>
                    <img src={require("../../media/delete.png")}
                        className='deleteButtonImg'></img>
                </div>
                <div className="editButton" onClick={() => setShowEditForm(true)}>
                    <img className="editButtonImg" src={require("../../media/edit.png")}></img>
                </div>
                </div>
                <div onClick={() => {props.setShowExperience(false)}} className="editButton">
                <img src={require("../../media/backButton.png")}
                    className='backButtonImg'></img>
                </div>
            </div>
        </div>
    )

    const editExperience = (
        <ExperienceEdit
            experienceDetails={experienceDetails}
            setShowEditForm={setShowEditForm}
            handleSubmit={handleSubmit}
            setExperienceDetails={setExperienceDetails}
        />
    )

    return (
        <div>
            {showEditForm ? editExperience: showExperience}
        </div>
    )
}