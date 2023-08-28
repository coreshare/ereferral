import React, {useState} from "react"
import HomeVideo from "../HomeVideo/HomeVideo";
import ChooseReferralType from "../ChooseReferralType/ChooseReferralType";
import ChooseStages from "../ChooseStages/ChooseStages";
import Header from "../Header/Header";
import "./ReferralTypeSelection.css"

const ReferralTypeSelection = ({onNext,getSelectedReferralStage}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [referralType, setReferralType] = useState("");
    const [referralStage, setReferralStage] = useState(null);
    const [selectedReferralStage, setSelectedReferralStage] = useState(null);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const goToDetails = () => {debugger;
        console.log(selectedReferralStage);
        returnSelectedStage();
        onNext();
    }

    const getReferralType = (referraltype) => {
        setReferralType(referraltype);
    }

    const getReferralStage = (referralstage) => {debugger;
        setSelectedReferralStage(referralstage);
    }

    const returnSelectedStage = () => {debugger;
        getSelectedReferralStage(selectedReferralStage)
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