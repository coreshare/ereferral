import React, {useState} from "react"
import PatientDetails from "../PatientDetails/PatientDetails";
import RefererDetails from "../RefererDetails/RefererDetails";
import DiagnosisDetails from "../DiagnosisDetails/DiagnosisDetails";
import MDTDetails from "../MDTDetails/MDTDetails";
import Reports from "../Reports/Reports";
import SubmitReferral from "../SubmitReferral/SubmitReferral";
import SuccessView from "../SuccessView/SuccessView";
import LeftNavForDetails from "../LeftNavForDetails/LeftNavForDetails";
import Header from "../Header/Header";
import "./ReferralSubmission.css"

const ReferralSubmission = ({onNext,selectedStage}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientData, setPatientData] = useState([])
  const [referData, setReferData] = useState([])
  const [diagnosisData, setDiagnosisData] = useState([])
  const [mdtData, setMDTData] = useState([])

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleLeftNav = (step) => {
    setCurrentStep(step)
  }

  const getPatientData = (data) => {debugger;
    setPatientData(data);
  }
  const getReferData = (data) => {debugger;
    setReferData(data);
  }
  const getDiagnosisData = (data) => {debugger;
    setDiagnosisData(data);
  }
  const getMDTData = (data) => {debugger;
    setMDTData(data);
  }
  return (
    <div className="App">
      <div style={{display:'inline-block',width:'100%'}}>
        <Header />
        <div style={{padding: '40px'}}>
          {(currentStep === 0 || currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4) &&  
          <div style={{float:'left',width:'20%'}}><LeftNavForDetails goToStep={handleLeftNav}/></div>}
          <div style={{float:'left',width:'80%'}}>
            {currentStep === 0 && <PatientDetails onNext={handleNext} getPatientData={getPatientData} patientData={patientData}/>}
            {currentStep === 1 && <RefererDetails onNext={handleNext} getReferData={getReferData} referData={referData} />}
            {currentStep === 2 && <DiagnosisDetails onNext={handleNext} getDiagnosisData={getDiagnosisData} diagnosisData={diagnosisData}  />}
            {currentStep === 3 && <MDTDetails onNext={handleNext} getMDTData={getMDTData} mdtData={mdtData}  />}
            {currentStep === 4 && <Reports onNext={handleNext} />}
            {currentStep === 5 && <SubmitReferral onNext={handleNext} patientData={patientData} referData={referData} diagnosisData={diagnosisData} mdtData={mdtData} />}
            {currentStep === 6 && <SuccessView onNext={handleNext} />}
            {/*<div>
                {patientData.map((detail, index) => (
                    <p key={index}>{detail.title}: {detail.value}</p>
                ))}
            </div>
            <div>
                {referData.map((detail, index) => (
                    <p key={index}>{detail.title}: {detail.value}</p>
                ))}
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralSubmission