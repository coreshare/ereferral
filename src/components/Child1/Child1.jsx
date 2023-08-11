// EReferralFormData.js
import React, { useState } from 'react';
import './Child1.css';
import FormDataSet from '../../Models/FormDataSet';

const Child1 = ({ onChange }) => {
  const [formData, setFormData] = useState(new FormDataSet);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange(formData);
  };

  return (
    <div>
        <div className="form-container">
        <form className="form">
            <div className="form-field">
            <label htmlFor="Address">Address:</label>
            <textarea id="Address" name="Address" rows="4" onChange={handleChange}/>
            </div>
            <div className="form-field">
            <label htmlFor="ClinicalOncologistCCCConsultant">CCC Consultant - Clinical Oncologist:</label>
            <input type="text" id="ClinicalOncologistCCCConsultant" name="ClinicalOncologistCCCConsultant" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="MedicalOncologistCCCConsultant">CCC Consultant - Medical Oncologist:</label>
            <input type="text" id="MedicalOncologistCCCConsultant" name="MedicalOncologistCCCConsultant" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="DateDecisiontoRefer">Date Decision to Refer:</label>
            <input type="date" id="DateDecisiontoRefer" name="DateDecisiontoRefer" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="DateofBirth">Date of Birth:</label>
            <input type="date" id="DateofBirth" name="DateofBirth" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="Diagnostics">Diagnostics:</label>
            <textarea id="Diagnostics" name="Diagnostics" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="Ethnicorigin">Ethnic origin:</label>
            <input type="text" id="Ethnicorigin" name="Ethnicorigin" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="FirstName">First name:</label>
            <input type="text" id="FirstName" name="FirstName" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="GPName">GP name:</label>
            <input type="text" id="GPName" name="GPName" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="GPPractice">GP Practice:</label>
            <input type="text" id="GPPractice" name="GPPractice" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="Histology">Histology:</label>
            <input type="text" id="Histology" name="Histology" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="MaritalStatus">Marital Status:</label>
            <select id="MaritalStatus" name="MaritalStatus" onChange={handleChange}>
            <option value=""></option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="civilPartner">Civil Partner</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
                <option value="notDisclosed">Not disclosed</option>
            </select>
            </div>
            <div className="form-field">
            <label htmlFor="NextofKincontactdetails">Next of Kin contact details:</label>
            <textarea id="NextofKincontactdetails" name="NextofKincontactdetails" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="NextofKinname">Next of Kin name:</label>
            <input type="text" id="NextofKinname" name="NextofKinname" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="NHSNumber">NHS Number:</label>
            <input type="text" id="NHSNumber" name="NHSNumber" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label> Patient Aware of Diagnosis:</label>
            <input
                type="checkbox"
                id="PatientAwareofDiagnosis"
                name="PatientAwareofDiagnosis"
                checked={formData.patientAwareOfDiagnosis}
                onChange={handleChange}
            />
            </div>
            <div className="form-field">
            <label htmlFor="PathwayInformation">Pathway Information:</label>
            <textarea id="PathwayInformation" name="PathwayInformation" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="PrimaryDiagnosis">Primary Diagnosis:</label>
            <input type="text" id="PrimaryDiagnosis" name="PrimaryDiagnosis" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="ReferringConsultant">Referring Consultant:</label>
            <input type="text" id="ReferringConsultant" name="ReferringConsultant" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="ReferringOrganisation">Referring Organisation:</label>
            <input type="text" id="ReferringOrganisation" name="ReferringOrganisation" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="Religion">Religion:</label>
            <input type="text" id="Religion" name="Religion" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="Surname">Surname:</label>
            <input type="text" id="Surname" name="Surname" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="TumourLocation">Tumour Location:</label>
            <select id="TumourLocation" name="TumourLocation" onChange={handleChange}>
            <option value=""></option>
                <option value="breast">Breast</option>
                <option value="lung">Lung</option>
            </select>
            </div>
            <div className="form-field">
            <label htmlFor="UpgradeScreening">Upgrade/Screening/62 Day:</label>
            <input type="text" id="UpgradeScreening" name="UpgradeScreening" onChange={handleChange} />
            </div>
            
        </form>
        </div>
    </div>
  );
};

export default Child1;
