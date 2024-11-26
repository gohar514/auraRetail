import React from "react";

const ProductDetails = ({
  product
}) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
    
      {/* Product Description */}
      <h2 className="text-xl font-semibold text-gray-900 font-playfair">
        Product Details
      </h2>
      <div className="border border-gray-200 bg-gray-100 rounded-sm px-4 py-4">
        <p className="text-gray-600 text-justify leading-relaxed">
          {product.description}
        </p>
        <div className="text-start font-semibold pt-2 font-playfair">
          Measurements:
        </div>
        <ul className="list-disc ml-6 text-gray-600 mt-2">
          <li>Width: {product.width} Inches</li>
          <li>Height: {product.height} Inches</li>
        </ul>
        <p className="text-center font-semibold pt-2 font-playfair">
          More Information
        </p>
        <div className="mt-2 grid grid-cols-2 bg-gray-200 border-x border-gray-200">
          <div className="p-2 border-r border-gray-400">Color:</div>
          <div className="p-2">{product.color}</div>
          <div className="p-2 bg-gray-100 border-r border-gray-400">Gender:</div>
          <div className="p-2 bg-gray-100">{product.gender}</div>
          <div className="p-2 border-r border-gray-400">Material:</div>
          <div className="p-2">{product.material}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
