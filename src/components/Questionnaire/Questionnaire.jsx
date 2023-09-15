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
import { getMasterData } from "../../Services/api";

const Questionnaire = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const [discussedAtMDT, setDiscussedAtMDT] = useState(details.DiscussedatMDT);
    const [overseasPatient, setOverseasPatient] = useState(details.OverseasPatient);
    const [awareOfDiagnosis, setAwareOfDiagnosis] = useState(details.PatientAwareofDiagnosis);
    const refTypeStageStep = useSelector(state => state.referralTypeStageStep)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [modalText, setModalText] = useState("");
    const nhsNumbers = useSelector(state => state.masterData.NHSNumbers)
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

    const handleNext = () => {
        if(discussedAtMDT == undefined || awareOfDiagnosis == undefined || overseasPatient == undefined){
            setShowCloseButton(true);
            setModalText("Complete questionnaire");
            openModal()
            return
        }
        if(discussedAtMDT == 'No' || awareOfDiagnosis == 'No'){
            setShowCloseButton(true);
            if(discussedAtMDT == 'No')
                setModalText("Cannot continue if not discussed at MDT");
            else
                setModalText("Cannot continue if patient not aware of diagnosis");
            openModal();
            return;
        }
        //dispatch(setReferralSubmissionStep(0))
        //dispatch(setAppStep(2))
        dispatch(setReferralTypeStageStep(refTypeStageStep + 1))
    }

    const handleBack = () => {
        dispatch(setReferralTypeStageStep(refTypeStageStep-1))
    }

    const onChangeTextHandle = (title, value) => {
        
        dispatch(updateDetails({title, value}))
        if(title == "DiscussedatMDT"){
            setDiscussedAtMDT(value)
        }
        else if(title == "OverseasPatient"){
            setOverseasPatient(value)
        }
        else if(title == "PatientAwareofDiagnosis"){
            setAwareOfDiagnosis(value)
        }
    }

    const onBlurTextHandle = (title, value) => {
        if(title == "NHSNumber"){
            const numberExists = nhsNumbers.some((nhsNumber) => nhsNumber.title === value);
            if(numberExists)
            {
                value = "Yes"
                setShowCloseButton(true)
                setModalText("As NHS Number already available, no need to upload all reports again.")
                openModal()
            }
            else
            {
                value = "No"
            }
            title = "IsExistingNHSNumber";
            dispatch(updateDetails({title, value}))
        }
    }

    return(
        <div>
            <div className="choosestage-container">
                <div className="choosestage-header">
                    <div style={{float: 'left'}}>NHS entitlement assessment & MDT Outcome</div>
                    <div style={{float: 'right'}}>
                        <button onClick={handleNext} className="buttonCtrl">Next</button>
                        <button onClick={handleBack} className="buttonCtrl" style={{marginRight: '10px'}}>Back</button>
                        {/*<ButtonCtrl className="buttonCtrl" btnText="Next" btnClickHandler={handleCreateReferral} />*/}
                    </div>
                </div>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div><FormTextBoxCtrl label="NHS Number" onChangeText={onChangeTextHandle} title="NHSNumber" 
                        value={details && details.NHSNumber} ctrlInSameRow={false} lblWidth="480px" ctrlWidth="150px" 
                        onBlurText={onBlurTextHandle}/></div><br/>

                    <div>
                        {/*<FormSelectCtrl label="Has the patient been discussed at MDT and stage defined?" onChangeValue={onChangeTextHandle} 
                                    title="DiscussedatMDT" value={details && details.DiscussedatMDT}/>*/}
                        <FormYesNoBtnsCtrl label="Has the patient been discussed at MDT and stage defined?" onChangeValue={onChangeTextHandle} 
                                    title="DiscussedatMDT" value={details && details.DiscussedatMDT} />
                                    {/* If No, dont allow to go to Next */}
                        {discussedAtMDT === 'No' && (<label>Will not be allowed to continue if No.</label>)}
                    </div>
                    {discussedAtMDT === 'Yes' && (<><br/>
                        <div>
                            <FormDateCtrl label="Date at MDT" onChangeText={onChangeTextHandle} title="DateatMDT" 
                            value={details && details.DateatMDT} isSameRow={true} lblMinWidth={'480px'} dtWidth={'150px'}/>
                            
                        </div>
                        </>
                    )}
                    <br/>

                    <div>
                        {/*<FormSelectCtrl label="Does the patient know their diagnosis?" onChangeValue={onChangeTextHandle} 
                                    title="PatientAwareofDiagnosis" value={details && details.PatientAwareofDiagnosis}/>*/}
                        <FormYesNoBtnsCtrl label="Does the patient know their diagnosis?" onChangeValue={onChangeTextHandle} 
                                    title="PatientAwareofDiagnosis" value={details && details.PatientAwareofDiagnosis} />
                       
                    </div>
                    <br/>

                    <div>
                        {/*<FormSelectCtrl label="Overseas patient?" onChangeValue={onChangeTextHandle} 
                                    title="OverseasPatient" value={details && details.OverseasPatient}/>*/}
                        <FormYesNoBtnsCtrl label="Overseas patient?" onChangeValue={onChangeTextHandle} 
                                    title="OverseasPatient" value={details && details.OverseasPatient} />
                       
                    </div>
                    {overseasPatient === 'Yes' && (
                        <><br/>
                            <div>
                                {/*<FormSelectCtrl label="NHS Entitlement?" onChangeValue={onChangeTextHandle} 
                                    title="HasAssessmentbeenCompleted" value={details && details.HasAssessmentbeenCompleted}/>*/}
                                <FormYesNoBtnsCtrl label="NHS Entitlement?" onChangeValue={onChangeTextHandle} 
                                            title="HasAssessmentbeenCompleted" value={details && details.HasAssessmentbeenCompleted} />
                            </div><br/>
                            <div>
                                <FormTextAreaCtrl label="Outcome of Assessment" onChangeText={onChangeTextHandle} 
                                    title="OutcomeofAssessment" value={details && details.OutcomeofAssessment} ctrlWidth="633px"/>
                            </div>
                        </>
                    )}
                    
                </div>
            
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
                    {modalText}
                </ModalDialog>
        </div>
        </div>
    )
}

export default Questionnaire