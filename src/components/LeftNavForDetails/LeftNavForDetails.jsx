import React from "react"

const LeftNavForDetails = ({goToStep}) => {

    const handleGoToStep = (stepToGo) =>{
        goToStep(stepToGo);
    }

    return(
        <div>
            <button onClick={() => handleGoToStep (0)}>Patient Details</button>
            <button onClick={() => handleGoToStep (1)}>Refer Details</button>
            <button onClick={() => handleGoToStep (2)}>Diagnosis Details</button>
            <button onClick={() => handleGoToStep (3)}>MDT Details</button>
            <button onClick={() => handleGoToStep (4)}>Reports</button>
        </div>
    )
}

export default LeftNavForDetails