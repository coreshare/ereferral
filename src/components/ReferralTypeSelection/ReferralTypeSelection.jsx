import React, {useEffect, useState} from "react"
import HomeVideo from "../HomeVideo/HomeVideo";
import ChooseReferralType from "../ChooseReferralType/ChooseReferralType";
import ChooseStages from "../ChooseStages/ChooseStages";
import Header from "../Header/Header";
import "./ReferralTypeSelection.css"

const ReferralTypeSelection = ({onNext,getSelectedReferralStage}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [referralType, setReferralType] = useState("");
    const [selReferralStage, setSelectedReferralStage] = useState(null);

    useEffect(() => {
        
    },[selReferralStage])
    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const goToDetails = (stage) => {
        getSelectedReferralStage(stage);
        onNext();
    }

    const getReferralType = (referraltype) => {
        setReferralType(referraltype);
    }

    const getReferralStage = (referralstage) => {
        setSelectedReferralStage(referralstage);
    }

    const returnSelectedStage = () => {
        getSelectedReferralStage(selReferralStage)
    }
    
    return(
        <div>
            <Header />
            {currentStep === 0 && <HomeVideo onNext={handleNext} />}
            {currentStep === 1 && <ChooseReferralType onNext={handleNext} getReferralType={getReferralType} />}
            {currentStep === 2 && <ChooseStages onNext={goToDetails} goBack={handleBack} referralType={referralType} 
                getReferralStage={getReferralStage} />}
        </div>
    )
}

export default ReferralTypeSelection