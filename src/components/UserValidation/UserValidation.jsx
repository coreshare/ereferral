import React, { useEffect, useState } from "react";
import EmailOTPRequest from '../EmailOTPRequest/EmailOTPRequest';
import OTPValidation from '../OTPValidation/OTPValidation';
import ClatterbridgeLogo from '../../Images/Clatterbridge-logo.png';
import "./UserValidation.css";
import { useSelector } from "react-redux";
import { getMasterData } from "../../Services/api";

const UserValidation = () => {
    const currentStep = useSelector(state => state.userValidationStep)
    const [appOfflineFlag,setAppOfflineFlag] = useState();

    /*const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOTP] = useState("");

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleOTPGeneration = (generatedOTP) => {
      setOTP(generatedOTP);
    };

    const goToReferralSelection = () => {
        onNext();
    }*/
    useEffect(() => {
        getMasterData("Configurations")
              .then((data) => {
                const offlineConfig = data.find(
                    item => item.Title === "App Offline Flag"
                )

                // Read value safely
                const isOffline =
                    offlineConfig?.Value?.toLowerCase() === "yes"

                setAppOfflineFlag(isOffline)
              })
    },[])

    return(
        <div class="container">
            <div class="vertical-center">
                <p>
                    <img src={ClatterbridgeLogo} style={{width: '320px'}}/>
                </p>

      <div style={{fontSize: "28px", fontWeight: "bold", color:"#005cbb"}}>DEV Portal</div>
                <p class="boldtxt" style={{ lineHeight: '50px', fontSize: '30px', marginTop: '0px' }}>
                    Patient Referral Portal
                </p>
                {appOfflineFlag ? (
                    <>
                        <p class="headline">We'll be back</p>
                        <p class="message">We're busy updating the app for you</p>
                        <p class="message">Please check back later today</p>
                    </>
                ) : (
                    <>
                        {currentStep === 0 && <EmailOTPRequest />}
                        {currentStep === 1 && <OTPValidation />}
                    </>
                )}
                {/*{currentStep === 0 && <EmailOTPRequest />}
                {currentStep === 1 && <OTPValidation />}*/}
            </div>
        </div>
    )
}

export default UserValidation