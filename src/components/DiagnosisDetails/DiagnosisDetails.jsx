import React,{useState,useEffect} from "react"
import FormTextBoxCtrl from "../FormTextBoxCtrl/FormTextBoxCtrl";
import FormTextAreaCtrl from "../FormTextAreaCtrl/FormTextAreaCtrl";

const DiagnosisDetails = ({onNext,getDiagnosisData,diagnosisData}) => {debugger;
    const [diagnosisDetails, setDiagnosisDetails] = useState(diagnosisData)

    const handleNext = () => {
        getDiagnosisData(diagnosisDetails);
        onNext();
    }

    const onChangeTextHandle = (title, value) => {
        const existingDetail = diagnosisDetails.find(detail => detail.title === title);

        if (existingDetail) {
            setDiagnosisDetails(prevDetails =>
                prevDetails.map(detail =>
                    detail.title === title ? { ...detail, value } : detail
                )
            );
        } else {
            setDiagnosisDetails(prevDetails =>
                [...prevDetails, { title, value }]
            );
        }
    }

    useEffect(() => {
        return () => {
            getDiagnosisData(diagnosisDetails);
        }
    }, [diagnosisDetails]);

    return (
        <div className="detailssection">
            <div style={{float:'left'}}>
                <h3 className="detailsHeader">Diagnosis Details</h3>
                <div style={{display:'inline-block',width:'100%'}}>
                    <div style={{marginRight:'200px',float: 'left'}}>
                        <FormTextBoxCtrl label="Tumour Location" onChangeText={onChangeTextHandle} title="TumourLocation" value={diagnosisData.find(detail => detail.title === "TumourLocation")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="Primary Diagnosis" onChangeText={onChangeTextHandle} title="PrimaryDiagnosis" value={diagnosisData.find(detail => detail.title === "PrimaryDiagnosis")?.value || ""}/>
                    </div>
                    <div style={{float:'left'}}>
                        <FormTextBoxCtrl label="CCC Consultant - Medical Oncologist" onChangeText={onChangeTextHandle} title="MedicalOncologistCCCConsultant" value={diagnosisData.find(detail => detail.title === "MedicalOncologistCCCConsultant")?.value || ""}/><br/>
                        <FormTextBoxCtrl label="CCC Consultant - Clinical Oncologist" onChangeText={onChangeTextHandle} title="ClinicalOncologistCCCConsultant" value={diagnosisData.find(detail => detail.title === "ClinicalOncologistCCCConsultant")?.value || ""}/>
                    </div>
                </div>
                <div style={{display:'inline-block',width:'100%'}}><br/>
                    <FormTextAreaCtrl label="Pathway Information" onChangeText={onChangeTextHandle} title="PathwayInformation" value={diagnosisData.find(detail => detail.title === "PathwayInformation")?.value || ""}/><br/>
                    <FormTextAreaCtrl label="Upgrade/Screening/62 Day - including PPI/UPI number/Clock start date" onChangeText={onChangeTextHandle} title="UpgradeScreening" value={diagnosisData.find(detail => detail.title === "UpgradeScreening")?.value || ""}/><br/>
                    <FormTextAreaCtrl label="Diagnostics" onChangeText={onChangeTextHandle} title="Diagnostics" value={diagnosisData.find(detail => detail.title === "Diagnostics")?.value || ""}/>
                </div>
            </div>
            
            <div className="detailsNext">
                    <button onClick={handleNext}>Next</button>
                </div>
        </div>
    )
}

export default DiagnosisDetails