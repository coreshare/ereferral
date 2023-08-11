// EReferralForm.js
import React, { useState } from 'react';
import Child1 from '../Child1/Child1';
import Child2 from '../Child2/Child2';
import { saveData, getJsonData } from "../../../src/services/api";

const Parent = () => {
  const [formData, setFormData] = useState({
    Title: ''
  });

  const [attachments, setAttachments] = useState([]);

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleAttachmentsChange = (newAttachments, metadata) => {//debugger;
    setAttachments(newAttachments);
  };

  const handleSubmit = async () => {debugger;
    var itemId = await saveData(formData);
    debugger;
    //console.log('Form Data:', formData);
    //console.log('Attachments:', attachments);
  };

  const handleJson = async () => {debugger;
    var itemId = await getJsonData(formData);
    debugger; 
    //console.log('Form Data:', formData);
    //console.log('Attachments:', attachments);
  };

  return (
    <div>
      <h1>EReferral Form</h1>
      <Child1 onChange={handleFormDataChange} />
      <Child2 onChange={handleAttachmentsChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleJson}>Submit</button>
    </div>
  );
};

export default Parent;
