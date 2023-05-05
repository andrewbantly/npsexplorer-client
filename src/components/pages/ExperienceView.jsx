import { useState } from "react";
import ExperienceEdit from "./ExperienceEdit";
import axios from "axios"

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
            <h1>{experienceDetails.location}</h1>
            <img src={experienceDetails.image}
                style={{
                    height: "200px"
                }}
            />
            <p>{experienceDetails.description}</p>
            <button onClick={() => props.setShowExperience(false)}>Back</button>
            <button onClick={() => setShowEditForm(true)} >Edit</button>
            <button onClick={() => props.handleDeleteClick(experienceDetails)}>Delete</button>
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