import React, {useEffect, useState} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";

const NextofKinDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const [relationshiptoPatientDataList,setRelationshiptoPatientDataList] = useState([])
    const listData = useSelector(state => state.masterData)

    const handleNext = () => {
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralSubmissionStep(currentStep - 1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }));
    }
    useEffect(() => {
        if(listData.RelationshiptoPatient){
            setRelationshiptoPatientDataList(listData.RelationshiptoPatient.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
    },[])

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Next of Kin Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="Next of Kin First Name" onChangeText={onChangeTextHandle} title="NextofKinFirstName" value={details && details.NextofKinFirstName}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Last Name" onChangeText={onChangeTextHandle} title="NextofKinLastName" value={details && details.NextofKinLastName}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Middle Name" onChangeText={onChangeTextHandle} title="NextofKinMiddlename" value={details && details.NextofKinMiddlename}/><br/>
                        <FormTextBoxCtrl label="Address Line 1" onChangeText={onChangeTextHandle} title="NextofKinAddressLine1" value={details && details.NextofKinAddressLine1}/><br/>
                        <FormTextBoxCtrl label="Address Line 2" onChangeText={onChangeTextHandle} title="NextofKinAddressLine2" value={details && details.NextofKinAddressLine2}/><br/>
                        <FormTextBoxCtrl label="Address Line 3" onChangeText={onChangeTextHandle} title="NextofKinAddressLine3" value={details && details.NextofKinAddressLine3}/><br/>
                        <FormTextBoxCtrl label="Address Line 4" onChangeText={onChangeTextHandle} title="NextofKinAddressLine4" value={details && details.NextofKinAddressLine4}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Post Code" onChangeText={onChangeTextHandle} title="NextofKinPostCode" value={details && details.NextofKinPostCode}/><br/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Next of Kin Home Phone Number" onChangeText={onChangeTextHandle} title="NextofKinHomePhoneNumber" value={details && details.NextofKinHomePhoneNumber} maxLengthValue={11} disallowSpaces={true}/><br/>
                        <FormTextBoxCtrl label="Next of Kin Mobile Number" onChangeText={onChangeTextHandle} title="NextofKinMobileNumber" value={details && details.NextofKinMobileNumber} maxLengthValue={11} disallowSpaces={true}/><br/>
                        <FormSelectCtrl label="Relationship to Patient" onChangeText={onChangeTextHandle} title="RelationshiptoPatient" value={details && details.RelationshiptoPatient} options={relationshiptoPatientDataList}/><br/>
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

export default NextofKinDetails;
