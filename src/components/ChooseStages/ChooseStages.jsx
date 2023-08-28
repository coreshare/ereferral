import React, {useEffect, useState} from "react"
import "./ChooseStages.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { getReferralTypeStages } from "../../Services/api";
import ModalDialog from "../ModalDialog/ModalDialog";

const ChooseStages = ({onNext, goBack, referralType, getReferralStage}) => {
    const [stages, setStages] = useState([])
    const [selectedStage, setSelectedStage] = useState(null);
    const [agreed, setAgreed] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCloseButton,setShowCloseButton] = useState(true);
    const [modalText, setModalText] = useState("");

    const handleStageClick = (stage) => {
        setSelectedStage(stage);
    };

    useEffect(() => {
        fetchStages();
    },[]);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchStages = async () => {debugger;
        debugger;
        setShowCloseButton(false);
        setModalText("Getting Referral Type Stages... Please wait.");
        openModal();
        var stages = //await getReferralTypeStages();//checkonce
        [{title: 'Breast', stage: 'Stage I-II', report: 'Report 1'},
        {title: 'Breast', stage: 'Stage I-II', report: 'Report 11'},
        {title: 'Breast', stage: 'Stage III', report: 'Report 2'},
        {title: 'Breast', stage: 'Stage III', report: 'Report 22'},
        {title: 'Breast', stage: 'Stage IV', report: 'Report 3'},
        {title: 'Lung', stage: 'Stage I-II', report: 'Report 11'},
        {title: 'Lung', stage: 'Stage III', report: 'Report 22'},
        {title: 'Lung', stage: 'Stage IV', report: 'Report 33'},
        {title: 'Lung', stage: 'Mesothelioma', report: 'Report 44'},
        {title: 'Lung', stage: 'Thymoma', report: 'Report 55'}];
        const filteredStages = referralType
            ? stages.filter(stage => stage.title === referralType)
            : stages;

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
        /*var stages = await getReferralTypeStages();
        const filteredStages = referralType
            ? stages.filter(stage => stage.title === referralType)
            : stages;
*/
        setStages(finalStages);
        closeModal();
    }

    const returnReferralStage = () => {debugger;
        getReferralStage(selectedStage);
    }

    const handleBack = () => {
        goBack();
    }

    const handleCreateReferral = () => {
        if(agreed == "Yes"){
            returnReferralStage();
            onNext();
        }
        else{
            setShowCloseButton(true);
            setModalText("select agreed");
            openModal();
            //alert("select agreed");
        }
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
                    <div style={{float: 'left'}}>Please choose a {referralType} cancer stage</div>
                    <div style={{float: 'right'}}><button onClick={handleBack} className="backbtn">Back</button></div>
                </div>
                <div className="choosestage-gallery">
                    <div className="leftColumn">
                        {/*<ul>
                            {stages.map((stage, index) => (
                            <li
                                key={index}
                                onClick={() => handleStageClick(stage)}
                                className={selectedStage === stage ? "selected" : ""}
                            >
                                {stage.stage}
                            </li>
                            ))}
                        </ul>*/}
                        {stages.map((stage, index) => (
                        <div><button
                            key={index}
                            onClick={() => handleStageClick(stage)}
                            className={`stagebutton ${selectedStage === stage ? "selected" : ""}`}
                            >
                            {stage.stage}
                        </button><br/></div>
                        ))}
                    </div>
                    <div className="rightColumn">
                        {selectedStage && (
                            <div>
                            <h3 style={{marginTop:'0px',color: '#005cbb'}}>To make a {selectedStage.stage} referral, the following information will be required:</h3>
                            {   selectedStage.reports.map((report, index) => (
                                    <span key={index} style={{fontWeight: '600'}}>{report}</span>
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
