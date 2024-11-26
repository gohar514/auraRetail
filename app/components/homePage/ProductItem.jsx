import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageSlider } from "./ImageSlider"; // Separate ImageSlider component
import { ProductDetails } from "./ProductDetails"; // Separate ProductDetails component

// ProductItem Component
const ProductItem = React.memo(({ product, index, currentImageIndex, direction, handleTouchStart, handleTouchEnd }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      <Link href={product.link}>
        <div
          className="relative w-full aspect-w-4 aspect-h-5"
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, index)}
        >
          <ImageSlider
            currentImageIndex={currentImageIndex}
            product={product}
            direction={direction}
          />
          {product.discount > 0 && (
            <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold">
              {product.discount}%
            </div>
          )}
        </div>
      </Link>
      <ProductDetails product={product} />
    </div>
  );
});

export default ProductItem;
