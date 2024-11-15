"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductsData } from "../homePage/ProductsData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Link from "next/link";
import AlertPopup from "../AlertPopup";

const ImageAndDescription = () => {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = ProductsData.find((p) => p.id === parseInt(id));

  if (!mounted) return <div>Loading...</div>;
  if (!product || !product.images || product.images.length === 0) return <div>Product not found or images unavailable.</div>;

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    const discountedPrice = product.discount > 0 
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);
    
    dispatch(addToCart({
      ...product,
      quantity,
      price: discountedPrice
    }));
    setShowAlert(true);
  };

  const closeAlert = () => setShowAlert(false);

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    const touchStart = e.touches[0].clientX;
    setTouchStart(touchStart);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    setTouchEnd(touchEnd);

    if (touchStart - touchEnd > 50) {
      // Swipe left (next image)
      handleNextImage();
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right (previous image)
      handlePrevImage();
    }
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-16 py-8 lg:py-12 font-tenorSans">
      <div className="grid h-auto grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Image Slider */}
        <div 
          className="relative lg:h-1/2 bg-gray-100 rounded-lg flex items-start justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="max-w-full bg-cover h-full rounded-lg shadow-lg"
          />
          <div className="absolute top-0 left-0 p-2 text-xs font-playfair">
            {currentImage + 1} / {product.images.length}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-4 md:space-y-6">
          <h1 className="text-xl font-semibold text-gray-900 font-playfair">{product.name}</h1>
          <p className="text-base text-gray-600">
            Color: <span className="font-normal text-gray-900">{product.color}</span>
          </p>

          {/* Price with Discount Display */}
          <div className="flex items-center gap-3">
            <div className="text-base text-gray-800">
              <span className="ml-1">Rs.</span>
              {product.discount > 0 
                ? ((product.price * (1 - product.discount / 100)).toFixed(2))
                : product.price.toFixed(2)}
            </div>
            {product.discount > 0 && (
              <div className="text-base text-gray-500 line-through">
                Rs.{product.price.toFixed(2)}
              </div>
            )}
            {product.discount > 0 && (
              <div className="text-red-500 text-sm rounded-md">
                Save {product.discount}%
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="text-base text-gray-600">Quantity</div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-gray-300 text-gray-800 rounded-md px-2 py-1 disabled:opacity-50"
                onClick={handleDecrement}
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="bg-gray-300 text-gray-800 rounded-md px-2 py-1"
                onClick={handleIncrement}
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
            <Link href={"/checkout"}>
              <button
                className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-all w-full border border-black font-playfair"
                onClick={handleAddToCart}
              >
                Buy it now
              </button>
            </Link>
          </div>

          {/* Product Description */}
          <h2 className="text-xl font-semibold text-gray-900 font-playfair">Product Details</h2>
          <div className="border border-gray-200 bg-gray-100 rounded-sm px-2 py-4">
            <p className="text-gray-600 text-justify leading-relaxed">{product.description}</p>
            <div>
              <div className="text-start font-semibold py-2 font-playfair">Measurements:</div>
              <ul className="list-disc ml-6 text-gray-600">
                <li>Width: <span className="mx-auto">{product.width}</span> Inches</li>
                <li>Height: <span className="mx-auto">{product.height}</span> Inches</li>
              </ul>
            </div>
            <div className="m-4">
              <p className="text-center font-semibold py-2 font-playfair">More Information</p>
              <div className="w-full border border-gray-200">
                <div className="flex justify-start items-center bg-gray-200 p-2">
                  <div className="w-full">Color:</div>
                  <div className="w-full pl-2 border-l border-l-gray-400">{product.color}</div>
                </div>
                <div className="flex justify-start items-center p-2">
                  <div className="w-full">Gender:</div>
                  <div className="w-full pl-2 border-l border-l-gray-400">{product.gender}</div>
                </div>
                <div className="flex justify-start items-center bg-gray-200 p-2">
                  <div className="w-full">Material:</div>
                  <div className="w-full pl-2 border-l border-l-gray-400">{product.material}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alert Popup */}
          {showAlert && (
            <AlertPopup
              message={`${product.name} added to cart at Rs.${(product.price * (1 - product.discount / 100)).toFixed(2)}!`}
              onClose={closeAlert}
              duration={2000}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndDescription;
