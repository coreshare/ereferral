import React, {useState} from "react"
import PatientDetails from "../PatientDetails/PatientDetails";
import RefererDetails from "../RefererDetails/RefererDetails";
import DiagnosisDetails from "../DiagnosisDetails/DiagnosisDetails";
import MDTDetails from "../MDTDetails/MDTDetails";
import Reports from "../Reports/Reports";
import SubmitReferral from "../SubmitReferral/SubmitReferral";
import SuccessView from "../SuccessView/SuccessView";
import LeftNavForDetails from "../LeftNavForDetails/LeftNavForDetails";

const ReferralSubmission = ({onNext,selectedStage}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientData, setPatientData] = useState([])
  const [referData, setReferData] = useState([])

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleLeftNav = (step) => {
    setCurrentStep(step)
  }

  const getPatientData = (data) => {
    setPatientData(data);
  }
  const getReferData = (data) => {
    setReferData(data);
  }

  return (
    <div className="App">
      <div style={{display:'inline-block',width:'100%'}}>
        {(currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4) &&  
        <div style={{float:'left',width:'30%'}}><LeftNavForDetails goToStep={handleLeftNav}/></div>}
        <div style={{float:'left'}}>
          {currentStep === 0 && <PatientDetails onNext={handleNext} getPatientData={getPatientData} patientData={patientData}/>}
          {currentStep === 1 && <RefererDetails onNext={handleNext} getReferData={getReferData} referData={referData} />}
          {currentStep === 2 && <DiagnosisDetails onNext={handleNext} />}
          {currentStep === 3 && <MDTDetails onNext={handleNext} />}
          {currentStep === 4 && <Reports onNext={handleNext} patientData={patientData} referData={referData} />}
          {currentStep === 5 && <SubmitReferral onNext={handleNext} />}
          {currentStep === 6 && <SuccessView onNext={handleNext} />}
          <div>
              {patientData.map((detail, index) => (
                  <p key={index}>{detail.title}: {detail.value}</p>
              ))}
          </div>
          <div>
              {referData.map((detail, index) => (
                  <p key={index}>{detail.title}: {detail.value}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralSubmission