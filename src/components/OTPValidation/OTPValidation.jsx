import React,{useEffect, useState} from "react";
import './OTPValidation.css';

const OTPValidation = ({onNext, generatedOTP}) =>{
    const [enteredOTP, setEnteredOTP] = useState("");

    const validateOTP = () =>{
        if(enteredOTP == generatedOTP){
            onNext();
        }
        else{
            alert("Entered OTP is not valid")
        }
    }

    const handleChange = (e) => {
        setEnteredOTP(e.target.value)
    }

    return(
        <div className="container otp-validation-container">
            <input
                type="text"
                className="otp-validation-input"
                placeholder="Enter OTP"
                value={enteredOTP}
                onChange={handleChange}
            />
            <button className="otp-validation-button" onClick={validateOTP}>Validate</button>
        </div>
    )
}
export default OTPValidation