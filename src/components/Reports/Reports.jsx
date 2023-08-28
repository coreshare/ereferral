import React from "react"

const Reports = ({onNext}) => {
    const handleNext = () => {
        onNext();
    }

    return(
        <div>
            Reports - In-Progress. Please click Next to go to submit page.
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default Reports