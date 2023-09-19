import React from "react"
import "./LeftNavForDetails.css"
import { useDispatch } from "react-redux"
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice"

const LeftNavForDetails = () => {
    const dispatch = useDispatch()

    const handleGoToStep = (step) => {
        dispatch(setReferralSubmissionStep(step))
    }

    return(
        <div className="leftnav">
            <button onClick={() => handleGoToStep (0)}>Patient Details</button><br/>
            <button onClick={() => handleGoToStep (1)}>Refer Details</button><br/>
            <button onClick={() => handleGoToStep (2)}>Diagnosis Details</button><br/>
            {/*<button onClick={() => handleGoToStep (3)}>MDT Details</button><br/>*/}
            <button onClick={() => handleGoToStep (3)}>Reports</button>
        </div>
    )
}

export default LeftNavForDetails