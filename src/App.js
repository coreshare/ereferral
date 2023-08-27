import React, {useState} from 'react';
import './App.css';
import UserValidation from './components/UserValidation/UserValidation';
import ReferralTypeSelection from './components/ReferralTypeSelection/ReferralTypeSelection';
import ReferralSubmission from './components/ReferralSubmission/ReferralSubmission';

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="App">
      {currentStep === 0 && <UserValidation onNext={handleNext} />}
      {currentStep === 1 && <ReferralTypeSelection onNext={handleNext} />}
      {currentStep === 2 && <ReferralSubmission onNext={handleNext} />}
    </div>
  );
}

export default App;
