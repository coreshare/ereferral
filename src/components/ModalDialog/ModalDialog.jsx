import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ isOpen, onClose, showCloseButton, isConfirmation, confirmationFn, children }) => {
  debugger;
  if (!isOpen) {
    return null;
  }
  
  const handleConfirmation = (confirm) => {
    confirmationFn(confirm);
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div>{children}</div>
        {showCloseButton && <button className="btn-primary close-button" onClick={onClose}>
          Ok
        </button>}
        {isConfirmation && <><button className="btn-primary close-button" onClick={() => {handleConfirmation(true)}}>
          Delete
        </button><button className="btn-primary close-button" onClick={() => {handleConfirmation(false)}}>
          Cancel
        </button></>}
      </div>
    </div>
  );
};

export default ModalDialog;