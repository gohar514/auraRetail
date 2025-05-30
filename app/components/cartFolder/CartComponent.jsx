"use client"; // Ensures the component is rendered on the client side

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "@/app/store/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";
import Spinner from "../Spinner";
import { Checkout } from "@/app/lib/metaPixel";


const CartComponent = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading]= useState(false)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const router = useRouter();

  // No need for isMounted here if you ensure hooks are always called
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Only run this on the client
  }, []);

  // Memoize total price calculation to avoid unnecessary recalculations
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  }, [cartItems]);

  // Memoize button handlers to avoid unnecessary re-renders
  const handleGoBack = useCallback(() => {
    router.push("/products");
  }, [router]);

  const handleRemoveItem = useCallback(
    (id) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleIncreaseQuantity = useCallback(
    (item) => {
      dispatch(addToCart({ ...item, quantity: 1 }));
    },
    [dispatch]
  );

  const handleClick = 
    () => {
      Checkout()
      console.log("go")
    };
    
  

  // Handle empty cart
  if (!isMounted) {
    return (
      <>
      <Spinner/>
      </>
    );
  }

  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <div className="text-center h-screen flex flex-col items-center justify-center gap-1 p-8 bg-cream">
        <h1 className="text-2xl font-playfair font-bold">Your cart is empty</h1>
        <Link href="/" className=" text-gray-500 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-tenorSans bg-cream">
      <div className="flex flex-col lg:flex-row gap-2 justify-between">
        {/* Products Section */}
        <div className="w-full lg:w-3/4  shadow-lg rounded-lg p-6 mb-6 lg:mb-0">
          <h1 className="text-xl font-playfair font-semibold mb-6">Shopping Cart</h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-[#FFFCF7] rounded-lg mb-4 shadow-sm gap-8"
            >
              {/* Product Image */}
              <div className="w-1/4 flex justify-start items-start mb-4 md:mb-0">
                <Image
                  src={item.images?.[0] || "/placeholder.png"} // Safe access for images
                  width={200}
                  height={200}
                  alt={item.name || "Product Image"}
                  className="w-auto h-auto object-cover rounded-lg"
                  priority // Optimize image loading
                
                />
              </div>

              {/* Product Details */}
              <div className="w-3/4 flex flex-col items-start text-left">
                <h2 className="text-lg md:font-semibold">{item.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.color || "N/A"}</p>
                <p className="text-lg md:font-semibold mt-2">Rs.{item.price}</p>

                {/* Quantity and Remove */}
                <div className="flex items-center border border-gray-200 gap-4 my-4">
                  <button
                    className="px-2 py-[2px] rounded-lg"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <p className="text-lg">{item.quantity}</p>
                  <button
                    className="px-2 py-[2px] rounded-lg"
                    onClick={() => handleIncreaseQuantity(item)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-20 bg-[#FFFCF7] shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-playfair font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <span>Subtotal</span>
              <RxDotFilled className="mx-1 text-gray-500" />
              <span className="text-xs">{totalQuantity} items</span>
            </div>
            <div>Rs.{totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>Rs.{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-4 mt-4">
          <button 
  onClick={() => {
    setLoading(true);
    Checkout(); // Your existing tracking call
    router.push("/checkout");
  }}
  disabled={loading}
  className="bg-darkGreen text-cream py-2 px-4 rounded-md font-semibold hover:bg-green-950 transition-all w-full font-playfair flex items-center justify-center"
  aria-label="Proceed to Checkout"
>
  {loading ? (
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
  ) : (
    "Checkout"
  )}
</button>

            <button
              onClick={handleGoBack}
              className="underline text-sm hover:text-gray-700"
              aria-label="Continue Shopping"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;

