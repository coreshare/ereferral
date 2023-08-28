import React, {useEffect, useState} from "react"
import "./ChooseStages.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";
import { getReferralTypeStages } from "../../Services/api";

const ChooseStages = ({onNext, goBack, referralType, getReferralStage}) => {
    const [stages, setStages] = useState([])
    useEffect(() => {
        debugger;
        fetchStages();
    },[]);

    const fetchStages = async () => {
        var stages = await getReferralTypeStages();
        setStages(stages);
    }

    const handleNext = () => {
        onNext();
    }

    const handleBack = () => {
        goBack();
    }

    const handleCreateReferral = () => {

    }

    return(
        <div>
            <div className="choosestage-container">
                <div className="choosestage-header">
                    <div style={{float: 'left'}}>Please choose a {referralType} cancer stage</div>
                    <div style={{float: 'right'}}><button onClick={handleBack}>Back</button></div>
                </div>
                <div className="choosestage-gallery">{stages.Count()}
                    <ul>
                        {stages.map((stage, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {stage.Title}, <strong>Stage:</strong> {stage.Stage}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="agreeTerm">
                    The patient has been discussed at an MDT Meeting with all results, stage defined, treatment proposal and 
                    referral to CCC agreed?
                    <input type="checkbox" />
                </div>
                <div style={{float: 'right'}}>
                    <ButtonCtrl className="btnCreate" btnText="Create a Referral" btnClickHandler={handleCreateReferral} />
                </div>
                
            </div>
        </div>
    )
}

export default ChooseStages