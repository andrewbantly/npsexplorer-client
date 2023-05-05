import { useState } from "react"

export default function ExperienceEdit(props) {
    console.log("edit form exp: ", props.experienceDetails)
    const [experienceForm, setExperiencesForm] = useState(props.experienceDetails)
    return (
        <>
            <h1>{props.experienceDetails.location}</h1>
            <h2>Edit Experience</h2>
            <div>
                <form onSubmit={e => props.handleSubmit(e, experienceForm)}>

                <label htmlFor="image">Change image:</label>
                <input
                    type="text"
                    placeholder="enter new url for image"
                    id="image"
                    value={experienceForm.image}
                    onChange={e => setExperiencesForm({ ...experienceForm, image: e.target.value })}
                    />
                <label htmlFor="description">Trip Memories:</label>
                <textarea
                    type="text"
                    placeholder={`Store your memories from ${experienceForm.location}`}
                    id="description"
                    value={experienceForm.description}
                    onChange={e => setExperiencesForm({...experienceForm, description: e.target.value})}
                    />

            <button type="submit">Confirm</button>
            </form>
            <button onClick={() => props.setShowEditForm(false)}>Cancel</button>
            </div>
        </>
    )
}