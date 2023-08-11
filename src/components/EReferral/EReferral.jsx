import React,{useState} from "react";
import EReferralForm from "../EReferralForm/EReferralForm";
import DocumentUpload from "../DocumentUpload/DocumentUpload";

const EReferral = () =>{
    const [formData, setFormData] = useState({});
    const [documentData, setDocuments] = useState([]);

    const handleFormData = (data) => {
        setFormData(data);
    };

    const handleUpdateMetadata = (index, newMetadata) => {
        const updatedDocuments = [...setDocuments];
        updatedDocuments[index].metadata = newMetadata;
        setDocuments(updatedDocuments);
    };

    const handleFinalSubmit = () => {
        console.log("Form Data:", formData);
        console.log("Document Data:", documentData);
    };
    
    return(<div>
        <EReferralForm onDataSubmit={handleFormData} />
        <DocumentUpload onDocumentSubmit={handleUpdateMetadata} />
        <button type="submit" onClick={handleFinalSubmit}>Submit</button><br/>
    </div>)
}
export default EReferral;