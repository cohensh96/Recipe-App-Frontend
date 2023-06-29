import React, { useState } from 'react';

const ConfrimPopup = ({ message, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete</button>
      {isOpen && (
        <div className="confirmation-popup">
          <div className="confirmation-popup-content">
            <h3>{message}</h3>
            <div className="confirmation-popup-buttons">
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfrimPopup;