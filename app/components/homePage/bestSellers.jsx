"use client"
import React, { useState, useMemo, useCallback } from "react";
import { ProductsData } from "./ProductsData"; // Data
import ProductItem from "./ProductItem"; // ProductItem Component
import Link from "next/link";

// BestSellers Component
const BestSellers = ({ relatedProducts }) => {
  const productsToShow = useMemo(() => (
    relatedProducts?.length > 0 ? relatedProducts : ProductsData.slice(0, 4)
  ), [relatedProducts]);

  const [touchStart, setTouchStart] = useState(0);
  const [currentImages, setCurrentImages] = useState(
    Array(productsToShow.length).fill(0)
  );
  const [directions, setDirections] = useState(
    Array(productsToShow.length).fill(0)
  );

  const handleTouchStart = useCallback((e) => setTouchStart(e.touches[0].clientX), []);
  const handleTouchEnd = useCallback((e, index) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) handleNextImage(index);
    if (touchEnd - touchStart > 50) handlePrevImage(index);
  }, [touchStart]);

  const handleNextImage = useCallback((index) => {
    setDirections((prev) => {
      const updated = [...prev];
      updated[index] = 1;
      return updated;
    });
    setCurrentImages((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + 1) % productsToShow[index].images.length;
      return updated;
    });
  }, [productsToShow]);

  const handlePrevImage = useCallback((index) => {
    setDirections((prev) => {
      const updated = [...prev];
      updated[index] = -1;
      return updated;
    });
    setCurrentImages((prev) => {
      const updated = [...prev];
      updated[index] =
        updated[index] === 0
          ? productsToShow[index].images.length - 1
          : updated[index] - 1;
      return updated;
    });
  }, [productsToShow]);

  return (
    <section className="py-8 bg-gray-50 font-tenorSans">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-900 font-playfair">
          {relatedProducts?.length > 0 ? "Related Products" : "Best Sellers"}
        </h2>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsToShow.map((product, index) => (
            <ProductItem
              key={product.id}
              product={product}
              index={index}
              currentImageIndex={currentImages[index]}
              direction={directions[index]}
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
            />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <p className="inline-block py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 font-playfair">
              View All
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
