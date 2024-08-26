import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Login from '../pages/Login';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relativ rounded-lg shadow-lg max-w-md mx-auto">
        {/* Close button */}
        <button
          className="absolute top-0 right-0 m-4 text-white text-lg hover:text-gray-400" // Adjusted position
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        {/* Login component */}
        <Login closeModal={onClose} />
      </div>
    </div>
  );
}