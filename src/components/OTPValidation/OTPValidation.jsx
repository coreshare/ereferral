import React,{useEffect, useState} from "react";
import './OTPValidation.css';
import { validateOTP } from "../../services/api";

const OTPValidation = ({onNext}) =>{
    const [enteredOTP, setEnteredOTP] = useState("");

    const validateEnteredOTP = async () =>{
        if(enteredOTP != ""){
            var response = await validateOTP(enteredOTP);
            if(response == "Success"){
                alert("OTP has been validated successfully.")
                onNext();
            }
            else{
                alert(response)
            }
        }
        else{
            alert("Enter OTP");
        }
    }

    const handleChange = (e) => {
        setEnteredOTP(e.target.value)
    }

    return(
        <div>
            <div className="container form-container">
                <form className="form">
                    <div className="form-field">
                    <label htmlFor="Address">Validate OTP:</label>
                    <input
                        type="text"
                        className="otp-validation-input"
                        placeholder="Enter OTP"
                        value={enteredOTP}
                        onChange={handleChange}
                    />
                    </div>
                </form>
                <button className="otp-validation-button" onClick={validateEnteredOTP}>Validate</button>
            </div>
        </div>

    )
}
export default OTPValidation