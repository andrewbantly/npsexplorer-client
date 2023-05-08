import { useState } from "react"
import experienceEdit from "../../styles/experienceEdit.css"

export default function ExperienceEdit(props) {
    const [experienceForm, setExperiencesForm] = useState(props.experienceDetails)
    return (
        <>
            <div onClick={() => props.setShowEditForm(false)} className="backButton">
                <img src={require("../../media/backButton.png")}
                    className='backButtonImg'></img>
            </div>
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
                    <div>
                    <label htmlFor="description" className="tripMemories" >Trip Memories:</label>
                    <textarea
                        className="experienceTextInput"
                        type="text"
                        placeholder={`Store your memories from ${experienceForm.location}`}
                        id="description"
                        value={experienceForm.description}
                        onChange={e => setExperiencesForm({ ...experienceForm, description: e.target.value })}
                    />
                    </div>

                    <button className="confirmButton" type="submit"><img className="confirmButtonImg" src={require("../../media/confirm.png")}></img></button>
                </form>
            </div>
        </>
    )
}