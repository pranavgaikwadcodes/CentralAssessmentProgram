import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationModal = ({ open, onClose, onConfirm, title, content }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white/95 rounded-xl shadow p-10 flex flex-col items-center justify-center
          transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-center mb-6">{content}</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder=" "
        />
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => onConfirm(inputValue)}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Cancel
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
