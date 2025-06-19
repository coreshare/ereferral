import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const workerUrl = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url);

const PDFViewer = ({ file }) => {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPDF, setViewPDF] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => setPDFFile(e.target.result);
    }, [file]);

    useEffect(() => {
        if (pdfFile) setViewPDF(pdfFile);
    }, [pdfFile]);

    useEffect(() => {
        alert("Using PDF.js worker URL: " + workerUrl.toString());
    }, []);
    
    const newPlugin = defaultLayoutPlugin();

    return (
        <div className="pdf-container">
            <Worker workerUrl={workerUrl.toString()}>
                {viewPDF && <Viewer fileUrl={viewPDF} plugins={[newPlugin]} />}
            </Worker>
        </div>
    );
};

export default PDFViewer;
