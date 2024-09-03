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
import { updateFiles, updateReportsList } from "./ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";
import { warning_MandatoryText } from "../Config";

const Reports = () => {
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  const selectedStage = useSelector(state => state.stage.currentStage)
  const files = useSelector((state) => state.reports.files);
  const reportslist = useSelector((state) => state.reports.reportsList);
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
        return {ReportName: report, IsMain: true, ReportIndex: newIndex }
      })
      reportstemp.sort((a, b) => a.ReportName.localeCompare(b.ReportName));
      dispatch(updateReportsList(reportstemp))
    }
  },[])

  const handleNext = () => {}
  const handleBack = () => {}
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
  const handlePDFView = (e) => {debugger;
    openPDFModal();
    var internalFileName = e.target.title;
    const foundFile = files.find(file => {
      return file.InternalFileName === internalFileName;
    });
    
    setReportHeaderOnPreview(foundFile.ReportFile.name)
    setFileToView(foundFile.ReportFile);
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
    });
  };

  return (
    <div>
      <div style={{ float: "left",width:"100%" }}>
        <div style={{display:"inline-block",width:"100%"}}>
            <h3 className="detailsHeader" style={{float:"left",marginBottom:'5px'}}>Reports</h3>
            <div className="detailsNext" style={{float:"right"}}>
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
            </div>
        </div>
        <div>
          <button className="plainButtons reportsbutton" style={{backgroundImage:`url(${viewIcon})`}}>Reports Needed</button>
          <button className="plainButtons uploadbutton" style={{backgroundImage:`url(${uploadIcon})`}} onClick={() => handleFileUpload(this)}>Upload</button>
        </div>

        {files.length > 0 && (
          <div>
            {files.map((file, index) => (
                <>
                  <div key={index} className="report-strip" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>{file?.ReportFile?.name || 'Unknown File'}</div>
                    <div>
                      <img src={deleteIcon} title={file?.InternalFileName} 
                      onClick={(e) => {handleDeleteFile(e)}} style={{width: '25px',margin:'7px 10px 0px 5px',cursor:'pointer'}}/>
                      <img src={viewIcon} title={file?.InternalFileName} onClick={(e) => {handlePDFView(e)}} 
                        style={{width: '35px',cursor: 'pointer',marginRight:'5px',height:'25px',marginTop:'8px'}}/>
                    </div>
                  </div>
                </>
              ))}
          </div>
        )}

        {fileToView && <PDFModalDialog isOpen={isPDFModalOpen} onClose={closePDFModal} showCloseButton={true} header={reportHeaderOnPreview}>
            <PDFViewer file={fileToView}></PDFViewer>
        </PDFModalDialog>}
      </div>
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation} 
      confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText} isHtmlContent={true}>
        {modalText}
      </ModalDialog>
    </div>
  );
};
 
export default Reports;

