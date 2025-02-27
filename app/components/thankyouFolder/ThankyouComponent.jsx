// app/components/thankyouFolder/ThankYouComponent.jsx

'use client';  // Mark this component as a client component

import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ThankYouComponent = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center font-tenorSans bg-cream">
      <IoMdCheckmarkCircleOutline className='text-green-700 w-20 h-20 mb-10 md:w-50 md:h-50' />
      <h1 className="text-4xl font-bold mb-4 text-gray-800 font-playfair">Thank You for Your Order!</h1>
      <p className="text-lg mb-2 text-gray-600">Your order has been successfully placed. We appreciate your business!</p>
      <p className="text-lg mb-6 text-gray-600">You will receive a confirmation call .</p>
      <a href="/" className="inline-block bg-darkGreen  text-cream text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-green-950 transition-all duration-300 font-playfair">
        Return to Home
      </a>
    </div>
  );
};

export default ThankYouComponent;
