import React from "react"

const MDTDetails = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            MDT Details
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default MDTDetails