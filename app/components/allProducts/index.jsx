

"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { ProductsData } from "../homePage/ProductsData";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const AllProducts = ({ relatedProducts }) => {
  // Memoize the products data to avoid unnecessary recalculation
  const productsToShow = useMemo(() => relatedProducts?.length > 0 ? relatedProducts : ProductsData, [relatedProducts]);

  const [sortOption, setSortOption] = useState("");
  const [currentImages, setCurrentImages] = useState(Array(productsToShow.length).fill(0));
  const [directions, setDirections] = useState(Array(productsToShow.length).fill(0));

  // Ref to track touch start position
  const touchStartRef = useRef(null);

  // Sorting logic with useMemo to avoid recalculation on every render
  const sortedProducts = useMemo(() => {
    const sortBy = {
      "Price, low to high": (a, b) => a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100),
      "Price, high to low": (a, b) => b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100),
      "Date, old to new": (a, b) => new Date(a.date) - new Date(b.date),
      "Date, new to old": (a, b) => new Date(b.date) - new Date(a.date),
      default: () => 0,
    };

    return [...productsToShow].sort(sortBy[sortOption] || sortBy.default);
  }, [sortOption, productsToShow]);

  // Memoized function for sorting change
  const handleSortChange = useCallback((e) => setSortOption(e.target.value), []);

  // Swipe functionality with optimized touch handling
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e, index) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchStart = touchStartRef.current;

    if (touchStart && touchStart - touchEnd > 50) {
      handleNextImage(index); // Swipe left
    }

    if (touchStart && touchEnd - touchStart > 50) {
      handlePrevImage(index); // Swipe right
    }
  }, []); // Empty dependency array since functions are defined before use

  const handleNextImage = useCallback((index) => {
    setDirections(prev => prev.map((dir, i) => i === index ? 1 : dir));
    setCurrentImages(prev => prev.map((img, i) => i === index ? (img + 1) % productsToShow[index].images.length : img));
  }, [productsToShow]);

  const handlePrevImage = useCallback((index) => {
    setDirections(prev => prev.map((dir, i) => i === index ? -1 : dir));
    setCurrentImages(prev => prev.map((img, i) => i === index ? (img === 0 ? productsToShow[index].images.length - 1 : img - 1) : img));
  }, [productsToShow]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-tenorSans">
      <div className="flex justify-end items-center mb-8">
        <select
          className="text-sm py-2 px-2 bg-white rounded-md shadow-sm"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort</option>
          <option value="As Featured">As Featured</option>
          <option value="Price, low to high">Price, low to high</option>
          <option value="Price, high to low">Price, high to low</option>
          <option value="Date, old to new">Date, old to new</option>
          <option value="Date, new to old">Date, new to old</option>
        </select>
      </div>

      <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, index) => {
          const currentImage = product.images[currentImages[index]];

          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div
                  className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, index)}
                >
                  <motion.div
                    key={currentImages[index]}
                    initial={{ x: directions[index] === 1 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: directions[index] === 1 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                   <Image
  aria-label={`Image of ${product.name}`}
  src={currentImage}
  alt={product.name}
  layout="responsive"
  width={450}
  height={562}
  objectFit="cover"
  className="group-hover:scale-105 transition-transform duration-300"
  quality={75}
   // Set to eager for the first image, lazy for others
  priority // Only prioritize the first image
/>

                  </motion.div>
                  {product.discount > 0 && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold">
                      {product.discount}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xs sm:text-base font-semibold mb-2">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-red-600">
                      Rs.{(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </div>
                    {product.discount > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        Rs.{product.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(AllProducts);


