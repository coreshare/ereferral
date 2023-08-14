import React from "react";
import './SuccessView.css';

const SuccessView = () => {
    return (
        <div>
            <div className="container form-container">
                <form className="form">
                    Data submitted successfully. Thank you.
                </form>
                <button className="otp-validation-button" onClick={validateOTP}>Validate</button>
            </div>
        </div>
    )
}

export default SuccessView