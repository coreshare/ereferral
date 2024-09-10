import React from 'react';
import './PDFModalDialog.css';

const PDFModalDialog = ({ isOpen, onClose, showCloseButton, header, children }) => {
  if (!isOpen) {
    return null;
  }

  if(onClose){

  }

  return (
    <div className="modal-overlay-pdf">
      <div className="modal-content-pdf">
        <div style={{margin:'20px 0px 30px 0px',textAlign:'left'}}>
          <span style={{fontWeight:'bold',fontSize:'26px',maxWidth:'90%',display:'inline-block'}}>{header}</span>
          {showCloseButton && <button style={{marginTop: '0px',float:'right',height:'50px',width:'100px',fontSize:'20px',position:'relative',top:'-15px'}} className="btn-primary close-button" onClick={onClose}>
            Close
          </button>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PDFModalDialog;