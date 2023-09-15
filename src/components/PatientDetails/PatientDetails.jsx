import React, { useState, useEffect } from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";

const PatientDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [maritalStatusList,setMaritalStatusList] = useState([])
    
    useEffect(() => {
        setMaritalStatusList(listData.MaritalStatuses.map((status) => ({
            label: status.title,
            value: status.title
          })))
    },[])

    const handleNext = () => {
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        dispatch(setAppStep(1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Patient Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="Last Name" onChangeText={onChangeTextHandle} title="Surname" value={details && details.Surname}/><br/>
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="FirstName" value={details && details.FirstName}/><br/>
                        <FormTextAreaCtrl label="Address" onChangeText={onChangeTextHandle} title="Address" value={details && details.Address} ctrlWidth="322px"/><br/>
                        <FormDateCtrl label="Date of Birth" onChangeText={onChangeTextHandle} title="DateofBirth" value={details && details.DateofBirth} dtWidth="320px"/><br/>
                        <FormSelectCtrl label="Marital Status" onChangeValue={onChangeTextHandle} title="MaritalStatus" value={details && details.MaritalStatus} options={maritalStatusList}/><br/>
                        <FormTextBoxCtrl label="Ethnic Origin" onChangeText={onChangeTextHandle} title="Ethnicorigin" value={details && details.Ethnicorigin}/><br/>
                        <FormTextBoxCtrl label="Religion" onChangeText={onChangeTextHandle} title="Religion" value={details && details.Religion}/><br/>
                        <FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" value={details && details.NHSNumber}/>
            
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Next of Kin Name" onChangeText={onChangeTextHandle} title="NextofKinname" value={details && details.NextofKinname}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Phone Number" onChangeText={onChangeTextHandle} title="NextofKincontactdetails" value={details && details.NextofKincontactdetails}/><br/>
                        <FormTextAreaCtrl label="Next of Kin Address" onChangeText={onChangeTextHandle} title="NextofKinAddress" value={details && details.NextofKinAddress} ctrlWidth="322px"/><br/>
                    </div>
                </div>
            </div>
            <div className="detailsNext">
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>
            
        </div>
    )
}

export default PatientDetails;
