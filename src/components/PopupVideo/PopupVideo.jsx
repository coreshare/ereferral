import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PopupVideo = ({ videoSrc, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '800px',
          padding: '0',
          border: 'none',
          borderRadius: '10px',
          background: 'black',
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Close
        </button>
        <video
          controls
          autoPlay
          style={{ width: '100%', height: 'auto' }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
};

export default PopupVideo;
