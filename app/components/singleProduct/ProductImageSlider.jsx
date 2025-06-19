"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductImageSlider = React.memo(({ images, productName }) => {
  const fallbackRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState(new Set());
  const [isCurrentImageLoaded, setIsCurrentImageLoaded] = useState(false);

  const handleImageLoad = (i) => {
    setLoadedIndexes((prev) => {
      const newSet = new Set(prev);
      newSet.add(i);
      return newSet;
    });

    if (i === currentImage) {
      setIsCurrentImageLoaded(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-4 w-full">
      {/* Left Button */}
      <motion.button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous Image"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex items-center justify-center w-10 h-10 text-white bg-black/40 hover:bg-black/70 rounded-full z-30 backdrop-blur-md transition"
      >
        <FaAngleLeft className="w-6 h-6" />
      </motion.button>

      {/* Slider Container */}
      <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-cream rounded-2xl overflow-hidden shadow-xl">
        {/* Fallback Image */}
        <div
          ref={fallbackRef}
          className={`absolute inset-0 z-10 flex items-center justify-center bg-cream transition-opacity duration-300 ease-in-out ${
            isCurrentImageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Image
            src="/assets/static_image_aura_with_text.png"
            alt={`${productName} fallback`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Swiper Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            const newIndex = swiper.realIndex;
            setCurrentImage(newIndex);
            setIsCurrentImageLoaded(loadedIndexes.has(newIndex));
          }}
          slidesPerView={1}
          loop={images.length > 1}
          speed={600}
          className="absolute inset-0 w-full h-full z-20"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={
                  loadedIndexes.has(i)
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0.6, scale: 0.98 }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src={img}
                  alt={`${productName} - Image ${i + 1}`}
                  fill
                  className="object-cover rounded-xl"
                  quality={80}
                  loading="lazy"
                  onLoad={() => handleImageLoad(i)}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Image Counter */}
        <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-transparent text-black rounded font-playfair backdrop-blur-sm z-30">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Right Button */}
      <motion.button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next Image"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex items-center justify-center w-10 h-10 text-white bg-black/40 hover:bg-black/70 rounded-full z-30 backdrop-blur-md transition"
      >
        <FaAngleRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
});

export default ProductImageSlider;
