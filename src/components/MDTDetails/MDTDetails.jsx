import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";
import FormCheckBoxCtrl from "../FormCheckBoxCtrl/FormCheckBoxCtrl";

const MDTDetails = ({onNext,getMDTData,mdtData}) => {debugger;
    const [mdtDetails, setMDTDetails] = useState(mdtData)

    const handleNext = () => {
        getMDTData(mdtDetails);
        onNext();
    }

    const onChangeTextHandle = (title, value) => {
        const existingDetail = mdtDetails.find(detail => detail.title === title);

        if (existingDetail) {
            setMDTDetails(prevDetails =>
                prevDetails.map(detail =>
                    detail.title === title ? { ...detail, value } : detail
                )
            );
        } else {
            setMDTDetails(prevDetails =>
                [...prevDetails, { title, value }]
            );
        }
    }

    useEffect(() => {
        return () => {
            getMDTData(mdtDetails);
        }
    }, [mdtDetails]);

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">MDT Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div>
                        <FormCheckBoxCtrl label="Is the Patient Aware of Diagnosis?" onChangeText={onChangeTextHandle} title="PatientAwareofDiagnosis" value={mdtData.find(detail => detail.title === "PatientAwareofDiagnosis")?.value || ""}/><br/>
                        <FormTextAreaCtrl label="MDT Comments" onChangeText={onChangeTextHandle} title="MDTComments" value={mdtData.find(detail => detail.title === "MDTComments")?.value || ""}/><br/>
                        <FormCheckBoxCtrl label="Overseas Patient" onChangeText={onChangeTextHandle} title="OverseasPatient" value={mdtData.find(detail => detail.title === "OverseasPatient")?.value || ""}/><br/>
                        <FormCheckBoxCtrl label="Has Assessment been Completed" onChangeText={onChangeTextHandle} title="HasAssessmentbeenCompleted" value={mdtData.find(detail => detail.title === "HasAssessmentbeenCompleted")?.value || ""}/><br/>
                        <FormTextAreaCtrl label="Outcome of Assessment" onChangeText={onChangeTextHandle} title="OutcomeofAssessment" value={mdtData.find(detail => detail.title === "OutcomeofAssessment")?.value || ""}/>
                    </div>
                </div>
            </div>
            
            <div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                </div>
        </div>
    )
}

export default MDTDetails