// EReferralForm.js
import React, { useState } from 'react';
import Child1 from '../Child1/Child1';
import Child2 from '../Child2/Child2';
import { saveData, uploadFileToLib } from "../../../src/services/api";

const Parent = () => {
  const [formData, setFormData] = useState({
    Title: ''
  });

  const [attachments, setAttachments] = useState([]);
  const [attachmentsMetadata, setattachmentsMetadata] = useState([]);

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleAttachmentsChange = (newAttachments, metadata) => {//debugger;
    setAttachments(newAttachments);
    setattachmentsMetadata(metadata);
  };

  const handleSubmit = async () => {debugger;
    var itemId = await saveData(formData);
    console.log(itemId);
    for(var i=0;i < attachments.length;i++){
        attachmentsMetadata[attachments[i].name].DataSetID=itemId;
        console.log(attachmentsMetadata[attachments[i].name]);
        console.log(JSON.stringify(attachmentsMetadata[attachments[i].name]));
        uploadFileToLib(attachments[i],attachmentsMetadata[attachments[i].name]);
    }
  };

  return (
    <div>
      <h1>EReferral Form</h1>
      <Child1 onChange={handleFormDataChange} />
      <Child2 onChange={handleAttachmentsChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Parent;
