import React, { useState, useEffect } from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormDateCtrl from "../FormDateCtrl/FormDateCtrl";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../DetailsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { setAppStep } from "../AppSlice";
import FormSelectCtrl from "../FormSelectCtrl/FormSelectCtrl";
import ModalDialog from "../ModalDialog/ModalDialog";
import { setLeftNavClearLinkText, setNOKMandatory, setPatientMandatory, setPDSAPICallsCount, setReferMandatory, setTTCMandatory } from "../SharedStringsSlice";
import {warning_ValidEmailText,warning_MandatoryText} from "../Config.js";
import { getPDSData } from "../../Services/api.js";

const PatientDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector((state) => state.details)
    const currentStep = useSelector(state => state.referralSubmissionStep)
    const listData = useSelector(state => state.masterData)
    const [maritalStatusList,setMaritalStatusList] = useState([])
    const [religionsList,setReligionsList] = useState([])
    const [ethnicoriginsList,setEthnicoriginsList] = useState([])
    const [covidDataList,setCovidDataList] = useState([])
    const [sexDataList,setSexDataList] = useState([])
    const [specialRequirementsDataList,setSpecialRequirementsDataList] = useState([])
    const [titlesList,setTitlesDataList] = useState([])
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCloseButton,setShowCloseButton] = useState(true)
    const [modalText, setModalText] = useState("")
    const nhsNumbers = useSelector(state => state.masterData.NHSNumbers)
    //const [enableRedBorder, setEnableRedBorder] = useState(false)
    const enableRedBorder = useSelector(state => state.sharedStrings.enablePatientMandatory)
    const mandatoryFlag = true//useSelector(state => state.details.IsExistingNHSNumber === 'Yes' ? false : true)
    const pdsApiCallsAttempted = useSelector(state => state.sharedStrings.pdsAPICallsCount)
    const MAX_ATTEMPTS = 5;
    
    useEffect(() => {
        dispatch(setLeftNavClearLinkText("Patient"))
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
        if(listData.SpecialRequirements){
            setSpecialRequirementsDataList(listData.SpecialRequirements.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.SexOptions){
            setSexDataList(listData.SexOptions.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        if(listData.Titles){
            setTitlesDataList(listData.Titles.map((status) => ({
                label: status.title,
                value: status.title
            })))
        }
        //getPatientData();
    },[])//details

    const getPatientData = async () => {
        if (pdsApiCallsAttempted >= MAX_ATTEMPTS) {
            setModalText("You have reached the maximum attempts to get patient data. Please continue updating manually or try refreshing.");
            setShowCloseButton(true);
            openModal();
            return;
        }
        dispatch(setPDSAPICallsCount(pdsApiCallsAttempted+1));
        
        setTimeout(async ()=> {
            if(details.NHSNumber && details.NHSNumber != ""){
                try {
                    var pdsData = await getPDSData(details.NHSNumber);
                    if(pdsData){
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
                        value=formatDateToYYYYMMDD(pdsData["Date of Birth"]);//pdsData["Date of Birth"];//
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
                } catch (error) {
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
                    setShowCloseButton(true);
                    setModalText("No patient record is found against this NHS number. Please complete the remaining fields manually.");
                    openModal();
                    return
                }
            }
        },100);
    }
    const formatDateToYYYYMMDD = (date) => {
        if (!date) return '';
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
      };

    const handleNext = () => {
        if (checkFieldsValidation()){
            setShowCloseButton(true)
            openModal()
            return
        }
        dispatch(setReferralSubmissionStep(currentStep + 1))
    }
    const checkFieldsValidation = () => {
        var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
        const patientMandatoryFields = ['Surname','FirstName','DateofBirth','HomePhoneNumber']

        const patientMFDN = {}
        patientMFDN["Surname"] = "Last Name"
        patientMFDN["FirstName"] = "First Name"
        patientMFDN["DateofBirth"] = "Date of Birth"
        patientMFDN["HomePhoneNumber"] = "Primary Contact Number"
        var emptyFields = []
        var hasMFToFill = false

        //if(details && details.IsExistingNHSNumber != "Yes"){
        for (const fieldName of patientMandatoryFields) {
            if (!details.hasOwnProperty(fieldName) || details[fieldName] === "") {
                emptyFields.push(patientMFDN[fieldName])
                hasMFToFill = true
            }
        }
        //}

        if(details.OverseasPatient == 'No'){
            if(!details.NHSNumber || details.NHSNumber == ""){
                emptyFields.push("NHS number")
            } 
        }
        
        if (emptyFields.length > 0) {
            errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
            setModalText(errorMsg)
            //setEnableRedBorder(true)
            const title = "enablePatientMandatory"
            const value = true
            dispatch(setPatientMandatory({title, value}))
            return true
        }
        else if(details.NHSNumber && details.NHSNumber != "" && (details.NHSNumber.length < 10 || details.NHSNumber.length > 10)){
            setModalText("Enter valid NHS Number")
            return true
        }
        else if(details.HomePhoneNumber && details.HomePhoneNumber != "" && (details.HomePhoneNumber.length != 11)){
            setModalText("Enter valid Primary Contact Number")
            return true
        }
        else if(details.MobileNumber && details.MobileNumber != "" && (details.MobileNumber.length != 11)){
            setModalText("Enter valid Mobile / Home Number")
            return true
        }
        else if(details.EmailAddress && details.EmailAddress != "" && !(emailPattern.test(details.EmailAddress))){
            setModalText(warning_ValidEmailText)
            return true
        }//06022026
        else if(details.DateofBirth && details.DateofBirth != "" && !isValidSharePointDate(details.DateofBirth)){
            setModalText("Enter a valid Date of Birth (after 01/01/1753)")
            return true
        }
        return false
    }//06022026
    const isValidSharePointDate = (value) => {
        if (!value) return false;

        const date = new Date(value);
        if (isNaN(date.getTime())) return false;

        const min = new Date("1753-01-01");
        const max = new Date("9999-12-31");

        return date >= min && date <= max;
    }
    const handleBack = () => {
        /*if (checkFieldsValidation()){
            setShowCloseButton(true)
            openModal()
            return
        }*/
        dispatch(setAppStep(1))
    }

    const onChangeTextHandle = (title, value) => {
        dispatch(updateDetails({ title, value }));
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
                setShowCloseButton(true)
                setModalText("<span style='line-height:28px'>The NHS number used has been recognised as being accepted by a Clatterbridge Cancer Centre Consultant. <br/>Please attach as many reports as you have available for the patient.</span>")
                openModal()
            }
            else
            {
                value = "No"
            }
            title = "IsExistingNHSNumber";
            dispatch(updateDetails({title, value}))
            //getPatientData();
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="detailssection">
            <div style={{display:"inline-block",width:"100%"}}>
                    <h3 className="detailsHeader" style={{float:"left"}}>Patient Details</h3>
                    <div className="detailsNext" style={{float:"right"}}>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
                    </div>
                </div>
            <div style={{float:'left'}}>
                
                
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="NHS Number" onBlurText={onBlurTextHandle} onChangeText={onChangeTextHandle} title="NHSNumber" value={details && details.NHSNumber} maxLengthValue={10} disallowSpaces={true} 
                            isMandatory={mandatoryFlag && details.OverseasPatient === 'No'} disableCtrl={true} enableRedBorder={enableRedBorder && details.OverseasPatient === 'No' && (!details.NHSNumber || details.NHSNumber === "")} /><br/>
                        <FormTextBoxCtrl label="Last Name" onChangeText={onChangeTextHandle} title="Surname" value={details && details.Surname} onlyText={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.Surname || details.Surname === "")}/><br/>
                        <FormTextBoxCtrl label="First Name" onChangeText={onChangeTextHandle} title="FirstName" value={details && details.FirstName} onlyText={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.FirstName || details.FirstName === "")}/><br/>
                        <FormTextBoxCtrl label="Middle Name" onChangeText={onChangeTextHandle} title="MiddleName" value={details && details.MiddleName} onlyText={true}/><br/>
                        <FormSelectCtrl label="Title" onChangeText={onChangeTextHandle} title="Title" value={details && details.Title} options={titlesList}/><br/>
                        <FormDateCtrl label="Date of Birth" onChangeText={onChangeTextHandle} title="DateofBirth" value={details && details.DateofBirth} dtWidth="320px" isMandatory={mandatoryFlag} isFutureDate={false} enableRedBorder={enableRedBorder && (!details.DateofBirth || details.DateofBirth === "")}/><br/>
                        <FormSelectCtrl label="Sex" onChangeText={onChangeTextHandle} title="Sex" value={details && details.Sex} options={sexDataList}/><br/>
                        <FormSelectCtrl label="Marital Status" onChangeText={onChangeTextHandle} title="MaritalStatus" value={details && details.MaritalStatus} options={maritalStatusList}/><br/>
                        <FormSelectCtrl label="Ethnicity" onChangeText={onChangeTextHandle} title="Ethnicorigin" value={details && details.Ethnicorigin} options={ethnicoriginsList}/><br/>
                        <FormSelectCtrl label="Religion" onChangeText={onChangeTextHandle} title="Religion" value={details && details.Religion} options={religionsList}/><br/>
                        <FormSelectCtrl label="Special Requirements" onChangeText={onChangeTextHandle} title="SpecialRequirements" value={details && details.SpecialRequirements} options={specialRequirementsDataList}/><br/>
                        {1==2 && <FormTextBoxCtrl label="ODS Code" onChangeText={onChangeTextHandle} title="ODSCode" value={details && details.ODSCode} onlyText={true} />}
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="Address Line 1" onChangeText={onChangeTextHandle} title="AddressLine1" value={details && details.AddressLine1}/><br/>
                        <FormTextBoxCtrl label="Address Line 2" onChangeText={onChangeTextHandle} title="AddressLine2" value={details && details.AddressLine2}/><br/>
                        <FormTextBoxCtrl label="Address Line 3" onChangeText={onChangeTextHandle} title="AddressLine3" value={details && details.AddressLine3}/><br/>
                        <FormTextBoxCtrl label="Address Line 4" onChangeText={onChangeTextHandle} title="AddressLine4" value={details && details.AddressLine4}/><br/>
                        <FormTextBoxCtrl label="Post Code" onChangeText={onChangeTextHandle} title="PostCode" value={details && details.PostCode}/><br/>
                        <FormTextBoxCtrl label="Primary Contact Number" onChangeText={onChangeTextHandle} title="HomePhoneNumber" value={details && details.HomePhoneNumber} maxLengthValue={11} disallowSpaces={true} isMandatory={mandatoryFlag} enableRedBorder={enableRedBorder && (!details.HomePhoneNumber || details.HomePhoneNumber === "")}/><br/>
                        <FormTextBoxCtrl label="Mobile / Home Number (if not listed above)" onChangeText={onChangeTextHandle} title="MobileNumber" value={details && details.MobileNumber} maxLengthValue={11} disallowSpaces={true}/><br/>
                        <FormTextBoxCtrl label="Email Address" onChangeText={onChangeTextHandle} title="EmailAddress" value={details && details.EmailAddress}/><br/>
                    </div>
                </div>
            </div>
            
            
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isHtmlContent={true}>
                {modalText}
            </ModalDialog>
        </div>
    )
}

export default PatientDetails;
