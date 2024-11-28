

// import React from "react";

// const QuantitySelector = ({ quantity, setQuantity }) => {
//   const handleQuantityChange = (increment) => {
//     setQuantity((prev) => Math.max(1, prev + increment));
//   };

//   return (
//     <div>
//       <div className="text-base text-gray-600">Quantity</div>
//       <div className="flex items-center space-x-4">
//         <button
//           className="bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center"
//           onClick={() => handleQuantityChange(-1)}
//           aria-label="Decrease quantity"
//           disabled={quantity === 1}
//         >
//           -
//         </button>
//         <span className="text-lg">{quantity}</span>
//         <button
//           className="bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center"
//           onClick={() => handleQuantityChange(1)}
//           aria-label="Increase quantity"
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuantitySelector;

import React, { useCallback } from "react";

// Apply React.memo properly
const QuantitySelector = ({ quantity, setQuantity }) => {
  // Memoized function to handle quantity changes
  const handleQuantityChange = useCallback(
    (increment) => {
      setQuantity((prev) => Math.max(1, prev + increment));
    },
    [setQuantity]
  );

  return (
    <div className="space-y-2">
      <div className="text-base text-gray-600">Quantity</div>
      <div className="flex items-center space-x-4">
        <button
          className={`bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center ${quantity === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
          onClick={() => handleQuantityChange(-1)}
          aria-label="Decrease quantity"
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          className="bg-gray-300 text-gray-800 rounded-md w-5 h-8 flex items-center justify-center hover:bg-gray-400"
          onClick={() => handleQuantityChange(1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(QuantitySelector);

