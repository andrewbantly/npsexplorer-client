import { useState } from "react";
import ExperienceEdit from "./ExperienceEdit";
import axios from "axios"

export default function ExperienceView(props) {
    const [experienceDetails, setExperienceDetails] = useState(props.experienceView)
    const [showEditForm, setShowEditForm] = useState(false);

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        console.log("the experience form has been edited")
        console.log(form)
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    'Authorization': token
                }
            }
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/${experienceDetails._id}`, form, options);

            const updatedExperience = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/experiences/experience/${experienceDetails._id}`, options)
            console.log(updatedExperience)
            setExperienceDetails(updatedExperience.data[0])
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
            <img src={experienceDetails.image} />
            <p>{experienceDetails.description}</p>
            <button onClick={() => props.setShowExperience(false)}>Back</button>
            <button onClick={() => setShowEditForm(true)} >Edit</button>
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