import React,{useState} from 'react';
import './EReferralForm.css';
import PatientData from '../../Models/PatientData';

const EReferralForm = () => {
    const [formData, setFormData] = useState(new PatientData);

    const handleChange = (e) => {debugger;
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
    };

  return (
    <div>
        <div className="form-container">
        <form className="form">
            <div className="form-field">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" rows="4" onChange={handleChange}/>
            </div>
            <div className="form-field">
            <label htmlFor="clinicalOncologist">CCC Consultant - Clinical Oncologist:</label>
            <input type="text" id="clinicalOncologist" name="cccClinicalOncologist" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="medicalOncologist">CCC Consultant - Medical Oncologist:</label>
            <input type="text" id="medicalOncologist" name="cccMedicalOncologist" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="decisionDate">Date Decision to Refer:</label>
            <input type="date" id="decisionDate" name="decisionDate" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="diagnostics">Diagnostics:</label>
            <textarea id="diagnostics" name="diagnostics" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="ethnicOrigin">Ethnic origin:</label>
            <input type="text" id="ethnicOrigin" name="ethnicOrigin" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="firstName">First name:</label>
            <input type="text" id="firstName" name="firstName" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="gpName">GP name:</label>
            <input type="text" id="gpName" name="gpName" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="gpPractice">GP Practice:</label>
            <input type="text" id="gpPractice" name="gpPractice" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="histology">Histology:</label>
            <input type="text" id="histology" name="histology" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="maritalStatus">Marital Status:</label>
            <select id="maritalStatus" name="maritalStatus" onChange={handleChange}>
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
            <label htmlFor="nextOfKinContact">Next of Kin contact details:</label>
            <textarea id="nextOfKinContact" name="nextOfKinContact" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="nextOfKinName">Next of Kin name:</label>
            <input type="text" id="nextOfKinName" name="nextOfKinName" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="nhsNumber">NHS Number:</label>
            <input type="text" id="nhsNumber" name="nhsNumber" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label> Patient Aware of Diagnosis:</label>
            <input
                type="checkbox"
                id="patientAwareOfDiagnosis"
                name="patientAwareOfDiagnosis"
                checked={formData.patientAwareOfDiagnosis}
                onChange={handleChange}
            />
            </div>
            <div className="form-field">
            <label htmlFor="pathwayInfo">Pathway Information:</label>
            <textarea id="pathwayInfo" name="pathwayInfo" rows="4" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="primaryDiagnosis">Primary Diagnosis:</label>
            <input type="text" id="primaryDiagnosis" name="primaryDiagnosis" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="referringConsultant">Referring Consultant:</label>
            <input type="text" id="referringConsultant" name="referringConsultant" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="referringOrganisation">Referring Organisation:</label>
            <input type="text" id="referringOrganisation" name="referringOrganisation" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="religion">Religion:</label>
            <input type="text" id="religion" name="religion" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" onChange={handleChange} />
            </div>
            <div className="form-field">
            <label htmlFor="tumourLocation">Tumour Location:</label>
            <select id="tumourLocation" name="tumourLocation" onChange={handleChange}>
            <option value=""></option>
                <option value="breast">Breast</option>
                <option value="lung">Lung</option>
            </select>
            </div>
            <div className="form-field">
            <label htmlFor="upgradeScreening">Upgrade/Screening/62 Day:</label>
            <input type="text" id="upgradeScreening" name="upgradeScreening" onChange={handleChange} />
            </div>
            
        </form>
        </div>
    </div>
  );
}

export default EReferralForm;
