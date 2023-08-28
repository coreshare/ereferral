import React, { useState, useEffect } from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";

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
        <div>
            <h3>Patient Details</h3>
            <div>
                <FormTextBoxCtrl label="Surname" onChangeText={onChangeTextHandle} title="Surname" value={patientData.find(detail => detail.title === "Surname")?.value || ""}/>
                <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="FirstName" value={patientData.find(detail => detail.title === "FirstName")?.value || ""}/>
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default PatientDetails;
