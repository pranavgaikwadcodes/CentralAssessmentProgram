import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const PopUpModal = ({ open, onClose, isSuccess, message }) => {
  let icon = isSuccess ? (
    <CheckCircleOutlineIcon className="text-green-500 " sx={{ fontSize: 100 }}/>
  ) : (
    <CancelIcon className="text-red-500 text-5xl" />
  );

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
        <div className="flex justify-center items-center mb-4">
          {icon}
        </div>
        <span className="text-center">{message}</span>
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

export default PopUpModal;
