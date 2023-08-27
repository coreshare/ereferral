import React from "react"

const SubmitReferral = ({onNext}) => {

    const handleNext = () => {
        onNext();
    }
    
    return(
        <div>
            Submit Referral
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default SubmitReferral