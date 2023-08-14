// EReferralForm.js
import React, { useState } from 'react';
import { saveData, uploadFileToLib } from "../../services/api";
import FormDataSet from '../../Models/FormDataSet';
import ModalDialog from '../ModalDialog/ModalDialog';
import DataForm from '../DataForm/DataForm';
import Attachments from '../Attachments/Attachments';

const UserForm = ({ onNext }) => {
  const [userFormStep, setuserFormStep] = useState(0);
  const [formData, setFormData] = useState(new FormDataSet);
  const [attachments, setAttachments] = useState([]);
  const [attachmentsMetadata, setattachmentsMetadata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleAttachmentsChange = (newAttachments, metadata) => {
    setAttachments(newAttachments);
    setattachmentsMetadata(metadata);
  };

  const handleSubmit = async () => {
    openModal();
    var itemId = await saveData(formData);
    console.log(itemId);
    for(var i=0;i < attachments.length;i++){
        attachmentsMetadata[attachments[i].name].DataSetID=itemId;
        console.log(attachmentsMetadata[attachments[i].name]);
        console.log(JSON.stringify(attachmentsMetadata[attachments[i].name]));
    }
    const uploadPromises = attachments.map((attachment) => {
      return uploadFileToLib(attachment, attachmentsMetadata[attachment.name]);
    });

    await Promise.all(uploadPromises);

    closeModal();
    setuserFormStep(userFormStep+1);
  };

  const onUserFormNext = () =>{
    setuserFormStep(userFormStep + 1);
  }

  const handleNextReferral = () => {
    setuserFormStep(0);
  }

  return (
    <div>
      {userFormStep === 0 && <DataForm onChange={handleFormDataChange} onUserFormNext={onUserFormNext} />}
      {userFormStep === 1 && <div><Attachments onChange={handleAttachmentsChange} /><br/>
      <button onClick={handleSubmit}>Submit</button></div>}
      {userFormStep === 2 && <div><Attachments onChange={handleAttachmentsChange} /><br/>
      <button onClick={handleNextReferral}>Submit another referral</button></div>}
      <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
        <p>Submitting data... please wait.</p>
      </ModalDialog>
    </div>
  );
};

export default UserForm;
