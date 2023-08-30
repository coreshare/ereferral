import React from 'react';
import './PDFModalDialog.css';

const PDFModalDialog = ({ isOpen, onClose, showCloseButton, children }) => {
  if (!isOpen) {
    return null;
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay-pdf">
      <div className="modal-content-pdf">
        {children}
        {showCloseButton && <button style={{marginTop: '0px'}} className="btn-primary close-button" onClick={onClose}>
          Close
        </button>}
      </div>
    </div>
  );
};

export default PDFModalDialog;