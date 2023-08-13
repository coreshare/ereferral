import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import EmailForOTP from './components/EmailForOTP/EmailForOTP';
import OTPValidation from './components/OTPValidation/OTPValidation';
import UserForm from './components/UserForm/UserForm';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [otp, setOTP] = useState("");

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleOTPGeneration = (generatedOTP) => {debugger;
    setOTP(generatedOTP);
  };

  return (
    <div className="App">
      {currentStep === 0 && <Home onNext={handleNext} />}
      {currentStep === 1 && <EmailForOTP onNext={handleNext} onOTPGenerate={handleOTPGeneration} />}
      {currentStep === 2 && <OTPValidation onNext={handleNext} generatedOTP={otp} />}
      {currentStep === 3 && <UserForm onNext={handleNext} />}
    </div>
  );
}

export default App;
