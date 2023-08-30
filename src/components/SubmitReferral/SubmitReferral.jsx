import React,{useState,useEffect, cloneElement} from "react"
import FormDataSet from '../../Models/FormDataSet'
import ModalDialog from "../ModalDialog/ModalDialog";
import { saveData, uploadFileToLib } from "../../Services/api";
import "./SubmitReferral.css"
import ButtonCtrl from "../ButtonCtrl/ButtonCtrl";

const SubmitReferral = ({onNext, patientData, referData, diagnosisData, mdtData,reports,selectedReferralType,selectedStage}) => {
    const [formData, setFormData] = useState(new FormDataSet);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        const updatedFormData = { ...formData };
        patientData.forEach((detail) => {
            updatedFormData[detail.title] = detail.value;
        });
        referData.forEach((detail) => {
            updatedFormData[detail.title] = detail.value;
        });
        diagnosisData.forEach((detail) => {
            updatedFormData[detail.title] = detail.value;
        });
        mdtData.forEach((detail) => {
            updatedFormData[detail.title] = detail.value;
        });
        updatedFormData["ReferralType"] = selectedReferralType;
        updatedFormData["ReferralTypeStage"] = selectedStage.stage;
        setFormData(updatedFormData);
    },[patientData,referData])

    const onSubmitHandle = async () =>{
        openModal();
        var itemId = await saveData(formData);
        console.log(itemId);
        var reportsMetadata = {};debugger;
        for(var i=0;i < reports.length;i++){
            if(!reportsMetadata.hasOwnProperty(reports[i].name))
            {
                reportsMetadata[reports[i].ReportFile.name] = {};
            }
            reportsMetadata[reports[i].ReportFile.name].ReportID=itemId;
            reportsMetadata[reports[i].ReportFile.name].Report=reports[i].ReportName;
        }
        
        const uploadPromises = reports.map((report) => {
          return uploadFileToLib(report.ReportFile, reportsMetadata[report.ReportFile.name]);
        });
    
        await Promise.all(uploadPromises);
        closeModal();
        onNext();
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="container-submit">
            <h3 className="detailsHeader">Submit Referral</h3>
            <p>Delcaration to be Agreed.</p>
            <p>Thank you for making the referral today. Please note this will be reviewed by a Caltterbridge consultant and you
                will be notified if the referral has been accepted.
            </p>
            <div style={{textAlign:"center", marginTop:'40px'}}><ButtonCtrl btnClickHandler={onSubmitHandle} btnText="Submit" /></div>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                <p>Submitting data... please wait.</p>
            </ModalDialog>
        </div>
    )
}

export default SubmitReferral