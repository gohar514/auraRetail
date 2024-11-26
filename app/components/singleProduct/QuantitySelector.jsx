

import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  return (
    <div>
      <div className="text-base text-gray-600">Quantity</div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center"
          onClick={() => handleQuantityChange(-1)}
          aria-label="Decrease quantity"
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          className="bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center"
          onClick={() => handleQuantityChange(1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
