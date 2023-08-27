import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ isOpen, onClose, showCloseButton, children }) => {
  if (!isOpen) {
    return null;
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        {showCloseButton && <button className="btn-primary close-button" onClick={onClose}>
          Ok
        </button>}
      </div>
    </div>
  );
};

export default ModalDialog;