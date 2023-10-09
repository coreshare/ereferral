import React, { useEffect, useState } from "react"
import "./LeftNavForDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice"
import { updateDetails } from "../DetailsSlice"
import ModalDialog from "../ModalDialog/ModalDialog"

const LeftNavForDetails = () => {
    const dispatch = useDispatch()
    const [cleartext,setClearText] = useState("Patient")
    const leftNavStep = useSelector(stage => stage.referralSubmissionStep)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCloseButton,setShowCloseButton] = useState(true)
    const [modalText, setModalText] = useState("")
    const [isConfirmation, setIsConfirmation] = useState(true)
    const [confirmationBtnText, setConfirmationBtnText] = useState("")

    const handleGoToStep = (step) => {
        if(step == 0)
            setClearText("Patient")
        else if(step == 1)
            setClearText("Next of Kin")
        else if(step == 2)
            setClearText("Refer")
        else if(step == 3)
            setClearText("Treatment & Target Category")
        else if(step == 4)
            setClearText("Reports")
        dispatch(setReferralSubmissionStep(step))
    }

    const handleClearDetails = () => {
        if(leftNavStep != 4){
            setShowCloseButton(false)
            setIsConfirmation(true)
            setConfirmationBtnText("Yes")
            setModalText("Do you want to clear " + cleartext + " details?")
            openModal()
        }
    }

    const handleConfirmation = async (isConfirmed) => {
        if(isConfirmed){
            if(leftNavStep == 0)
                resetPatientDetails()
            else if(leftNavStep == 1)
                resetNextOfKinDetails()
            else if(leftNavStep == 2)
                resetReferDetails()
            else if(leftNavStep == 3)
                resetTreatmentDetails()
        }
        closeModal()
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const resetControl = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    const resetTreatmentDetails = () => {
        resetControl("MedicalOncologistCCCConsultant","")
        resetControl("ClinicalOncologistCCCConsultant","")
        resetControl("PrimaryDiagnosis","")
        resetControl("IsthisaTargetPatient","")
        resetControl("TargetCategory","")
    }

    const resetReferDetails = () => {
        resetControl("GPName","")
        resetControl("GPPractice","")
        resetControl("GPPracticeAddress","")

        resetControl("ReferringOrganisation","")
        resetControl("ReferringConsultant","")
        resetControl("DateDecisiontoRefer","")
    }

    const resetNextOfKinDetails = () => {
        resetControl("NextofKinFirstName","")
        resetControl("NextofKinLastName","")
        resetControl("NextofKinMiddlename","")
        resetControl("NextofKinAddressLine1","")
        resetControl("NextofKinAddressLine2","")
        resetControl("NextofKinAddressLine3","")
        resetControl("NextofKinAddressLine4","")
        resetControl("NextofKinPostCode","")

        resetControl("NextofKinHomePhoneNumber","")
        resetControl("NextofKinMobileNumber","")
        resetControl("RelationshiptoPatient","")
    }

    const resetPatientDetails = () => {
        resetControl("NHSNumber","")
        resetControl("Surname","")
        resetControl("FirstName","")
        resetControl("MiddleName","")
        resetControl("Title","")
        resetControl("DateofBirth","")
        resetControl("Sex","")
        resetControl("MaritalStatus","")
        resetControl("Ethnicorigin","")
        resetControl("Religion","")
        resetControl("SpecialRequirements","")

        resetControl("AddressLine1","")
        resetControl("AddressLine2","")
        resetControl("AddressLine3","")
        resetControl("AddressLine4","")
        resetControl("PostCode","")
        resetControl("HomePhoneNumber","")
        resetControl("MobileNumber","")
        resetControl("EmailAddress","")
    }

    return(
        <>
        <div className="leftnav">
            <button onClick={() => handleGoToStep (0)}>Patient Details</button><br/>
            <button onClick={() => handleGoToStep (1)}>Next of Kin Details</button><br/>
            <button onClick={() => handleGoToStep (2)}>Refer Details</button><br/>
            <button onClick={() => handleGoToStep (3)}>Treatment & Target Category</button><br/>
            {/*<button onClick={() => handleGoToStep (3)}>MDT Details</button><br/>*/}
            <button style={{display:"block"}} onClick={() => handleGoToStep (4)}>Reports</button>

            {leftNavStep != 4 && <><hr style={{width:"200px",float:"left",height:"1px",background:"black",marginBottom: "15px"}}/>
            <button style={{textAlign:"left",lineHeight:"28px"}} onClick={() => handleClearDetails()}>Clear {cleartext} Details</button></>}

        </div>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} 
            isConfirmation={isConfirmation} confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText}>
            {modalText}
            </ModalDialog></>
    )
}

export default LeftNavForDetails