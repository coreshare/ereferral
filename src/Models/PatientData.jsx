class PatientData {
    constructor() {
      this.address = '';
      this.cccClinicalOncologist = '';
      this.cccMedicalOncologist = '';
      this.decisionDate = null; // You can set the initial value as needed
      this.dob = null; // You can set the initial value as needed
      this.diagnostics = '';
      this.ethnicOrigin = '';
      this.firstName = '';
      this.gpName = '';
      this.gpPractice = '';
      this.histology = '';
      this.maritalStatus = ''; // Should be one of the choices
      this.nextOfKinContact = '';
      this.nextOfKinName = '';
      this.nhsNumber = '';
      this.patientAwareOfDiagnosis = false; // Default to false
      this.pathwayInfo = '';
      this.primaryDiagnosis = '';
      this.referringConsultant = '';
      this.referringOrganisation = '';
      this.religion = '';
      this.surname = '';
      this.tumourLocation = ''; // Should be one of the choices
      this.upgradeScreening = '';
    }
  }
  
  export default PatientData;
  