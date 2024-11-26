"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ProductImageSlider = ({ images, fallbackImage, productName }) => {
  const fallbackRef = useRef(null); // For fallback image handling
  const [currentImage, setCurrentImage] = useState(0); // Tracks the current image index
  const [touchStart, setTouchStart] = useState(0); // Tracks the starting touch position for swiping
  const [direction, setDirection] = useState(0); // Tracks swipe direction for animation

  // Handle swipe gestures
  const handleSwipe = (touchEnd) => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 50) changeImage(1); // Swipe left
    else if (swipeDistance < -50) changeImage(-1); // Swipe right
  };

  // Update the current image index based on direction
  const changeImage = (dir) => {
    setDirection(dir);
    setCurrentImage((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div
      className="relative w-[350px] h-[350px] sm:h-[500px] sm:w-[500px] lg:h-[500px] lg:w-[500px] bg-white rounded-lg flex items-center justify-center overflow-hidden"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)} // Record touch start position
      onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)} // Trigger swipe on touch end
    >
      {/* AnimatePresence handles mounting and unmounting animations */}
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentImage} // Key ensures each image has its unique animation lifecycle
          initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Fallback Image */}
          <div
            ref={fallbackRef}
            className="absolute inset-0 z-10 flex items-center justify-center bg-white"
          >
            <Image
              src={fallbackImage}
              alt={`${productName} fallback`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Current Image */}
          <Image
            src={images[currentImage]}
            alt={`${productName} - Image ${currentImage + 1}`}
            fill
            className="rounded-lg z-20 object-cover"
            quality={75}
            onLoadingComplete={() => {
              if (fallbackRef.current) fallbackRef.current.style.display = "none";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Counter */}
      <div className="absolute top-2 left-2 p-1 text-xs font-playfair bg-gray-100 bg-opacity-70 rounded">
        {currentImage + 1} / {images.length}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => changeImage(-1)}
        aria-label="Previous Image"
        className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black z-30"
      >
        <FaAngleLeft className="w-8 h-8" />
      </button>
      <button
        onClick={() => changeImage(1)}
        aria-label="Next Image"
        className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black z-30"
      >
        <FaAngleRight className="w-8 h-8" />
      </button>
    </div>
  );
};

export default ProductImageSlider;
