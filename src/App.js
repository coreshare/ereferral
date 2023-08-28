import React, {useState} from 'react';
import './App.css';
import UserValidation from './components/UserValidation/UserValidation';
import ReferralTypeSelection from './components/ReferralTypeSelection/ReferralTypeSelection';
import ReferralSubmission from './components/ReferralSubmission/ReferralSubmission';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selReferralType, setSelReferralType] = useState(null);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const selectedReferralStage = (stage) => {debugger;
    setSelectedStage(stage)
    if(stage){
      setSelReferralType(stage.title)
    }
    
  }
  
  return (
    <div className="App">
      {currentStep === 0 && <UserValidation onNext={handleNext} />}
      {currentStep === 1 && <ReferralTypeSelection onNext={handleNext} getSelectedReferralStage={selectedReferralStage} />}
      {currentStep === 2 && <ReferralSubmission onNext={handleNext} selectedStage={selectedStage} selectedReferralType={selReferralType} />}
    </div>
  );
}

export default App;
