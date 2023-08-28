import React,{useState,useEffect} from "react"
import FormDataSet from '../../Models/FormDataSet'
import ModalDialog from "../ModalDialog/ModalDialog";
import { saveData, uploadFileToLib } from "../../Services/api";

const SubmitReferral = ({onNext, patientData, referData, diagnosisData, mdtData,selectedReferralType,selectedStage}) => {
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

    const onSubmitHandle = async () =>{debugger;
        openModal();
        var itemId = await saveData(formData);
        console.log(itemId);
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
        <div>
            Submit Referral
            <button onClick={onSubmitHandle}>Submit</button>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false}>
                <p>Submitting data... please wait.</p>
            </ModalDialog>
        </div>
    )
}

export default SubmitReferral