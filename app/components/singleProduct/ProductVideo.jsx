
"use client"

import { ProductsData } from "../homePage/ProductsData";
import { useParams } from "next/navigation";
import React, {  useMemo } from "react";

const ProductVideo = () => {
    const { id } = useParams();

     // Find product by ID
  const product = useMemo(
    () => ProductsData.find((p) => p.id === parseInt(id)) || null,
    [id]
  );
  return (
    <div>
        
  {/* Video Embed Section */}
{product.video && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-gray-900 font-playfair">
      Watch Video
    </h2>
    <div className="mt-4">
      <div className="relative pb-[56.25%] w-full h-0 overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${product.video}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default ProductVideo