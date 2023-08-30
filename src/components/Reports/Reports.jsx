import React, { useState, useEffect } from "react";
import "./Reports.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFModalDialog from "../PDFModalDialog/PDFModalDialog";
import viewIcon from "../../Images/viewIcon.png";
import deleteIcon from "../../Images/deleteIcon.png";
import ModalDialog from "../ModalDialog/ModalDialog";

const Reports = ({ onNext, selectedStage, getFiles }) => {
  const [draggingOver, setDraggingOver] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileToView, setFileToView] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  const [showCloseButton,setShowCloseButton] = useState(true);
  const [reportFileToDelete,setReportFileToDelete] = useState(null)
  
  useEffect(() => {
    return () => {
        getFiles(files);
    }
  }, [files]);

  const handleNext = () => {
    onNext();
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

  const handleDrop = (e, report) => {
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
    
    const newStage = { ReportName: report, ReportFile: droppedFile };
    setFiles([...files, newStage]);
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

    const handleDeleteFile = (e) => {
        openModal();
        setReportFileToDelete(e.target.title);
    }
    
    const confirmDelete = (confirmedToDelete) => {
        if(confirmedToDelete){
            const updatedFiles = files.filter(file => file.ReportName !== reportFileToDelete);
            setFiles(updatedFiles);
        }
        setReportFileToDelete(null);
        closeModal();
    }

  return (
    <div>
      <div style={{ float: "left" }}>
        <h3 className="detailsHeader">Reports</h3>
        {/*}
        <input type="file" onChange={handleChange} />
        <button onClick={handlePDFView}>View</button>
        <div className="pdf-container">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                {viewPDF && <>
                    <Viewer fileUrl={viewPDF} plugins={[newplugin]}/>
                </>}
            </Worker>
        </div>*/}
        {selectedStage.reports.map((report, index) => {
          const hasFile = files.some((file) => file.ReportName === report);
          var filename = null;
          if (hasFile) {
            var file = files.find(file => file.ReportName === report);
            filename = file.ReportFile.name;
          }

          return (
            <div style={{display:'flex'}}>
                <div style={{width:'40px'}}>{hasFile && <img src={viewIcon} title={report} onClick={handlePDFView} style={{width: '40px',cursor: 'pointer'}}/>}</div>
                <div
                key={index}
                title={report}
                className={`report-strip drop-area ${
                    draggingOver === report ? "dragging" : ""
                } ${hasFile ? "with-file" : ""}`}
                onDragEnter={(e) => handleDragEnter(e, report)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, report)}
                >
                {report}{hasFile && " - "}{hasFile && filename}
                </div>
                {hasFile && <div><img src={deleteIcon} title={report} onClick={handleDeleteFile} style={{width: '25px',margin:'7px 0px 0px 5px',cursor:'pointer'}}/></div>}
            </div>
          );
        })}
        {fileToView && <PDFModalDialog isOpen={isPDFModalOpen} onClose={closePDFModal} showCloseButton={true}>
            <PDFViewer file={fileToView}></PDFViewer>
        </PDFModalDialog>}
      </div>
      <div className="detailsNext">
        <button onClick={handleNext}>Next</button>
      </div>
      <ModalDialog isOpen={isModalOpen} onClose={closeModal} showCloseButton={false} isConfirmation={true} 
      confirmationFn={confirmDelete}>
        <>Are you sure to delete the file?</>
      </ModalDialog>
    </div>
  );
};

export default Reports;

