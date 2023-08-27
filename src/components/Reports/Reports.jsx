import React from "react"

const Reports = ({onNext}) => {

    const handleNext = () =>{
        onNext();
    }

    return(
        <div>
            Reports
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Reports