import React, {useState} from "react"
import PatientDetails from "../PatientDetails/PatientDetails";
import RefererDetails from "../RefererDetails/RefererDetails";
import DiagnosisDetails from "../DiagnosisDetails/DiagnosisDetails";
import MDTDetails from "../MDTDetails/MDTDetails";
import Reports from "../Reports/Reports";
import SubmitReferral from "../SubmitReferral/SubmitReferral";
import SuccessView from "../SuccessView/SuccessView";
import LeftNavForDetails from "../LeftNavForDetails/LeftNavForDetails";

const ReferralSubmission = ({onNext}) => {
    const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleLeftNav = (step) => {
    setCurrentStep(step)
  }

  return (
    <div className="App">
      {(currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4) &&  
        <LeftNavForDetails goToStep={handleLeftNav}/>}
      {currentStep === 0 && <PatientDetails onNext={handleNext} />}
      {currentStep === 1 && <RefererDetails onNext={handleNext} />}
      {currentStep === 2 && <DiagnosisDetails onNext={handleNext} />}
      {currentStep === 3 && <MDTDetails onNext={handleNext} />}
      {currentStep === 4 && <Reports onNext={handleNext} />}
      {currentStep === 5 && <SubmitReferral onNext={handleNext} />}
      {currentStep === 6 && <SuccessView onNext={handleNext} />}
    </div>
  );
}

export default ReferralSubmission