import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/*<button className="close-button" onClick={onClose}>
          Close
        </button>*/}
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;