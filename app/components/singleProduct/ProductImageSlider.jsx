"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ProductImageSlider = React.memo(({ images, productName }) => {
  const fallbackRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [direction, setDirection] = useState(0);

  // Handle swipe gestures with memoized function to avoid unnecessary re-renders
  const handleSwipe = useCallback((touchEnd) => {
    const swipeDistance = touchStart - touchEnd;
    if (Math.abs(swipeDistance) > 50) {
      changeImage(swipeDistance > 0 ? 1 : -1);
    }
  }, [touchStart]);

  // Memoized image change function
  const changeImage = useCallback((dir) => {
    setDirection(dir);
    setCurrentImage((prev) => (prev + dir + images.length) % images.length);
  }, [images.length]);

  // Memoize image key to avoid unnecessary re-renders in AnimatePresence
  const imageKey = `${currentImage}-${direction}`;

  return (
    <div
      className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[500px] lg:h-[500px] bg-cream rounded-lg flex items-center justify-center overflow-hidden"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)} // Record touch start position
      onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)} // Trigger swipe on touch end
    >
      <AnimatePresence custom={direction}>
        <motion.div
          key={imageKey} // Use a unique key to optimize lifecycle of each image
          initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Fallback Image */}
          <div
            ref={fallbackRef}
            className="absolute inset-0 z-10 flex items-center justify-center bg-cream"
          >
            <Image
              src="/assets/static_image_aura_with_text.png"
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
            quality={75} // Adjust quality to balance performance and visuals
            loading="lazy" // Lazy loading images for performance
            onLoadingComplete={() => {
              // Hide fallback image once main image is loaded
              if (fallbackRef.current) fallbackRef.current.style.display = "none";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Counter */}
      <div className="absolute top-2 left-2 p-1 text-xs bg-transparent font-playfair  ">
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
});

export default ProductImageSlider;

