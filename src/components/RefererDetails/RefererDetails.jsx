import React from "react"

const RefererDetails = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            Referer Details
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default RefererDetails