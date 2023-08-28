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

    const handleStageClick = (stage) => {
        setSelectedStage(stage);
    };

    useEffect(() => {
        openModal();
        fetchStages();
        closeModal();
    },[]);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchStages = async () => {debugger;
        var stages = await getReferralTypeStages();
        const filteredStages = referralType
            ? stages.filter(stage => stage.title === referralType)
            : stages;

        setStages(filteredStages);
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
            alert("select agreed");
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
                    <div style={{float: 'right'}}><button onClick={handleBack}>Back</button></div>
                </div>
                <div className="choosestage-gallery" style={{display: 'inline-block',width: '100%'}}>
                    <div style={{float:'left',width: '40%'}}>
                        <ul>
                            {stages.map((stage, index) => (
                            <li
                                key={index}
                                onClick={() => handleStageClick(stage)}
                                className={selectedStage === stage ? "selected" : ""}
                            >
                                {stage.title} - {stage.stage}
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{float:'left'}}>
                        {selectedStage && (
                            <div>
                            <h3>Reports for {selectedStage.title} - {selectedStage.stage}</h3>
                            <ul>
                                {selectedStage.Report.map((report, index) => (
                                <li key={index}>{report}</li>
                                ))}
                            </ul>
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
                <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                    <p>Getting referral types... Please wait.</p>
                </ModalDialog>
            </div>
        </div>
    )
}

export default ChooseStages
