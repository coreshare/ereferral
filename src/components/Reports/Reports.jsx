import React, { useState, useEffect } from "react";
import "./Reports.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFModalDialog from "../PDFModalDialog/PDFModalDialog";
import viewIcon from "../../Images/viewIcon.png";
import addReport from "../../Images/addReport.png";
import deleteIcon from "../../Images/deleteIcon.png";
import ModalDialog from "../ModalDialog/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { updateFiles, updateReportsList } from "./ReportsSlice";
import { setReferralSubmissionStep } from "../ReferralSubmissionSlice";

const Reports = () => {
  const dispatch = useDispatch()
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
  
  const handleAddDuplicateReport = (e) => {
    setConfirmationBtnText("Add")
    setConfirmationType("Add-Report")
    setModalText("Do you want to proceed to add an additional report?");
    setShowCloseButton(false)
    setIsConfirmation(true);
    openModal();
    setReportNameToAdd(e.target.title)
  }

  const addAnAdditionalReportRow = () => {
    const newIndex = reportIndex + 1;
    const newReport = { ReportName: reportNameToAdd, IsMain: false, ReportIndex: newIndex };
    
    const existingReport = reportslist.find((report) => report.ReportName === reportNameToAdd && !files.some((file) => file.ReportIndex === report.ReportIndex));
    if (existingReport) {
      alert("Cannot add duplicate report without a file.");
      return;
    }
    
    const updatedReports = [...reportslist];
    const relatedReportIndex = updatedReports.findIndex((report) => report.ReportName === newReport.ReportName);
    updatedReports.splice(relatedReportIndex + 1, 0, newReport);
    
    setReportIndex(newIndex);
    dispatch(updateReportsList(updatedReports))
    setReportNameToAdd("")
  }

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

  const handleNext = () => {
    dispatch(setReferralSubmissionStep(currentStep + 1))
  };

  const handleBack = () => {
    dispatch(setReferralSubmissionStep(currentStep - 1))
  };

  const handleDragEnter = (e, report) => {
    e.preventDefault();
    setDraggingOver(report);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setDraggingOver(null);
  };

  const handleDrop = (e, report, reportIndex) => {
    e.preventDefault();
    setDraggingOver(null);

    if (e.dataTransfer.files.length > 1) {
      alert("Drop only one file.");
      return;
    }

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile.type.includes("pdf")) {
        alert("Only PDF files are allowed.");
        return;
    }

    const existingFile = files.find((file) => file.ReportIndex === reportIndex);
    if (existingFile) {
      const replaceFile = window.confirm("This report already has a file. Do you want to replace it?");
      if (!replaceFile) {
        return;
      }
    }

    const newStage = { ReportName: report, ReportFile: droppedFile, ReportIndex: reportIndex };
    const updatedFiles = files.filter((file) => file.ReportIndex !== reportIndex);
    dispatch(updateFiles([...updatedFiles, newStage]))
  };

  const handlePDFView = (e) => {
    openPDFModal();
    var reportName = e.target.title;
    files.map(file =>{
        if(file.ReportName == reportName){
            setFileToView(file.ReportFile);
        }
    })
  }

  const openModal = () => {
    setIsModalOpen(true);
};

  const closeModal = () => {
        setIsModalOpen(false);
    };

  const openPDFModal = () => {
    setIsPDFModalOpen(true);
};

  const closePDFModal = () => {
        setIsPDFModalOpen(false);
    };

    const handleDeleteFile = (e, hasFile, isMain) => {
        if(hasFile){
          setConfirmationBtnText("Delete")
          setShowCloseButton(false)
          setConfirmationType("Delete-File")
          setModalText("Are you sure to delete the file?");
          setIsConfirmation(true);
          openModal();
          setReportFileToDelete(e.target.title);
        }
        else if(!isMain){
          const updatedReports = reportslist.filter((report) =>
            report.ReportIndex !== parseInt(e.target.title)
          );
          dispatch(updateReportsList(updatedReports))
        }
    }
    
    const deleteFile = () => {
      const updatedFiles = files.filter(file => file.ReportIndex !== parseInt(reportFileToDelete));
      dispatch(updateFiles(updatedFiles))
      const updateReports = reportslist.filter(report => report.ReportIndex !== parseInt(reportFileToDelete) || report.IsMain)
      dispatch(updateReportsList(updateReports))
      setReportFileToDelete(null);
    }

    const handleConfirmation = (isConfirmed) => {
      if(isConfirmed){
        if(confirmationType == "Delete-File")
        {
          deleteFile()
        }
        else if(confirmationType == "Add-Report"){
          addAnAdditionalReportRow();
        }
      }
      closeModal();
    }

  return (
    <div>
      <div style={{ float: "left" }}>
        <h3 className="detailsHeader">Reports</h3>
        {reportslist.map((report, index) => {
          const hasFile = files.some((file) => file.ReportIndex === report.ReportIndex);
          var filename = null;
          if (hasFile) {
            var file = files.find(file => file.ReportIndex === report.ReportIndex);
            filename = file.ReportFile.name;
          }

          return (
            <div style={{display:'flex'}}>
                <div style={{width:'80px',display:'flex',alignItems:'center',height:'40px'}}>{hasFile && <>
                  {report.IsMain && <img src={addReport} title={report.ReportName} onClick={handleAddDuplicateReport} 
                  style={{width: '30px',cursor: 'pointer',marginRight:'5px'}}/>}
                  <img src={viewIcon} title={report.ReportName} onClick={handlePDFView} 
                  style={{width: '40px',cursor: 'pointer',marginRight:'5px',height:'28px'}}/>
                  </>
                }</div>
                <div
                key={index}
                title={report.ReportName}
                className={`report-strip drop-area ${
                    draggingOver === report.ReportName ? "dragging" : ""
                } ${hasFile ? "with-file" : ""}`}
                onDragEnter={(e) => handleDragEnter(e, report)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, report.ReportName, report.ReportIndex)}
                >
                {!report.IsMain && "Additional"} {report.ReportName}{hasFile && " - "}{hasFile && filename}
                </div>
                {(hasFile || !report.IsMain) && <div><img src={deleteIcon} title={report.ReportIndex} 
                  onClick={(e) => {handleDeleteFile(e, hasFile, report.IsMain)}} style={{width: '25px',margin:'7px 0px 0px 5px',cursor:'pointer'}}/></div>}
            </div>
          );
        })}
        {fileToView && <PDFModalDialog isOpen={isPDFModalOpen} onClose={closePDFModal} showCloseButton={true}>
            <PDFViewer file={fileToView}></PDFViewer>
        </PDFModalDialog>}
      </div>
      <div className="detailsNext">
        <button onClick={handleNext}>Next</button>
        <button onClick={handleBack} style={{marginRight:'10px'}}>Back</button>
      </div>
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={showCloseButton} isConfirmation={isConfirmation} 
      confirmationFn={handleConfirmation} confirmationBtnText={confirmationBtnText}>
        {modalText}
      </ModalDialog>
    </div>
  );
};

export default Reports;

