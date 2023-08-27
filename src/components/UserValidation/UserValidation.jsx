import React, {useState} from "react";
import EmailOTPRequest from '../EmailOTPRequest/EmailOTPRequest';
import OTPValidation from '../OTPValidation/OTPValidation';
import NHSLogo from '../../Images/NHSLogo.png';
import "./UserValidation.css";

const UserValidation = ({onNext}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOTP] = useState("");

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleOTPGeneration = (generatedOTP) => {
      setOTP(generatedOTP);
    };

    const goToReferralSelection = () => {
        onNext();
    }
    
    return(
        <div class="container">
            <div class="vertical-center">
                <p>
                    <img src={NHSLogo} style={{width: '200px'}}/>
                </p>
                <p class="boldtxt" style={{ lineHeight: '60px', fontSize: '30px' }}>
                    Clatterbridge Cancer Centre<br />
                    Patient Referral Portal
                </p>
                {currentStep === 0 && <EmailOTPRequest onNext={handleNext} onOTPGenerate={handleOTPGeneration} />}
                {currentStep === 1 && <OTPValidation onNext={goToReferralSelection} generatedOTP={otp} />}
            </div>
        </div>
    )
}

export default UserValidation