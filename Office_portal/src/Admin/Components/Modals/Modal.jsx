import React from "react";
import { FaCross } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`${
        className
          ? className
          : "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-md w-full">
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaCross />
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
