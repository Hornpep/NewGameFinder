import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Login from '../pages/Login';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-gray-800 p-5 rounded-lg shadow-lg">
        <button 
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <Login />
      </div>
    </div>
  );
}