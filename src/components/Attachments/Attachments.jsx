import React, {useState} from "react";
import AttachmentsData from "../../Models/AttachmentsData";

const Attachments = () =>{
    const [attachmentsData, setAttachmentsData] = useState(new AttachmentsData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value; 
        setAttachmentsData((prevAttachmentsData) => ({
            ...prevAttachmentsData,
            [name]: newValue,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length > 0) {
            const fileArray = Array.from(selectedFiles);
            setAttachmentsData((prevAttachmentsData) => ({
            ...prevAttachmentsData,
            attachments: fileArray,
            }));
        }
    };

    return(
        <div>
            <div className="form-container">
                <form className="form">
                    <div className="form-field">
                        <label htmlFor="address">Attachments:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            required
                            multiple
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="clinicalOncologist">Detail Class:</label>
                        <input type="text" id="clinicalOncologist" name="detailClass" onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="clinicalOncologist">Detail Type:</label>
                        <input type="text" id="clinicalOncologist" name="detailType" onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="clinicalOncologist">Notes:</label>
                        <input type="text" id="clinicalOncologist" name="notes" onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="clinicalOncologist">Description:</label>
                        <input type="text" id="clinicalOncologist" name="description" onChange={handleChange} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Attachments