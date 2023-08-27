import React from "react"

const DiagnosisDetails = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            Diagnosis Details
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default DiagnosisDetails