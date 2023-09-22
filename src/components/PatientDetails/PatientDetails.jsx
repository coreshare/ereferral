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
    const [religionsList,setReligionsList] = useState([])
    const [ethnicoriginsList,setEthnicoriginsList] = useState([])
    const [covidDataList,setCovidDataList] = useState([])
    const [specialIndicatorDataList,setSpecialIndicatorDataList] = useState([])
    const [communicationRequirementDataList,setCommunicationRequirementDataList] = useState([])
    
    useEffect(() => {debugger;
        if(listData.MaritalStatuses){
            setMaritalStatusList(listData.MaritalStatuses.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Religions){
            setReligionsList(listData.Religions.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Ethnicity){
            setEthnicoriginsList(listData.Ethnicity.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Covid){
            setCovidDataList(listData.Covid.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.SpecialIndicator){
            setSpecialIndicatorDataList(listData.SpecialIndicator.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.CommunicationRequirement){
            setCommunicationRequirementDataList(listData.CommunicationRequirement.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }/*
        if(listData.NHSNumbers){
            setNHSNumbersList(listData.NHSNumbers.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }*/
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
                        <FormTextBoxCtrl label="Middle Name" onChangeText={onChangeTextHandle} title="MiddleName" value={details && details.MiddleName}/><br/>
                        <FormTextAreaCtrl label="Address" onChangeText={onChangeTextHandle} title="Address" value={details && details.Address} ctrlWidth="322px"/><br/>
                        <FormDateCtrl label="Date of Birth" onChangeText={onChangeTextHandle} title="DateofBirth" value={details && details.DateofBirth} dtWidth="320px"/><br/>
                        <FormSelectCtrl label="Marital Status" onChangeValue={onChangeTextHandle} title="MaritalStatus" value={details && details.MaritalStatus} options={maritalStatusList}/><br/>
                        <FormSelectCtrl label="Ethnic Origin" onChangeText={onChangeTextHandle} title="Ethnicorigin" value={details && details.Ethnicorigin} options={ethnicoriginsList}/><br/>
                        <FormSelectCtrl label="Religion" onChangeText={onChangeTextHandle} title="Religion" value={details && details.Religion} options={religionsList}/><br/>
                        <FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" value={details && details.NHSNumber} /><br/>
                        <FormSelectCtrl label="Covid" onChangeText={onChangeTextHandle} title="Covid" value={details && details.Covid} options={covidDataList}/><br/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Patient Home Phone Number" onChangeText={onChangeTextHandle} title="HomePhoneNumber" value={details && details.HomePhoneNumber}/><br/>
                        <FormTextBoxCtrl label="Patient Mobile Number" onChangeText={onChangeTextHandle} title="MobileNumber" value={details && details.MobileNumber}/><br/>
                        <FormTextBoxCtrl label="Post Code" onChangeText={onChangeTextHandle} title="PostCode" value={details && details.PostCode}/><br/>
                        <FormTextBoxCtrl label="Next of Kin First Name" onChangeText={onChangeTextHandle} title="NextofKinname" value={details && details.NextofKinname}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Last Name" onChangeText={onChangeTextHandle} title="NextofKinLastname" value={details && details.NextofKinname}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Middle Name" onChangeText={onChangeTextHandle} title="NextofKinMiddlename" value={details && details.NextofKinname}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Phone Number" onChangeText={onChangeTextHandle} title="NextofKincontactdetails" value={details && details.NextofKincontactdetails}/><br/>
                        <FormTextAreaCtrl label="Next of Kin Address" onChangeText={onChangeTextHandle} title="NextofKinAddress" value={details && details.NextofKinAddress} ctrlWidth="322px"/>
                        <br/>
                        <FormSelectCtrl label="Special Indicator" onChangeText={onChangeTextHandle} title="SpecialIndicator" value={details && details.SpecialIndicator} options={specialIndicatorDataList}/><br/>
                        <FormSelectCtrl label="Communication Requirement" onChangeText={onChangeTextHandle} title="CommunicationRequirement" value={details && details.CommunicationRequirement} options={communicationRequirementDataList}/><br/>
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
