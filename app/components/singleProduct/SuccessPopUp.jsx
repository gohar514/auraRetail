// components/SuccessPopup.js

import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SuccessPopUp = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose} // Close on click outside the popup
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg w-11/12 sm:w-96 max-w-lg p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-300"
        >
          <IoCloseOutline className='w-6 h-6'/>
        </button>

        <div className="text-center">
        <div className='m-2 mx-3 p-0'>
            <div className='flex flex-col justify-center items-center '>
            <p className='  text-xl font-bold md:text-2xl lg:text-3xl'>Aura</p>
            <p className=' text-[5px] -mt-1.5 '>TIMELESS ELEGANCE</p>
            </div>
            <div className='flex justify-center items-center'>
            <IoMdCheckmarkCircleOutline className='text-green-700 w-10 h-10 mt-4 mb-1 ' /></div>

            </div>
          <p className="text-gray-600 text-lg mb-4">{message}</p>
          <p onClick={onClose} className="inline-block bg-black text-white text-base font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer font-tenorSans">
            Close
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopUp;
