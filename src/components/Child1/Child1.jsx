// EReferralFormData.js
import React, { useState } from 'react';

const Child1 = ({ onChange }) => {
  const [formData, setFormData] = useState({
    Title: ''
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange(formData); // Notify parent about form data change
  };

  return (
    <div>
      <h2>EReferral Form Data</h2>
      <input
        type="text"
        name="Title"
        value={formData.Title}
        onChange={handleFieldChange}
        placeholder="Field 1"
      />
    </div>
  );
};

export default Child1;
