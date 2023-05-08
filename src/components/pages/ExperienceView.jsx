import { useState } from "react";
import ExperienceEdit from "./ExperienceEdit";
import axios from "axios"
import experienceView from "../../styles/experienceView.css"

export default function ExperienceView(props) {
    const [experienceDetails, setExperienceDetails] = useState(props.experienceView)
    const [showEditForm, setShowEditForm] = useState(false);

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
            props.setExperiencesList(updatedExperiencesList.data)
            
            setShowEditForm(false)
        } catch (err) {
            console.warn(err)
            if (err.response) {
            }
        }
    }

    const showExperience = (
        <>
            <div onClick={() => props.setShowExperience(false)} className="backButton">
                <img src={require("../../media/backButton.png")}
                    className='backButtonImg'></img>
            </div>
            <h1 className="experienceViewHeader">{experienceDetails.location}</h1>
            <img className="experienceViewImg" src={experienceDetails.image}
            />
            <p className="experienceViewDescription">{experienceDetails.description}</p>
            <div className="experienceViewButtonsContainer">
                <div className="editButton" onClick={() => setShowEditForm(true)}>
                    <img className="editButtonImg" src={require("../../media/edit.png")}></img>
                </div>
                <div className="deleteButton" onClick={() => props.handleDeleteClick(experienceDetails)}>
                    <img src={require("../../media/delete.png")}
                        className='deleteButtonImg'></img>
                </div>
            </div>
        </>
    )

    const editExperience = (
        <ExperienceEdit
            experienceDetails={experienceDetails}
            setShowEditForm={setShowEditForm}
            handleSubmit={handleSubmit}
        />
    )

    return (
        <div>
            {!showEditForm ? showExperience : editExperience}
        </div>
    )
}