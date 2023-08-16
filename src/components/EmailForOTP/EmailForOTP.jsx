import React, { useState } from "react";
import './EmailForOTP.css';
import { generateOTP } from "../../services/api";

const EmailForOTP = ({onNext,onOTPGenerate}) =>{
    const [email,SetEmail] = useState("");

    const handleNext = async () =>{
        if(email == "devops@coreshare.co.uk" || email == "ivy@coreshare.co.uk" || email == "keith@coreshare.co.uk" || 
            email == "tony@coreshare.co.uk" || email == "pete@coreshare.co.uk")
        {
            //generateOTP();
            await generateOTP(email);
            onNext();
        }
        else{
            alert("Email address is not valid.");
        }
    }

    const generateOTP1 = async () => {
        /*const otp = Math.floor(100000 + Math.random() * 900000);
        onOTPGenerate(otp);
        var otpJson = {
            emailTo: email,
            emailSubject: "e-Referral OTP",
            emailBody: "Please enter this OTP in e-Referral system. <br/>" + otp
        };
        emailOTP(otpJson);*/
        //await generateOTP();
      }

      const handleChange = (e) => {
        SetEmail(e.target.value);
      }

    return(
        <div>
        <div className="container form-container">
        <form className="form">
            <div className="form-field">
            <label htmlFor="Address">Email Address:</label>
            <input
                type="text"
                className="email-for-otp-input"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
            />
            </div>
        </form>
        <button className="email-for-otp-button" onClick={handleNext}>Request OTP</button>
        </div>
        </div>
    )
}
export default EmailForOTP