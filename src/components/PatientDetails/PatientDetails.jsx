import React, { useState, useEffect } from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";

const PatientDetails = ({onNext,getPatientData,patientData}) => {
    const [patientDetails, setPatientDetails] = useState(patientData)

    const handleNext = () => {
        getPatientData(patientDetails);
        onNext();
    }

    const onChangeTextHandle = (title, value) => {
        const existingDetail = patientDetails.find(detail => detail.title === title);

        if (existingDetail) {
            setPatientDetails(prevDetails =>
                prevDetails.map(detail =>
                    detail.title === title ? { ...detail, value } : detail
                )
            );
        } else {
            setPatientDetails(prevDetails =>
                [...prevDetails, { title, value }]
            );
        }
    }

    useEffect(() => {
        return () => {
            getPatientData(patientDetails);
        }
    }, [patientDetails]);

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Patient Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="Surname" onChangeText={onChangeTextHandle} title="Surname" value={patientData.find(detail => detail.title === "Surname")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="FirstName" value={patientData.find(detail => detail.title === "FirstName")?.value || ""}/><br/>
                        <FormTextAreaCtrl label="Address" onChangeText={onChangeTextHandle} title="Address" value={patientData.find(detail => detail.title === "Address")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Date of Birth" onChangeText={onChangeTextHandle} title="DateofBirth" value={patientData.find(detail => detail.title === "DateofBirth")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Ethnic Origin" onChangeText={onChangeTextHandle} title="Ethnicorigin" value={patientData.find(detail => detail.title === "Ethnicorigin")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Religion" onChangeText={onChangeTextHandle} title="Religion" value={patientData.find(detail => detail.title === "Religion")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" value={patientData.find(detail => detail.title === "NHSNumber")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Marital Status" onChangeText={onChangeTextHandle} title="MaritalStatus" value={patientData.find(detail => detail.title === "MaritalStatus")?.value || ""}/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Next of Kin Name" onChangeText={onChangeTextHandle} title="NextofKinname" value={patientData.find(detail => detail.title === "NextofKinname")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Phone Number" onChangeText={onChangeTextHandle} title="NextofKincontactdetails" value={patientData.find(detail => detail.title === "NextofKincontactdetails")?.value || ""}/><br/>
                        <FormTextAreaCtrl label="Next of Kin Address" onChangeText={onChangeTextHandle} title="NextofKinAddress" value={patientData.find(detail => detail.title === "NextofKinAddress")?.value || ""}/><br/>
                    </div>
                </div>
            </div>
            <div className="detailsNext">
                <button onClick={handleNext}>Next</button>
            </div>
            
        </div>
    )
}

export default PatientDetails;
