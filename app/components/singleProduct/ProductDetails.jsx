import React from "react";

// Memoizing the component to prevent unnecessary re-renders when `product` remains unchanged
const ProductDetails = React.memo(({ product }) => {
  // Destructure the properties for readability
  const { description, width, height, color, gender, material } = product;

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      {/* Product Description */}
      <h2 className="text-xl font-semibold text-gray-900 font-playfair">
        Product Details
      </h2>
      <div className="border border-gray-200 bg-[#FFFCF7] rounded-sm px-4 py-4">
        {/* Description Block */}
        {description && (
          <p className="text-gray-600 text-justify leading-relaxed">{description}</p>
        )}

        {/* Measurements */}
        {(width || height) && (
          <>
            <div className="text-start font-semibold pt-2 font-playfair">Measurements:</div>
            <ul className="list-disc ml-6 text-gray-600 mt-2">
              {width && <li>Width: {width} Inches</li>}
              {height && <li>Height: {height} Inches</li>}
            </ul>
          </>
        )}

        {/* More Information */}
        <p className="text-center font-semibold pt-2 font-playfair">More Information</p>
        <div className="mt-2 grid grid-cols-2 bg-cream border-x border-gray-200 rounded-lg shadow-sm overflow-hidden">
  {color && (
    <>
      <div className="p-3 border-r border-[#D4CFC9] bg-gradient-to-r from-[#F8F3EE] to-[#F8F3EE]/90 font-medium text-gray-700">Color:</div>
      <div className="p-3 bg-gradient-to-r from-[#F8F3EE] to-[#F8F3EE]/90 text-gray-600">{color}</div>
    </>
  )}
  {gender && (
    <>
      <div className="p-3 border-r border-[#D4CFC9] bg-gradient-to-r from-[#FFFCF7] to-[#FFFCF7]/90 font-medium text-gray-700">Gender:</div>
      <div className="p-3 bg-gradient-to-r from-[#FFFCF7] to-[#FFFCF7]/90 text-gray-600">{gender}</div>
    </>
  )}
  {material && (
    <>
      <div className="p-3 border-r border-[#D4CFC9] bg-gradient-to-r from-[#F8F3EE] to-[#F8F3EE]/90 font-medium text-gray-700">Material:</div>
      <div className="p-3 bg-gradient-to-r from-[#F8F3EE] to-[#F8F3EE]/90 text-gray-600">{material}</div>
    </>
  )}
</div>

      </div>
    </div>
  );
});

export default ProductDetails;


