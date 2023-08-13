import React, { useState } from "react";
import './EmailForOTP.css';
import { emailOTP } from "../../services/api";

const EmailForOTP = ({onNext,onOTPGenerate}) =>{
    const [email,SetEmail] = useState("");

    const handleNext = () =>{
        generateOTP();
        onNext();
    }

    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        onOTPGenerate(otp);
        var otpJson = {
            emailTo: email,
            emailSubject: "e-Referral OTP",
            emailBody: "Please enter this OTP in e-Referral system. <br/>" + otp
        };
        emailOTP(otpJson);
      }

      const handleChange = (e) => {
        SetEmail(e.target.value);
      }

    return(
        <div className="container email-for-otp-container">
            <input
                type="text"
                className="email-for-otp-input"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
            />
            <button className="email-for-otp-button" onClick={handleNext}>Request OTP</button>
        </div>
    )
}
export default EmailForOTP