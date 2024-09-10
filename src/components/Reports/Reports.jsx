import React, { useState, useEffect } from "react";
import "./Reports.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFModalDialog from "../PDFModalDialog/PDFModalDialog";
import viewIcon from "../../Images/viewIcon.png";
import uploadIcon from "../../Images/upload-sign.svg";
import addReport from "../../Images/addReport.png";
import deleteIcon from "../../Images/deleteIcon.png";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { updateFiles, updateReportsList, updateMandatoryReportsList } from "./ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { warning_MandatoryText } from "../Config";

const Reports = () => {
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  const selectedStage = useSelector(state => state.stage.currentStage)
  const files = useSelector((state) => state.reports.files);
  const reportslist = useSelector((state) => state.reports.reportsList);
  const mandatoryReportslist = useSelector(state => state.reports.mandatoryReportsList);
  const [draggingOver, setDraggingOver] = useState(null);
  const [fileToView, setFileToView] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  const [showCloseButton, setShowCloseButton] = useState(true)
  const [modalText, setModalText] = useState("")
  const [isConfirmation, setIsConfirmation] = useState(true)
  const [reportFileToDelete,setReportFileToDelete] = useState(null)
  const [reportIndex, setReportIndex] = useState(reportslist.length)
  const currentStep = useSelector(state => state.referralSubmissionStep)
  const [confirmationType, setConfirmationType] = useState("")
  const [reportNameToAdd, setReportNameToAdd] = useState("")
  const [confirmationBtnText, setConfirmationBtnText] = useState("")
  const [reportHeaderOnPreview, setReportHeaderOnPreview] = useState("")
  const [clickedReport, setClickedReport] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const formdata = useSelector(state => state.details)
  const [overseasPatient, setOverseasPatient] = useState(details.OverseasPatient);
  
  useEffect(() => {
    if(reportslist.length == 0){
      var newIndex = 0;
      const reportstemp = selectedStage.reports.map(report => {
        newIndex = newIndex + 1;
        setReportIndex(newIndex);
        return { ReportName: report }
      })
      reportstemp.sort((a, b) => a.ReportName.localeCompare(b.ReportName));
      dispatch(updateReportsList(reportstemp));
      dispatch(updateMandatoryReportsList(reportstemp));
    }
    
    const isIPTFormIncluded = selectedStage.reports.filter(report => report === "IPT Form");
    if(isIPTFormIncluded.length > 0){
      if (details && details.IsthisaTargetPatient === "No") {
        const filteredReports = reportslist.filter(report => report.ReportName !== "IPT Form");
        dispatch(updateMandatoryReportsList(filteredReports));
      }
      else{
        if (!mandatoryReportslist.some(report => report.ReportName === "IPT Form")) {
          dispatch(updateMandatoryReportsList(reportslist));
        }
      }
    }
  },[])

  const handleNext = () => {
    if(formdata.IsExistingNHSNumber != "Yes") {
      //var errorMsg = "<div style='max-height:500px;overflow-y:auto;width:400px'><b>You must ensure you complete all the below mandatory fields before submitting your referral:</b><br/><br/>"
      var errorMsg = `<div style='max-height:500px;overflow-y:auto;width:400px;'><b style='line-height:28px'>${warning_MandatoryText}</b><br/><br/>`
      const patientMandatoryFields = ['Surname','FirstName','DateofBirth','HomePhoneNumber']

      const patientMFDN = {}
      patientMFDN["Surname"] = "Surname"
      patientMFDN["FirstName"] = "First Name"
      patientMFDN["DateofBirth"] = "Date of Birth"
      patientMFDN["HomePhoneNumber"] = "Primary Contact Number"
      var emptyFields = []
      var hasMFToFill = false

      for (const fieldName of patientMandatoryFields) {
        if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
          emptyFields.push(patientMFDN[fieldName])
          hasMFToFill = true
        }
      }

      if(overseasPatient == 'No'){
          if(!details.NHSNumber || details.NHSNumber == ""){
            emptyFields.push("NHS Number")
          } 
      }
      
      if (emptyFields.length > 0) {
        errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Patient Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
      }

      const nextofKinMandatoryFields = ['NextofKinFirstName', 'NextofKinLastName', 'NextofKinAddressLine1',
                              'NextofKinAddressLine2', /*'NextofKinAddressLine3', 'NextofKinAddressLine4', */'NextofKinPostCode',
                              'NextofKinMobileNumber' ]

      const nextofKinMFDN = {}
      nextofKinMFDN["NextofKinFirstName"] = "Next of Kin First Name"
      nextofKinMFDN["NextofKinLastName"] = "Next of Kin Last Name"
      nextofKinMFDN["NextofKinAddressLine1"] = "Next of Kin Address Line 1"
      nextofKinMFDN["NextofKinAddressLine2"] = "Next of Kin Address Line 2"
      nextofKinMFDN["NextofKinAddressLine3"] = "Next of Kin Address Line 3"
      nextofKinMFDN["NextofKinAddressLine4"] = "Next of Kin Address Line 4"
      nextofKinMFDN["NextofKinPostCode"] = "Next of Kin Post Code"
      nextofKinMFDN["NextofKinHomePhoneNumber"] = "Next of Kin Home Phone Number"
      nextofKinMFDN["NextofKinMobileNumber"] = "Next of Kin Mobile Number"
      nextofKinMFDN["RelationshiptoPatient"] = "Relationship to Patient"
      emptyFields = []

      if(!formdata["NoNextOfKin"]){
        for (const fieldName of nextofKinMandatoryFields) {
          if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
            emptyFields.push(nextofKinMFDN[fieldName])
            hasMFToFill = true
          }
        }
      }

      if (emptyFields.length > 0) {
        errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Next of Kin Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
      }
      
      if(formdata.OverseasPatient != "Yes"){
        const referMandatoryFields = ['GPName', 'GPPractice', 'GPPracticeAddress', 'ReferringOrganisation', 'ReferringConsultant']
        
        const referMFDN = {}
        referMFDN["GPName"] = "GP Name"
        referMFDN["GPPractice"] = "GP Practice"
        referMFDN["GPPracticeAddress"] = "GP Practice Address"
        referMFDN["ReferringOrganisation"] = "Referring Organisation"
        referMFDN["ReferringConsultant"] = "Referring Consultant"

        emptyFields = []

        for (const fieldName of referMandatoryFields) {
          if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
            emptyFields.push(referMFDN[fieldName])
            hasMFToFill = true
          }
        }

        if (emptyFields.length > 0) {
          errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Refer Details</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
        }
      }

      let treatmentMandatoryFields = [ 'MedicalOncologistCCCConsultant', 'ClinicalOncologistCCCConsultant', 'IsthisaTargetPatient', 'TargetCategory' ]
      //'PrimaryDiagnosis', 
      const treatmentMFDN = {}
      treatmentMFDN["MedicalOncologistCCCConsultant"] = "Medical Oncologist CCC Consultant"
      treatmentMFDN["ClinicalOncologistCCCConsultant"] = "Clinical Oncologist CCC Consultant"
      treatmentMFDN["IsthisaTargetPatient"] = "Is this a Target Patient"
      treatmentMFDN["TargetCategory"] = "Target Category"

      if(details && details.IsthisaTargetPatient == "No"){
        treatmentMandatoryFields = treatmentMandatoryFields.filter(field => field !== 'TargetCategory')
      }

      emptyFields = []

      for (const fieldName of treatmentMandatoryFields) {
        if (!formdata.hasOwnProperty(fieldName) || formdata[fieldName] === "") {
          emptyFields.push(treatmentMFDN[fieldName])
          hasMFToFill = true
        }
      }

      if (emptyFields.length > 0) {
        errorMsg = errorMsg + `<div style='text-align:left;line-height:28px'><b style='font-size:20px'>Treatment & Target Category</b>:<ul>${emptyFields.map(field => `<li>${field}</li>`).join('')}</ul></div>`;
      }

      errorMsg = errorMsg + "</div>"

      if(hasMFToFill){//checkonce// && false
        setModalText(errorMsg)
        setShowCloseButton(true)
        setIsConfirmation(false)
        openModal()
        return
      }
    }

    //const mainReports = reportslist.filter((report) => (report.IsMain || !report.IsMain));
    const mainReportsWithFiles = reportslist.every((mainReport) => {
        if(details && ((details.IsthisaTargetPatient == "No" && mainReport.ReportName == "IPT Form") || 
          (details.DiscussedatMDT == "No" && mainReport.ReportName.startsWith("MDT ")))){
          return true
        }
        
        return files.some((file) => file.MappedReports.includes(mainReport.ReportName))
        //files.some((file) => file.ReportName === mainReport.ReportName)
    });

    if (!mainReportsWithFiles && formdata.IsExistingNHSNumber != "Yes") {
      setModalText("Please upload files for all reports before proceeding")
      setShowCloseButton(true)
      setIsConfirmation(false)
      openModal()
      return
    }

    if(details && details.IsthisaTargetPatient == "Yes"){
      const tempReports = reportslist.filter((report) => report.ReportName == "IPT Form")
      if(tempReports.length > 0){
        const iptFormFile = files.some((file) => file.MappedReports.includes("IPT Form"));//files.some((file) => file.ReportName === "IPT Form")
        if(!iptFormFile && details.IsExistingNHSNumber != "Yes"){
          setModalText("Please upload IPT Form report.")
          setShowCloseButton(true)
          setIsConfirmation(false)
          openModal()
          return
        }
      }
    } else if (details && details.IsthisaTargetPatient === "No") {
      const updatedFiles = files.filter((file) => file.ReportName !== "IPT Form");
      dispatch(updateFiles(updatedFiles));
    }

    dispatch(setReferralSubmissionStep(currentStep + 1))
  }
  const handleBack = () => {
    dispatch(setReferralSubmissionStep(currentStep - 1))
  }
  const closePDFModal = () => {
    setIsPDFModalOpen(false);
  }
  const handleConfirmation = (isConfirmed) => {
    if(isConfirmed){
      if(confirmationType == "Delete-File")
      {
        deleteFile()
      }
    }
    closeModal();
  }
  const handlePDFView = (e) => {
    openPDFModal();
    var internalFileName = e.target.title;
    const foundFile = files.find(file => {
      return file.InternalFileName === internalFileName;
    });
    
    setReportHeaderOnPreview(foundFile.ReportFile.name)
    setFileToView(foundFile.ReportFile);
    setSelectedFile(foundFile);
  }
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const openPDFModal = () => {
    setIsPDFModalOpen(true);
  }

  const deleteFile = () => {debugger;
    const updatedFiles = files.filter(file => file.InternalFileName !== reportFileToDelete);
    dispatch(updateFiles(updatedFiles));
    setReportFileToDelete(null);
  }

  const handleDeleteFile = (e) => {debugger;
    setConfirmationBtnText("Delete")
    setShowCloseButton(false)
    setConfirmationType("Delete-File")
    setModalText("Are you sure you want to delete the file?");
    setIsConfirmation(true);
    openModal();
    setReportFileToDelete(e.target.title);
  }

  const handleFileUpload = (e) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.multiple = true;
    fileInput.click();
  
    fileInput.addEventListener("change", (event) => {
      uploadFilesToCollection(event);
    });
  };

  const uploadFilesToCollection = (event) => {debugger;
    const selectedFiles = event.target.files;
      const validFiles = [];
  
      Array.from(selectedFiles).forEach((selFile) => {
        if (!selFile.type.includes("pdf")) {
          alert(`"${selFile.name}" is not a PDF file. Only PDF files are allowed.`);
          return;
        }
        if (selFile.size > 5 * 1024 * 1024) {
          alert(`File "${selFile.name}" exceeds 5MB. Please upload files up to 5MB.`);
          return;
        }
  
        const reader = new FileReader();
        reader.onload = function (e) {
          const arrayBuffer = e.target.result;
          const dataView = new DataView(arrayBuffer);
  
          if (
            !(arrayBuffer.byteLength > 4 &&
              dataView.getUint8(0) === 0x25 &&
              dataView.getUint8(1) === 0x50 &&
              dataView.getUint8(2) === 0x44 &&
              dataView.getUint8(3) === 0x46)
          ) {
            alert(`Invalid PDF file: ${selFile.name}`);
            return;
          }
  
          const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
          const fileExtension = selFile.name.split('.').pop();
          const baseName = selFile.name.replace(`.${fileExtension}`, '');
          const internalFileName = `${baseName}_${timestamp}.${fileExtension}`;

          const newFile = {
            MappedReports: [],
            ReportFile: selFile,
            InternalFileName: internalFileName
          };
  
          validFiles.push(newFile);
          if (validFiles.length === selectedFiles.length) {
            dispatch(updateFiles([...files, ...validFiles]));
          }
        };
        reader.readAsArrayBuffer(selFile);
      });
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggingOver(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggingOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingOver(false);
  
    const droppedFiles = e.dataTransfer.files;
    uploadFilesToCollection({ target: { files: droppedFiles } });
  };

  const handleReportSelection = (reportName) => {
    const updatedFile = {
      ...selectedFile,
      MappedReports: selectedFile.MappedReports.includes(reportName)
        ? selectedFile.MappedReports.filter((name) => name !== reportName)
        : [...selectedFile.MappedReports, reportName],
    };

    const updatedFiles = files.map((file) =>
      file.InternalFileName === updatedFile.InternalFileName ? updatedFile : file
    );

    dispatch(updateFiles(updatedFiles));

    let updatedReports = [...selectedFile.MappedReports];
    if (updatedReports.includes(reportName)) {
      updatedReports = updatedReports.filter(name => name !== reportName);
    } else {
      updatedReports.push(reportName);
    }
    setSelectedFile({
      ...selectedFile,
      MappedReports: updatedReports
    });
  };

  const handleReportsNeeded = () => {
    const reportItems = mandatoryReportslist.map(report => {
      const isMapped = files.some(file => file.MappedReports.includes(report.ReportName));
      
      const checkmark = isMapped ? `<span style="font-size: 24px; color: green; font-weight: bold;">&#10003;</span>` : '&nbsp;&nbsp;&nbsp;'; 
  
      return `<li style='list-style-type: none;'>
                <span style="display: inline-block; width: 30px; text-align: center;">${checkmark}</span>
                ${report.ReportName}
              </li>`;
    }).join('');
  
    const htmlString = `
      <div style='font-size:28px;color:black;font-weight:600;text-align:left;margin-bottom:15px'>Reports</div>
      <div style='color:#005cbb;font-weight:500;font-size:18px;text-align:left;line-height:1.6'>To make a ${selectedStage.title} SRG and ${selectedStage.stage} referral, the following information will be required (in pdf format). <br/>Please note that the ticked reports have already been mapped.</div>
      <ol style="padding-left: 0px;text-align:left;line-height:1.8;font-size:18px">
        ${reportItems}
      </ol>`;
  
    setModalText(htmlString);
    setIsConfirmation(false);
    openModal();
  };
  
    

  return (
    <div>
      <div style={{ float: "left", width: "100%" }}>
        <div style={{ display: "inline-block", width: "100%" }}>
          <h3 className="detailsHeader" style={{ float: "left", marginBottom: '5px' }}>Reports</h3>
          <div className="detailsNext" style={{ float: "right" }}>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleBack} style={{ marginRight: '10px' }}>Back</button>
          </div>
        </div>
  
        <div>
          <button className="plainButtons reportsbutton" style={{ backgroundImage: `url(${viewIcon})` }} onClick={handleReportsNeeded}>Reports Needed</button>
          <button className="plainButtons uploadbutton" style={{ backgroundImage: `url(${uploadIcon})` }} onClick={() => handleFileUpload(this)}>Upload</button>
        </div>
  
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            position: 'relative',
            minHeight: '100px',
            border: '2px dashed transparent',
          }}
        >
          {files.length > 0 && (
            <div style={{ zIndex: 0, opacity: draggingOver ? '0.1' : '1' }}>
              {files.map((file, index) => (
                <div
                key={index}
                className="report-strip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <div>{file?.ReportFile?.name || 'Unknown File'}</div>
                  <div>
                    <img
                      src={deleteIcon}
                      title={file?.InternalFileName}
                      onClick={(e) => handleDeleteFile(e)}
                      style={{ width: '25px', margin: '7px 10px 0px 5px', cursor: 'pointer' }}
                    />
                    <img
                      src={viewIcon}
                      title={file?.InternalFileName}
                      onClick={(e) => handlePDFView(e)}
                      style={{ width: '35px', cursor: 'pointer', marginRight: '5px', height: '25px', marginTop: '8px' }}
                    />
                  </div>
                </div>
                {file?.MappedReports.length > 0 && 
                <div style={{ marginTop: '0px', fontSize: '14px', color: '#888',alignSelf:'flex-start' }}>
                  {file?.MappedReports.map((report, index) => (
                    <span key={index} style={{lineHeight:'1.6'}}>
                      {report}
                      {index < file?.MappedReports.length - 1 && (
                        <span style={{ color: 'black',fontWeight:'bold', fontSize:'16px' }}> | </span>
                      )}
                    </span>
                  ))}
                </div>}
              </div>              
              ))}
            </div>
          )}
  
          <div
            style={{
              position: 'relative',
              minHeight: '100px',
              backgroundColor: draggingOver ? 'rgba(0, 92, 187, 0.1)' : 'transparent',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: draggingOver ? 'rgba(0, 92, 187, 0.1)' : 'transparent',
                zIndex: 1,
                fontSize: '24px',
                fontWeight: '600',
                border: '4px dashed #888',zIndex:'0',color:'#888'
              }}
            >
              Drop files here to upload.
            </div>
          </div>
        </div>
  
        {fileToView && (
          <PDFModalDialog isOpen={isPDFModalOpen} onClose={closePDFModal} showCloseButton={true} header={reportHeaderOnPreview}>
            <div style={{ float: 'left', width: '50%' }}><PDFViewer file={fileToView}></PDFViewer></div>
            <div style={{ textAlign: 'left', marginLeft: 'calc(50% + 50px)', width: 'calc(50% - 100px)' }}>
              <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Please select or deselect the checkboxes below to map the reports.</div>
              {mandatoryReportslist.map((report, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '18px',marginBottom:'10px' }}>
                  <input type="checkbox" style={{ height: '20px', width: '20px', marginRight: '10px', flexShrink:'0' }}
                    checked={selectedFile.MappedReports.includes(report.ReportName)}
                    onChange={() => handleReportSelection(report.ReportName)} /> <div style={{flexGrow:'1'}}>{report.ReportName}</div>
                </div>
              ))}
            </div>
          </PDFModalDialog>
        )}
  
      </div>
  
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation}
        confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
        {modalText}
      </ModalDialog>
    </div>
  );  
};
 
export default Reports;

