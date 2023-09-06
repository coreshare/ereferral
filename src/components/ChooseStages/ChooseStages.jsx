import React, {useEffect, useState} from "react"
import "./ChooseStages.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { getReferralTypeStages } from "../../Services/api";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch,useSelector } from "react-redux";
import { setStage, setStagesList } from "./StagesSlice";
import { updateDetails } from "../DetailsSlice";
import { setReferralTypeStageStep } from "../ReferralTypeSlice";
import { setAppStep } from "../AppSlice";
import { updateReportsList } from "../Reports/ReportsSlice";

const ChooseStages = () => {
    const dispatch = useDispatch();
    const selectedReferralType = useSelector((state) => state.referralType)
    const selectedStage = useSelector(state => state.stage.currentStage)
    
    const refTypeStageStep = useSelector(state => state.referralTypeStageStep)
    const stagesMasterData = useSelector(state => state.stage.stagesData)
    const [stages, setStages] = useState([])

    //const [stages, setStages] = useState([])
    //const [selectedStage, setSelectedStage] = useState(selectedReferralState);
    const [agreed, setAgreed] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [modalText, setModalText] = useState("");

    const handleStageClick = (stage) => {debugger;
        dispatch(setStage(stage))
        let title = "ReferralTypeStage"
        let value = stage.stage
        dispatch(updateDetails({title, value}));
        dispatch(setStage(stage))
        let reportIndex = 0;
        const filteredReports = stage.reports.map(report => {
            return { ReportName: report, IsMain: true, ReportIndex: ++reportIndex }
        });
        dispatch(updateReportsList(filteredReports));
        //setSelectedStage(stage);
    };

    useEffect(() => {
        if(stagesMasterData.length == 0){
            fetchStages();
        }
        filterStagesOnReferralType();
    },[]);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filterStagesOnReferralType = () => {debugger;
        const filteredStages = selectedReferralType
            ? stagesMasterData.filter(stage => stage.title === selectedReferralType)
            : stagesMasterData;

        const groupedStages = filteredStages.reduce((result, item) => {
            const key = `${item.title}-${item.stage}`;
            if (!result[key]) {
                result[key] = {
                    title: item.title,
                    stage: item.stage,
                    reports: []
                };
            }
            result[key].reports.push(item.report);
            return result;
        }, {});
        const finalStages = Object.values(groupedStages);
        setStages(finalStages);
        closeModal();
    }

    const fetchStages = async () => {
        setShowCloseButton(false);
        setModalText("Getting Referral Type Stages... Please wait.");
        openModal();
        var stages = await getReferralTypeStages();//checkonce
        /*var stages = [{title: 'Breast', stage: 'Stage I-II', report: 'Report 1'},
        {title: 'Breast', stage: 'Stage I-II', report: 'Report 11'},
        {title: 'Breast', stage: 'Stage III', report: 'Report 2'},
        {title: 'Breast', stage: 'Stage III', report: 'Report 22'},
        {title: 'Breast', stage: 'Stage IV', report: 'Report 3'},
        {title: 'Lung', stage: 'Stage I-II', report: 'Report 11'},
        {title: 'Lung', stage: 'Stage III', report: 'Report 22'},
        {title: 'Lung', stage: 'Stage IV', report: 'Report 33'},
        {title: 'Lung', stage: 'Mesothelioma', report: 'Report 44'},
        {title: 'Lung', stage: 'Thymoma', report: 'Report 55'}];*/
        
        dispatch(setStagesList(stages))
    }

    const handleBack = () => {
        dispatch(setReferralTypeStageStep(refTypeStageStep-1))
        //goBack();
    }

    const handleCreateReferral = () => {
        if(selectedStage == null){
            setShowCloseButton(true);
            setModalText("Select Stage");
            openModal();
            return;
        }
        if(agreed != "Yes"){
            setShowCloseButton(true);
            setModalText("Select declaration");
            openModal();
            return;
        }
        dispatch(setAppStep(2))
    }

    const handleAgreedClick = (e) => {
        if(e.target.value){
            setAgreed("Yes");
        }
        else{setAgreed("No");}
    }

    return(
        <div>
            <div className="choosestage-container">
                <div className="choosestage-header">
                    <div style={{float: 'left'}}>Please choose a {selectedReferralType} Cancer stage</div>
                    <div style={{float: 'right'}}><button onClick={handleBack} className="backbtn">Back</button></div>
                </div>
                <div className="choosestage-gallery">
                    <div className="leftColumn">
                        {stages.map((stage, index) => (
                        <div><button
                            key={index}
                            onClick={() => handleStageClick(stage)}
                            className={`stagebutton ${selectedStage && selectedStage.stage === stage.stage ? "selected" : ""}`}
                            >
                            {stage.stage}
                        </button><br/></div>
                        ))}
                    </div>
                    <div className="rightColumn">
                        {selectedStage && (
                            <div>
                            <h3 style={{marginTop:'0px',color: '#005cbb'}}>To make a {selectedStage.stage} referral, the following information will be required:</h3>
                                {selectedStage.reports.map((report, index) => (
                                    <div key={index} style={{fontWeight: '600',lineHeight:'30px'}}>{index+1}. {report}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="agreeTerm">
                    The patient has been discussed at an MDT Meeting with all results, stage defined, treatment proposal and 
                    referral to CCC agreed?
                    <input type="checkbox" onClick={handleAgreedClick} />
                </div>
                <div style={{float: 'right'}}>
                    <ButtonCtrl className="btnCreate" btnText="Create a Referral" btnClickHandler={handleCreateReferral} />
                </div>
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton}>
                    <p>{modalText}</p>
                </ModalDialog>
            </div>
        </div>
    )
}

export default ChooseStages
