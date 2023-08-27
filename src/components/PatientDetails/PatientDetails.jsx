import React from "react"

const PatientDetails = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            Patient Details
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default PatientDetails