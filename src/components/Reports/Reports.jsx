import React, { useState, useEffect } from "react";
import "./Reports.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFModalDialog from "../PDFModalDialog/PDFModalDialog";
import viewIcon from "../../Images/viewIcon.png";
import uploadIcon from "../../Images/upload-sign.svg";
import uploadcloudicon from "../../Images/cloud-upload-signal.svg";
import deleteIcon from "../../Images/deleteIcon.png";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { updateFiles, updateReportsList, updateMandatoryReportsList } from "./ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { warning_MandatoryText } from "../Config";
import videoSrc from "../../Images/NHSVideo.mp4"
import PopupVideo from "../PopupVideo/PopupVideo";
import infoIcon from "../../Images/info-filled.svg"
import { setLeftNavClearLinkText } from "../SharedStringsSlice";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [highlightReport, setHighlightReport] = useState(false);
  
  useEffect(() => {
    dispatch(setLeftNavClearLinkText("Reports"))
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
    else{
      dispatch(updateMandatoryReportsList(reportslist));
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
        //referMFDN["GPName"] = "GP Name"
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
      setHighlightReport(true);
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
          setHighlightReport(true);
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
    
    const filesWithEmptyMappedReports = files
      .filter(file => Array.isArray(file.MappedReports) && file.MappedReports.length === 0)
      .map(file => `<li style='text-align:left'>${file.ReportFile.name}</li>`)
      .join("");

      const resultInULFormat = `<ul style='line-height:1.6;'>${filesWithEmptyMappedReports}</ul>`;

    if(filesWithEmptyMappedReports.length > 0){
      setModalText("<div style='font-size:18px'>A document does not contain a tag. Please either add a tag or delete the document.</div>" + resultInULFormat)
      setShowCloseButton(true)
      setIsConfirmation(false)
      openModal()
      return
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

  const handleReportsNeeded = () => {debugger;
    const reportItems = mandatoryReportslist.map((report, index) => {
      const isMapped = files.some(file => file.MappedReports.includes(report.ReportName));
      const hasMappedReports = files.some(file => file.MappedReports && file.MappedReports.length > 0);
      
      let checkmark = isMapped && hasMappedReports
        ? `<span style="font-size: 18px; color: green; font-weight: bold; width: 30px; display: inline-block; text-align: center; margin-right: 10px;align-self:flex-start">&#10003;</span>`
        : `<span style="width: 30px; display: inline-block; text-align: center; margin-right: 10px;">&nbsp;</span>`;

      if(!hasMappedReports){
        checkmark = `<span style="width: 30px; display: none; text-align: center; margin-right: 10px">&nbsp;</span>`;
      }

      return `
        <li style="margin-bottom: 5px; display: flex; align-items: center;">
          ${checkmark}
          <span>${index + 1}. ${report.ReportName}</span>
        </li>`;
    }).join('');
  
    const getArticle = (word) => {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      return vowels.includes(word[0].toLowerCase()) ? 'an' : 'a';
    };

    const htmlString = `
      <div style='font-size:28px;color:black;font-weight:600;text-align:left;margin-bottom:15px'>Reports</div>
      <div style='color:#005cbb;font-weight:500;font-size:18px;text-align:left;line-height:1.6'>To make ${getArticle(selectedStage.title)} ${selectedStage.title} SRG and ${selectedStage.stage} referral, the following information will be required (in pdf format). <br/>Please note that the ticked reports have already been mapped.</div>
      <ol style="padding-left: 0;text-align:left;line-height:1.8;font-size:18px">
        ${reportItems}
      </ol>`;
  
    setModalText(htmlString);
    setIsConfirmation(false);
    setShowCloseButton(true);
    openModal();
  };

  const openVideoPopup = () => setIsPopupOpen(true);
  const closeVideoPopup = () => setIsPopupOpen(false);    

  return (
    <div>
      <div style={{ float: "left", width: "100%" }}>
        <div style={{ display: "inline-block", width: "100%" }}>
          <h3 className="detailsHeader" style={{ float: "left", marginBottom: '5px' }}>Reports</h3>
          <img onClick={openVideoPopup} src={infoIcon} style={{width:'30px',margin:'5px 0px 0px 10px',cursor:"pointer"}}/>
          <div className="detailsNext" style={{ float: "right" }}>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleBack} style={{ marginRight: '10px' }}>Back</button>
            {/*<button onClick={getPatientData}>Get PDS Data</button>*/}
          </div>
        </div>
  
        <div style={{display:"none"}}>
          <button className="plainButtons reportsbutton" style={{ backgroundImage: `url(${viewIcon})`,display:"none" }} onClick={handleReportsNeeded}>Reports Needed</button>
          <button className="plainButtons uploadbutton" style={{ backgroundImage: `url(${uploadIcon})` }} onClick={() => handleFileUpload(this)}>Upload</button>
        </div>
        <button style={{display:"none"}} onClick={openVideoPopup}>Play Video</button>
        <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'10px' }}>
          
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            position: 'relative',
            minHeight: '100px',
            border: '2px dashed transparent',width:'65%'
          }}
        >

          <div
            style={{
              position: 'relative',
              minHeight: '100px',
              backgroundColor: draggingOver ? 'rgba(0, 92, 187, 0.1)' : 'transparent',
              marginTop: '10px'
            }}
            >
              <div  onClick={() => handleFileUpload(this)} 
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: draggingOver ? 'rgba(0, 92, 187, 0.1)' : 'transparent',
                  zIndex: 1,
                  marginBottom:'10px',cursor:"pointer",padding:'10px',
                  border: '4px dashed #888',zIndex:'0',color:'#888',textAlign:'center',lineHeight:'1.6',fontSize:'16px'
                }}
              ><div><img src={uploadcloudicon} style={{width:'50px'}}/></div>
                <div style={{padding:"0px 40px"}}>
                Please click here or drag and drop to upload your documents manually. <br/>Once your document is uploaded, click on the &nbsp;<img src={viewIcon} style={{width:'25px',position:'relative',top:'3px'}}/>&nbsp; icon to add your report tags
                </div>
              </div>
            </div>

            {files.length > 0 && (
  <div style={{ zIndex: 0, opacity: draggingOver ? '0.1' : '1' }}>
    {files.map((file, index) => (
      <div
        key={index}
        className="report-strip"
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px', // Add space between file entries
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: 1 }}>
            {file?.MappedReports.length > 0 && (
              <div style={{ fontSize: '14px', color: '#444' }}>
                {file?.MappedReports.map((report, index) => (
                  <span key={index} style={{ display: 'block', lineHeight: '1.6', fontWeight: '600', fontSize: '18px' }}>
                    {report}
                    {index < file?.MappedReports.length - 1 && (
                      <span style={{ color: 'black', fontWeight: 'bold', fontSize: '16px' }}>
                        <br />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
            {file?.MappedReports.length == 0 && (
        <div style={{ fontSize: '15px', fontWeight: 'normal', marginTop: '0px' }}>
          {file?.ReportFile?.name || 'Unknown File'}
        </div>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={deleteIcon}
              title={file?.InternalFileName}
              onClick={(e) => handleDeleteFile(e)}
              style={{ width: '25px', margin: '0 10px', cursor: 'pointer' }}
            />
            <img
              src={viewIcon}
              title={file?.InternalFileName}
              onClick={(e) => handlePDFView(e)}
              style={{ width: '35px', height: '25px', cursor: 'pointer' }}
            />
          </div>
        </div>
        {file?.MappedReports.length > 0 && (
        <div style={{ fontSize: '15px', fontWeight: 'normal', marginTop: '10px' }}>
          {file?.ReportFile?.name || 'Unknown File'}
        </div>)}
      </div>
    ))}
  </div>
)}


          </div>

          <div style={{width:'calc(35% - 40px)',marginLeft:'40px',marginTop:'10px'}}>
        <div
          style={{
            fontSize: '28px',
            color: 'black',
            fontWeight: 600,
            textAlign: 'left',
            marginBottom: '15px',display:"none"
          }}
        >
          Reports
        </div>
        <div
          style={{
            color: '#005cbb',
            fontWeight: 500,
            fontSize: '18px',
            textAlign: 'left',
            lineHeight: 1.6
          }}
        >
          Referral Type: <b>{selectedStage.title}</b> SRG and <b>{selectedStage.stage}</b> stage<br/> The following information will be required (in pdf format). <br />
          
        </div>
        <ol style={{ paddingLeft: '0', textAlign: 'left', lineHeight: 1.8, fontSize: '18px' }}>
          {mandatoryReportslist.map((report, index) => {
            const isMapped = files.some(file => file.MappedReports.includes(report.ReportName));
            const hasMappedReports = files.some(file => file.MappedReports && file.MappedReports.length > 0);

            let checkmark = isMapped && hasMappedReports ? (
              <span
                style={{
                  fontSize: '18px',
                  color: 'green',
                  fontWeight: 'bold',
                  width: '30px',
                  display: 'inline-block',
                  textAlign: 'center',
                  marginRight: '10px',alignSelf:"flex-start"
                }}
              >
                &#10003;
              </span>
            ) : (
              <span
                style={{
                  width: '30px',
                  display: 'inline-block',
                  textAlign: 'center',
                  marginRight: '10px'
                }}
              >
                &nbsp;
              </span>
            );

            if (!hasMappedReports) {
              checkmark = (
                <span
                  style={{
                    width: '30px',
                    display: 'none',
                    textAlign: 'center',
                    marginRight: '10px'
                  }}
                >
                  &nbsp;
                </span>
              );
            }

            return (
              <li key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'flex-start', fontSize: '16px', lineHeight: '1.4' }}>
                {checkmark}
                <span style={{ width: '30px', textAlign: 'center', marginRight: '10px', alignSelf: 'flex-start' }}>{index + 1}.</span>
                <span className={(highlightReport && !files.some(file => file.MappedReports.includes(report.ReportName))) ? 'errorborder' : ''} style={{flex: '1 1 0%'}}> {report.ReportName}</span>
              </li>
            );
          })}
        </ol>
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
            {/*<div class="video-container">
                <video controls>
                    <source src={videoSrc} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>*/}
          </PDFModalDialog>
        )}
  
      </div>
  
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation}
        confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
        {modalText}
      </ModalDialog>

      <PopupVideo videoSrc={videoSrc} isOpen={isPopupOpen} onClose={closeVideoPopup} />

    </div>
  );  
};
 
export default Reports;

