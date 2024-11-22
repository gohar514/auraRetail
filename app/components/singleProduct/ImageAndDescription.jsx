

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ProductsData } from "../homePage/ProductsData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Link from "next/link";
import AlertPopup from "../AlertPopup";
import { motion } from "framer-motion";
import { FaAngleLeft , FaAngleRight} from "react-icons/fa6";
import Image from "next/image";
import fallbackImage from "@/assets/static_image_aura_with_text.png"; // Adjust the path based on your folder structure
import { useRef } from "react";


const ImageAndDescription = () => {
  const fallbackRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  // State variables
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [direction, setDirection] = useState(0);

  // Find product by ID
  const product = useMemo(
    () => ProductsData.find((p) => p.id === parseInt(id)) || null,
    [id]
  );
  console.log(product.color)

  // Calculate discounted price
  const discountedPrice = useMemo(
    () =>
      product && product.discount > 0
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : product?.price?.toFixed(2),
    [product]
  );

  // Lifecycle effect
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <motion.div
          className="border-t-4 border-b-4 border-black w-16 h-16 rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  if (!product || !product.images?.length)
    return <div>Product not found or images unavailable.</div>;

  // Utility functions
  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(1, prev + increment));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
        price: discountedPrice,
      })
    );
    setShowAlert(true);
  };

  const handleNextImage = (dir) => {
    setDirection(dir);
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (dir) => {
    setDirection(dir);
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleSwipe = (touchEnd) => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 50) changeImage(1); // Swipe left
    else if (swipeDistance < -50) changeImage(-1); // Swipe right
  };

  const changeImage = (direction) => {
    setDirection(direction);
    setCurrentImage((prev) =>
      (prev + direction + product.images.length) % product.images.length
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-20 py-4 lg:py-12 font-tenorSans">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-sm:place-items-center">
       {/* Image Slider */}
<div
      className="relative w-[350px] h-[350px] sm:h-[500px] sm:w-[500px] md:h-[700px] md:w-[700px] lg:h-[500px] lg:w-[500px] bg-white rounded-lg flex items-center  justify-center overflow-hidden"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
       // Fixed size to prevent collapsing
    >
      <motion.div
        key={currentImage}
        initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="lg:p-8 relative w-full h-full flex items-center"
      >
        {/* Fallback Image */}
        <div
          ref={fallbackRef} // Attach the ref
          className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-white"
        >
          <Image
            src={fallbackImage} // Fallback image path
            alt="Fallback Aura"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Actual Image */}
        <Image
          src={product.images[currentImage]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className=" flex justify-center items-center w-full h-full rounded-lg z-20"

          quality={75}
          onLoadingComplete={() => {
            // Hide the fallback image when the main image loads
            if (fallbackRef.current) {
              fallbackRef.current.style.display = "none";
            }
          }}
        />
      </motion.div>

      {/* Image Counter */}
      <div className="absolute top-0 left-0 p-2 text-xs font-playfair z-30">
        {currentImage + 1} / {product.images.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={() => handlePrevImage(-1)}
        className="hidden md:block absolute left-2 top-1/4 transform -translate-y-1/2 text-gray-600 bg-transparent z-30"
      >
        <FaAngleLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => handleNextImage(1)}
        className="hidden md:block absolute right-2 top-1/4 transform -translate-y-1/2 text-gray-600 bg-transparent z-30"
      >
        <FaAngleRight className="w-6 h-6" />
      </button>
    </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4 md:space-y-6">
          <h1 className="text-xl font-semibold text-gray-900 font-playfair">
            {product.name}
          </h1>
          <p className="text-base text-gray-600">
            Color:{" "}
            <span className="font-normal text-gray-900">{product.color}</span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="text-base text-gray-800">Rs. {discountedPrice}</div>
            {product.discount > 0 && (
              <>
                <div className="text-base text-gray-500 line-through">
                  Rs. {product.price.toFixed(2)}
                </div>
                <div className="text-red-500 text-sm rounded-md">
                  Save {product.discount}%
                </div>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="text-base text-gray-600">Quantity</div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-300 text-gray-800 rounded-md w-6 h-8 text-xl flex justify-center items-center  "
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="bg-gray-300 text-gray-800 rounded-md w-6 h-8 "
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddToCart}
              className="border border-black py-3 px-6 rounded-md hover:bg-gray-100 transition-all font-playfair"
            >
              Add to Cart
            </button>
            <Link href="/checkout">
              <button onClick={handleAddToCart}
                className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-all w-full border border-black font-playfair"
              >
                Buy it now
              </button>
            </Link>
          </div>

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
              <div className="p-2  bg-gray-100 border-r border-gray-400">Gender:</div>
              <div className="p-2 bg-gray-100">{product.gender}</div>
              <div className="p-2 border-r border-gray-400">Material:</div>
              <div className="p-2">{product.material}</div>
            </div>
          </div>

 


          {/* Alert Popup */}
          {showAlert && (
            <AlertPopup
              message={`${product.name} added to cart at Rs. ${discountedPrice}!`}
              onClose={() => setShowAlert(false)}
              duration={2000}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndDescription;

