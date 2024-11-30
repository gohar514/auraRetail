import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="  flex flex-col gap-2 ">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleToggle}>
      <div className=" text-gray-600 border border-gray-200 p-1 rounded-full">
          {isOpen ? <IoChevronUp className='w-4 h-4' /> : <IoChevronDown className='w-4 h-4' />}
        </div>
        <div className="text-lg  text-gray-800 font-playfair">{question}</div>
       
      </div>

      <div
        className={`mb-2  text-gray-800 transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FaqItem;
