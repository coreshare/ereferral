import React, { useState, useEffect } from "react";
import "./Reports.css";

const Reports = ({ onNext, selectedStage, getFiles }) => {
  const [draggingOver, setDraggingOver] = useState(null);
  const [files, setFiles] = useState([]);

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
    const newStage = { ReportName: report, ReportFile: droppedFile };
    setFiles([...files, newStage]);
  };

  return (
    <div>
      <div style={{ float: "left" }}>
        <h3 className="detailsHeader">Reports</h3>
        {selectedStage.reports.map((report, index) => {
          const hasFile = files.some((file) => file.ReportName === report);
          return (
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
              {report}
            </div>
          );
        })}
      </div>
      <div className="detailsNext">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Reports;
