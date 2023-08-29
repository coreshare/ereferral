import React, { useState } from "react"
import "./Reports.css"

const Reports = ({onNext, selectedStage}) => {debugger;
    const [reports, selectReports] = useState(selectedStage.reports)

    const handleNext = () => {
        onNext();
    }

    return(
        <div>
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Reports</h3>
                {selectedStage.reports.map((report, index) => (
                                    <div key={index} className="report-strip">{report}</div>
                                ))}
            
            </div>
            <div className="detailsNext">
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default Reports