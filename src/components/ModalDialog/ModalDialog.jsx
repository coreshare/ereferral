import React from 'react';
import './ModalDialog.css';

const ModalDialog = ({ isOpen, onClose, showCloseButton, isConfirmation, confirmationFn, confirmationBtnText, children }) => {
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
        <div>{children}</div>{!isConfirmation && showCloseButton && <><br/><br/></>}
        {showCloseButton && <button className="btn-primary close-button" onClick={onClose}>
          Ok
        </button>}
        {isConfirmation && <><br/>
        <button className="btn-primary close-button" onClick={() => {handleConfirmation(true)}} style={{marginRight:'5px'}}>
          {confirmationBtnText}
        </button><button className="btn-primary close-button" onClick={() => {handleConfirmation(false)}} style={{marginLeft:'5px'}}>
          Cancel
        </button></>}
      </div>
    </div>
  );
};

export default ModalDialog;