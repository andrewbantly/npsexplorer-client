import { useState, useEffect } from "react";
import experienceEdit from "../../styles/experienceEdit.css";
import axios from "axios";
import 'uploadcare-widget/uploadcare.lang.en.min.js';
import uploadcare from 'uploadcare-widget';

export default function ExperienceEdit(props) {
    const [experienceForm, setExperiencesForm] = useState(props.experienceDetails);

    useEffect(() => {
        const initUploadcareWidget = () => {
            const widget = uploadcare.SingleWidget('#uploadcare-uploader');
            widget.onUploadComplete(async (fileInfo) => {
                console.log('File uploaded:', fileInfo.cdnUrl);
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                setExperiencesForm({ ...experienceForm, image: fileInfo.cdnUrl })
            });
        };
        initUploadcareWidget();
    }, [])

    return (
        <>
            <div onClick={() => props.setShowEditForm(false)} className="backButton">
                <img src={require("../../media/backButton.png")}
                    className='backButtonImg'></img>
            </div>
            <h1 className="experienceViewHeader">{props.experienceDetails.location}</h1>
            <h2>Edit Experience</h2>
            <div className="formContainer">
                <form onSubmit={e => props.handleSubmit(e, experienceForm)}>
                    <div className="flex wrap imageUploadContainer" >
                        <label htmlFor="uploadcare-uploader" className="tripMemories">Upload image</label>
                        <input
                            id="uploadcare-uploader"
                            type="hidden"
                            role="uploadcare-uploader"
                            data-public-key="e667ec242e718125294d"
                            data-tabs="file facebook gphotos instagram"
                        />
                    </div>
                    <div className="flex wrap descriptionContainer">
                        <label htmlFor="description" className="tripMemories" >Trip Memories</label>
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
            <div>
            </div>
        </>
    )
}