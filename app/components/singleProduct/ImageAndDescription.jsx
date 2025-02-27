"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";
import Link from "next/link";
import ProductImageSlider from "./ProductImageSlider";
import QuantitySelector from "./QuantitySelector";
import ProductDetails from "./ProductDetails";
import AlertPopup from "../AlertPopup";
import { ProductsData } from "../homePage/ProductsData";
import { AddToCart, SingleProductPageView, Checkout } from "@/app/lib/metaPixel";

// Memoize ProductDetails, QuantitySelector, and ProductImageSlider for reusability
const MemoizedProductDetails = React.memo(ProductDetails);
const MemoizedQuantitySelector = React.memo(QuantitySelector);
const MemoizedProductImageSlider = React.memo(ProductImageSlider);

const ImageAndDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pathname = usePathname();
 
   useEffect(() => {
     // Track PageView on route change
    SingleProductPageView()
   }, [pathname]);

  // State variables
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  // Memoize product lookup to avoid recomputation on every render
  const product = useMemo(() => ProductsData.find((p) => p.id === parseInt(id)) || null, [id]);

  if (!product) return <div>Product not found.</div>;

  // Optimized memoization for discounted price calculation
  const discountedPrice = useMemo(() => {
    if (!product.discount) return product.price.toFixed(2);
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  }, [product.price, product.discount]);

  // Memoize the add to cart handler to prevent unnecessary re-renders
  const handleAddToCart = useCallback((buttonClick) => {
    dispatch(
      addToCart({
        ...product,
        quantity,
        price: discountedPrice,
      })
    );
    buttonClick === "buy" ? (setShowAlert(false), Checkout()) : (setShowAlert(true), AddToCart());

  }, [dispatch, product, quantity, discountedPrice]);

  return (
    <div className="container mx-auto px-4 lg:px-20 py-4 lg:py-12 font-tenorSans bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-sm:place-items-center">
        {/* Image Slider */}
        <MemoizedProductImageSlider images={product.images} productName={product.name} />

        {/* Product Details */}
        <div className="flex flex-col space-y-4 md:space-y-6">
          <h1 className="text-xl font-semibold text-gray-900 font-playfair">
            {product.name}
          </h1>
          <p className="text-base text-gray-600">
            Color: <span className="font-normal text-gray-900">{product.color}</span>
          </p>

          {/* Price Display */}
          <div className="flex items-center gap-3">
            <div className="text-base text-gray-800 flex">
              <span>Rs.</span> {discountedPrice}
            </div>
            {product.discount > 0 && (
              <>
                <div className="text-base text-gray-500 line-through flex">
                  <span>Rs.</span> {product.price.toFixed(2)}
                </div>
                <div className="text-red-500 text-sm rounded-md flex">
                  <span>Save</span> {product.discount}%
                </div>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <MemoizedQuantitySelector quantity={quantity} setQuantity={setQuantity} />

          {/* Call-to-Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddToCart}
              className="border border-darkGreen text-darkGreen py-3 px-6 rounded-md hover:bg-[#FFFCF7] transition-all font-playfair"
            >
              Add to Cart
            </button>
            <Link href="/checkout">
              <button
              onClick={()=>handleAddToCart("buy")}
                className="bg-darkGreen text-cream py-3 px-6 rounded-md hover:bg-green-950 transition-all w-full border border-darkGreen font-playfair"
              >
                Buy it now
              </button>
            </Link>
          </div>

          {/* Product Description */}
          <MemoizedProductDetails product={product} />

          {/* Alert Popup */}
          {showAlert && (
            <AlertPopup
              message={`${product.name} added to cart at Rs. ${discountedPrice}!`}
              onClose={() => setShowAlert(false)}
              
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndDescription;
