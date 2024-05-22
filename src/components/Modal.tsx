import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75 transition-opacity">
      <div className="modal relative max-w-[300px] bg-white px-12 pb-12 pt-20">
        {children}
        <button
          onClick={onClose}
          className="btn absolute right-5 top-5"
          aria-label="Close Modal"
        >
          X
        </button>
      </div>
    </div>
  );
};
