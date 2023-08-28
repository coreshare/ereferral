import React from "react"

const DiagnosisDetails = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            Diagnosis Details
        </div>
    )
}

export default DiagnosisDetails