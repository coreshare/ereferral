import React, {useEffect, useState} from "react";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl"
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setNHSNumbers } from "../MasterDataSlice"
import ModalDialog from "../ModalDialog/ModalDialog";
import { setAppStep } from "../AppSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormYesNoBtnsCtrl from "../FormYesNoBtnsCtrl/FormYesNoBtnsCtrl";
import { warning_NHSNumberText } from "../Config";
import { setNOKMandatory, setPatientMandatory, setPDSAPICallsCount, setReferMandatory, setTTCMandatory } from "../SharedStringsSlice";
import { getPDSData } from "../../Services/api.js";

const Questionnaire = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const [discussedAtMDT, setDiscussedAtMDT] = useState(details.DiscussedatMDT);
    const [overseasPatient, setOverseasPatient] = useState(details.OverseasPatient);
    const [awareOfDiagnosis, setAwareOfDiagnosis] = useState(details.PatientAwareofDiagnosis);
    const refTypeStageStep = useSelector(state => state.referralTypeStageStep)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [confirmationBtnText, setConfirmationBtnText] = useState("");
    const [isConfirmation, setIsConfirmation] = useState(true)
    const [confirmationType, setConfirmationType] = useState("")
    const [modalText, setModalText] = useState("");
    const nhsNumbers = useSelector(state => state.masterData.NHSNumbers)
    const [disableMDTCtrl, setDisableMDTCtrl] = useState(false)
    const pdsApiCallsAttempted = useSelector(state => state.sharedStrings.pdsAPICallsCount)
    const MAX_ATTEMPTS = 5;

    /*
    useEffect(() => {
        if(nhsNumbers.length == 0){
            fetchNHSNumbers()
        }
    },[])

    const fetchNHSNumbers = async () => {
        var nhsnos = [{title: "121212"}]//await getMasterData("NHSNumbers")//getNHSNumbers()//checkonce
        dispatch(setNHSNumbers(nhsnos))
    }*/

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleConfirmation = (isConfirmed) => {
        if(isConfirmed){
            if(confirmationType == "Patient Details Found"){
                setPatientDetailsData()
                dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
            }
            else if(confirmationType == "No Patient Details"){
                dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
            }
        }
        closeModal();
    }
    const handleNext = () => {
        if(awareOfDiagnosis == undefined || awareOfDiagnosis == "" || 
        (awareOfDiagnosis == "Yes" && (discussedAtMDT == undefined || discussedAtMDT == "")) || 
        (overseasPatient == undefined || overseasPatient == ""))
        {
            /*discussedAtMDT == undefined || discussedAtMDT == "" || 
            awareOfDiagnosis == undefined || awareOfDiagnosis == "" || 
            overseasPatient == undefined || overseasPatient == ""*/

            setShowCloseButton(true);
            setIsConfirmation(false);
            setModalText("Please complete the questionnaire");
            openModal()
            return
        }
        if(/*discussedAtMDT == 'No' || */awareOfDiagnosis == 'No'){
            setIsConfirmation(false);
            setShowCloseButton(true);
            /*if(discussedAtMDT == 'No')
                setModalText("Unable to proceed if patient has not been discussed at MDT and the stage has not been defined");
            else
                */setModalText("Unable to proceed if the patient is not informed of the diagnosis");
            openModal();
            return;
        }
        if(overseasPatient == 'No'){
            if(!details.NHSNumber || details.NHSNumber == ""){
                setShowCloseButton(true)
                setIsConfirmation(false)
                setModalText(warning_NHSNumberText)
                openModal()
                return
            }
        }
        if(details && details.DiscussedatMDT == "Yes" && (!details.DateatMDT || details.DateatMDT == "")){
            setIsConfirmation(false);
            setShowCloseButton(true)
            setModalText("Enter date at MDT")
            openModal()
            return
        }
        if(!details.TreatmentDecision || details.TreatmentDecision === ""){
            setIsConfirmation(false);
            setShowCloseButton(true)
            setModalText("Select Treatment Decision")
            openModal()
            return
        }
        if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length != 10)){
            setIsConfirmation(false);
            setShowCloseButton(true)
            setModalText("Enter valid NHS Number")
            openModal()
            return
        }
        else if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length == 10)){
            getPatientData();
        }
        else{
            dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
        }
        //dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralTypeStageStep(refTypeStageStep-1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({title, value}))
        if(title == "DiscussedatMDT"){
            setDiscussedAtMDT(value)
            if(value == 'No'){
                resetControls("DiscussedatMDT")
                //setDisableMDTCtrl(true)
                //setModalText("Unable to proceed if patient has not been discussed at MDT and the stage has not been defined")
                //openModal();
                return;
            }
            else{setDisableMDTCtrl(false)}
        }
        else if(title == "OverseasPatient"){
            setOverseasPatient(value)
            if(value == 'No'){
                resetControls("OverseasPatient")
            }
        }
        else if(title == "PatientAwareofDiagnosis"){
            setAwareOfDiagnosis(value)
            if(value == 'No'){
                resetControls("PatientAwareofDiagnosis")
                setModalText("Unable to proceed if the patient is not informed of the diagnosis")
                openModal();
                return;
            }
        }
    }

    const resetControls = (ctrlsset) => {
        var ctrlsToReset = []
        if(ctrlsset == "PatientAwareofDiagnosis"){
            ctrlsToReset.push("DiscussedatMDT")
        }
        if(ctrlsset == "PatientAwareofDiagnosis" || ctrlsset == "DiscussedatMDT"){
            ctrlsToReset.push("DateatMDT")
            //dispatch(removeDetailField("DateatMDT"))
            //ctrlsToReset.push("TreatmentDecision")
            ctrlsToReset.push("MDTComments")
            //ctrlsToReset.push("OverseasPatient")
        }
        if(ctrlsset == "PatientAwareofDiagnosis" || /*ctrlsset == "DiscussedatMDT" || */ctrlsset == "OverseasPatient"){
            ctrlsToReset.push("HasAssessmentbeenCompleted")
            ctrlsToReset.push("OutcomeofAssessment")
            ctrlsToReset.push("NHSNumber")
        }
        ctrlsToReset.forEach(ctrl => {
            var title = ctrl
            var value = ""
            dispatch(updateDetails({title,value}))
        });
    }

    const onBlurTextHandle = (title, value) => {
        if(title == "NHSNumber"){
            const numberExists = nhsNumbers && nhsNumbers.some((nhsNumber) => nhsNumber.title === value);
            if(numberExists)
            {
                dispatch(setPatientMandatory(false))
                dispatch(setNOKMandatory(false))
                dispatch(setReferMandatory(false))
                dispatch(setTTCMandatory(false))

                value = "Yes"
                setIsConfirmation(false);
                setShowCloseButton(true)
                setModalText("<span style='line-height:28px'>The NHS number used has been recognised as being accepted by a Clatterbridge Cancer Centre Consultant. <br/>Please attach as many reports as you have available for the patient.</span>")
                openModal()
            }
            else
            {
                value = "No"
            }
            title = "IsExistingNHSNumber";
            dispatch(updateDetails({title, value}));
        }
    }

    const treatmentDecisionOptions = [
        { id: 'Radiotherapy', label: 'Radiotherapy' },
        { id: 'Systemictreatment', label: 'Systemic treatment' },
        { id: 'Combinationofsystemictreatmentandradiotherapy', label: 'Combination of systemic treatment and radiotherapy' },
        { id: 'ReferredforOncologyReview', label: 'Inpatient being referred for Oncology review'}
    ];

    const getPatientData = async () => {
        if (pdsApiCallsAttempted >= MAX_ATTEMPTS) {
            setModalText("You have reached the maximum attempts to get patient data. Please continue updating manually or try refreshing.");
            setIsConfirmation(false);
            setShowCloseButton(true);
            openModal();
            return;
        }
        dispatch(setPDSAPICallsCount(pdsApiCallsAttempted+1));
        setTimeout(async ()=> {
            
                try {
                    setIsConfirmation(false)
                    setShowCloseButton(false)
                    setModalText("Validating NHS Number... Please wait.")
                    openModal()
                    var pdsData = await getPDSData(details.NHSNumber);
                    if(pdsData){
                        closeModal()
                        setIsConfirmation(true)
                        setShowCloseButton(false)
                        setConfirmationBtnText("Yes")
                        setConfirmationType("Patient Details Found");
                        const formattedDate = pdsData["Date of Birth"] ? formatDate(pdsData["Date of Birth"]) : "";
                        setModalText("<div>" + 
                                "<div style='line-height:28px'>Please review the details found for the entered NHS Number. Proceed if the information is correct.</div>" +
                                "<div><ul style='text-align:left;line-height:1.6'>" + 
                                    "<li>First Name: " + pdsData["First Name"] + "</li>" +
                                    "<li>Last Name: " + pdsData["Last Name"] + "</li>" +
                                    "<li>Date of Birth: " + formattedDate + "</li>" +
                                "</ul></div>" +
                            "</div>")
                        openModal()
                    }
                    else{
                        //closeModal();
                        //dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
                        unSetPatientDetails()
                    }
                }
                catch (error) {
                    closeModal()
                    unSetPatientDetails()
                }
            
        },100);
    }

    const setPatientDetailsData = (pdsData) => {
        var title="FirstName";
        var value=pdsData["First Name"];
        dispatch(updateDetails({title,value}));
        title="Surname";
        value=pdsData["Last Name"];
        dispatch(updateDetails({title,value}));
        title="MiddleName";
        value=pdsData["Middle Name"];
        dispatch(updateDetails({title,value}));
        title="Title";
        value=pdsData["Title"];
        dispatch(updateDetails({title,value}));
        title="ODSCode";
        value=pdsData["ODSCode"];
        dispatch(updateDetails({title,value}));
        const addressFields = [
            "AddressLine1",
            "AddressLine2",
            "AddressLine3",
            "AddressLine4"
        ];
        const addressLines = (pdsData["Address"] || "").split(',').map(line => line.trim());
        const addressUpdate = addressFields.reduce((acc, field, index) => {
            acc[field] = addressLines[index] || "";
            return acc;
        }, {});
        for (const [title, value] of Object.entries(addressUpdate)) {
            dispatch(updateDetails({ title, value }));
        }
        title="GPPractice";
        value=pdsData["GP Practice"];
        dispatch(updateDetails({title,value}));
        title="GPPracticeAddress";
        value=pdsData["GP Address"];
        dispatch(updateDetails({title,value}));
        title="DateofBirth";
        value=pdsData["Date of Birth"];//formatDateToYYYYMMDD(pdsData["Date of Birth"]);
        dispatch(updateDetails({title,value}));
        title="HomePhoneNumber";
        value=pdsData["Primary Contact Number"];
        dispatch(updateDetails({title,value}));
        title="Sex";
        if(pdsData["Gender"].toLowerCase() == "female")
            value="F";
        else if(pdsData["Gender"].toLowerCase() == "male")
            value="M";
        else 
            value="U";
        dispatch(updateDetails({title,value}));
        title="MobileNumber";
        value=pdsData["Mobile"];
        dispatch(updateDetails({title,value}));
        title="MaritalStatus";
        value=pdsData["Marital Status"];
        dispatch(updateDetails({title,value}));
        title="Ethnicorigin";
        value=pdsData["Ethnicity"];
        dispatch(updateDetails({title,value}));
        title="PostCode";
        value=pdsData["Post Code"];
        dispatch(updateDetails({title,value}));
        title="Religion";
        value=pdsData["Religion"];
        dispatch(updateDetails({title,value}));
        title="EmailAddress";
        value=pdsData["Email"];
        dispatch(updateDetails({title,value}));
        title="SpecialRequirements";
        value=pdsData["Special Requirements"];
        dispatch(updateDetails({title,value}));    
    }

    const unSetPatientDetails = () => {
        var title="FirstName";
        var value="";
        dispatch(updateDetails({title,value}));
        title="Surname";
        dispatch(updateDetails({title,value}));
        title="MiddleName";
        dispatch(updateDetails({title,value}));
        title="Title";
        dispatch(updateDetails({title,value}));
        title="AddressLine1";
        dispatch(updateDetails({ title, value }));
        title="AddressLine2";
        dispatch(updateDetails({ title, value }));
        title="AddressLine3";
        dispatch(updateDetails({ title, value }));
        title="AddressLine4";
        dispatch(updateDetails({ title, value }));
        title="GPPractice";
        dispatch(updateDetails({title,value}));
        title="GPPracticeAddress";
        dispatch(updateDetails({title,value}));
        title="DateofBirth";
        dispatch(updateDetails({title,value}));
        title="HomePhoneNumber";
        dispatch(updateDetails({title,value}));
        title="Sex";
        dispatch(updateDetails({title,value}));
        title="MobileNumber";
        dispatch(updateDetails({title,value}));
        title="MaritalStatus";
        dispatch(updateDetails({title,value}));
        title="Ethnicorigin";
        dispatch(updateDetails({title,value}));
        title="PostCode";
        dispatch(updateDetails({title,value}));
        title="Religion";
        dispatch(updateDetails({title,value}));
        title="EmailAddress";
        dispatch(updateDetails({title,value}));
        title="SpecialRequirements";
        dispatch(updateDetails({title,value}));
        title="ODSCode";
        dispatch(updateDetails({title,value}));
        setShowCloseButton(false);
        setIsConfirmation(true);
        setConfirmationBtnText("Yes")
        setConfirmationType("No Patient Details")
        setModalText("No patient record is found against this NHS number. Do you want continue update Patient Details manually?");
        openModal();
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
    
        const [day, month, year] = dateString.split('/');
    
        const date = new Date(`${year}-${month}-${day}`);
    
        if (!isNaN(date)) {
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
        }
        return "";
      };
    
    return(
        <div>
            <div className="choosestage-header" style={{margin: '40px',width: 'calc(100% - 40px - 10%)', paddingLeft: 'calc(10% - 40px)'}}>
                <div style={{float: 'left'}}>NHS Entitlement Assessment & MDT Outcome</div>
                    <div style={{float: 'right'}}>
                        <button onClick={handleNext} className="buttonCtrl">Next</button>
                        <button onClick={handleBack} className="buttonCtrl" style={{marginRight: '10px'}}>Back</button>
                        {/*<ButtonCtrl className="buttonCtrl" btnText="Next" btnClickHandler={handleCreateReferral} />*/}
                    </div>
            </div>
            <div className="choosestage-container">
                <div style={{display:'inline-block',width:'100%'}}>
                    
                    <div>
                        <FormYesNoBtnsCtrl label="Does the patient know their diagnosis?" onChangeValue={onChangeTextHandle} 
                                    title="PatientAwareofDiagnosis" value={details && details.PatientAwareofDiagnosis} />
                       
                    </div>
                    {awareOfDiagnosis == 'Yes' && (<><br/>

                    <div>
                        <FormYesNoBtnsCtrl label="Has the patient been discussed at MDT and stage defined?" onChangeValue={onChangeTextHandle} 
                                    title="DiscussedatMDT" value={details && details.DiscussedatMDT} />
                    </div>
                    {(discussedAtMDT === 'Yes' || discussedAtMDT === 'No') && (<><br/>
                        <div>
                            <FormDateCtrl label="Date at MDT" onChangeText={onChangeTextHandle} title="DateatMDT" 
                            value={details && details.DateatMDT} isSameRow={true} lblMinWidth={'480px'} dtWidth={'150px'} 
                            isFutureDate={false} disableCtrl={details && details.DiscussedatMDT == "No"} />
                            
                        </div><br/><br/>
                        <div style={{marginBottom:"10px",fontWeight:"bold",color:"#005cbb",fontSize:"20px"}}>Treatment Proposal:</div>
                        {treatmentDecisionOptions.map((option) => (<>
                            <div key={option.id}>
                                <label htmlFor={option.id} style={{minWidth:"475px",display:"inline-block",fontWeight:"600",maxWidth:"475px"}}>{option.label}</label>
                                <input
                                    type="radio"
                                    id={option.id}
                                    title="TreatmentDecision"
                                    value={details && details.TreatmentDecision}
                                    checked={details && details.TreatmentDecision === option.label}
                                    onChange={(e) => onChangeTextHandle("TreatmentDecision", option.label)} 
                                    style={{height:"20px",width:"20px"}}
                                />
                                
                            </div><br/></>
                        ))}
                        {/*<div><br/>
                            <FormTextAreaCtrl label="MDT Comments" onChangeText={onChangeTextHandle} title="MDTComments" 
                            value={details && details.MDTComments} ctrlWidth="633px" disableCtrl={details && details.DiscussedatMDT == "No"}/>
                        </div>*/}
                        
                    <br/>

                    <div>
                        <FormYesNoBtnsCtrl label="Is this patient an Overseas Visitor, Welsh or Scottish patient?" onChangeValue={onChangeTextHandle} 
                                    title="OverseasPatient" value={details && details.OverseasPatient} />
                       
                    </div>
                    {overseasPatient === 'Yes' && (
                        <><br/>
                            <div>
                                <FormYesNoBtnsCtrl label="Patient entitled to NHS treatment" onChangeValue={onChangeTextHandle} 
                                            title="HasAssessmentbeenCompleted" value={details && details.HasAssessmentbeenCompleted} />
                            </div><br/>
                            <div>
                                <FormTextAreaCtrl label="Outcome of NHS Entitlement Assessment" onChangeText={onChangeTextHandle} 
                                    title="OutcomeofAssessment" value={details && details.OutcomeofAssessment} ctrlWidth="633px"/>
                            </div>
                        </>
                    )}
                    <br/>
                    <div><FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" 
                        value={details && details.NHSNumber} ctrlInSameRow={false} lblWidth="480px" ctrlWidth="150px" 
                        onBlurText={onBlurTextHandle} maxLengthValue={10} minLengthValue={10} disallowSpaces={true}/>
                    </div>
                    </>)}
                    
                    </>)}
                        
                    <br/><br/>
                </div>
            
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation}
        confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
                    {modalText}
                </ModalDialog>
        </div>
        </div>
    )
}

export default Questionnaire