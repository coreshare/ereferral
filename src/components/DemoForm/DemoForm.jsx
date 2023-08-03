import React, {useState} from "react";
import "./DemoForm.css";
import { submitData, uploadFile } from "../../../src/services/api";

const DemoForm = () => {
    const initialFormData = {
        Title: "",
        TargetDate: "",
        Description: "",
        ConditionGood: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file from the input
        setSelectedFile(file);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file");
            return;
        }
        await submitData(formData);
        await uploadFile(selectedFile);
        resetForm();
        alert("Data submitted successfully.");
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setSelectedFile(null);
    };

    return(
        <div className="form-container">
        <h2>EReferral Demo Form</h2>
        <p>{formData.Title}</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
                type="text"
                id="Title"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="TargetDate">Target Date</label>
            <input
                type="date"
                id="TargetDate"
                name="TargetDate"
                value={formData.TargetDate}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="4"
                required
            ></textarea>
            </div>
            <div className="form-group">
            <input
                type="checkbox"
                id="ConditionGood"
                name="ConditionGood"
                checked={formData.ConditionGood}
                onChange={handleChange}
            />
            <label className="checkbox-label" htmlFor="ConditionGood">
                Condition is Good
            </label>
            </div>
            <div className="form-group">
                <label htmlFor="file">Upload File</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <div className="form-group">
            <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}
export default DemoForm;