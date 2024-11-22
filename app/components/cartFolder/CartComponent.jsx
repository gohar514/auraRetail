"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "@/app/store/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";

const CartComponent = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const router = useRouter();
    

    // Set component as mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent rendering until the component is mounted
    if (!isMounted) {
        return null;
    }

    // Check for empty cart
    if (cartItems.length === 0) {
        return (
            <div className="text-center h-screen flex flex-col items-center justify-center p-8">
                <h1 className="text-2xl font-playfair font-bold">Your cart is empty</h1>
                <Link href="/" className="mt-4 text-gray-500 underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Calculate total for all items
    const totalPrice = cartItems.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        return acc + itemPrice * itemQuantity;
    }, 0);

    // Handle navigation to the previous page
    const handleGoBack = () => {
        router.push("/products");
    };

    return (
        <div className="container mx-auto px-4 py-8 font-tenorSans">
            <div className="flex flex-col lg:flex-row gap-2 justify-between">
                {/* Products Section */}
                <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0">
                    <h1 className="text-xl font-playfair font-semibold mb-6">Shopping Cart</h1>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-gray-50 rounded-lg mb-4 shadow-sm gap-8"
                        >
                            {/* Product Image */}
                            <div className="w-1/4 flex justify-start items-start mb-4 md:mb-0">
                            <Image
                                    src={item.images[0]}  // Updated to display the first image in the array
                                    alt={item.name}
                                    className="w-auto h-auto object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="w-3/4 flex flex-col items-start text-left">
                                <h2 className="text-lg md:font-semibold">{item.name}</h2>
                                <p className="text-gray-600 text-sm mt-1">{item.color}</p>
                                <p className="text-lg md:font-semibold mt-2">Rs.{item.price}</p>

                                {/* Quantity and Remove */}
                                <div className="flex flex-col items-center md:items-end">
                                    <div className="flex items-center border border-gray-200 gap-4 my-4">
                                        <button
                                            className="px-2 py-[2px] rounded-lg"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            -
                                        </button>
                                        <p className="text-lg">{item.quantity}</p>
                                        <button
                                            className="px-2 py-[2px] rounded-lg"
                                            onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Section */}
                <div className="w-full lg:w-1/4 lg:sticky lg:top-20 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-playfair font-semibold mb-4">Order Summary</h2>

                    <div className="flex justify-between mb-2">
                        <div className="flex justify-start items-center">
                            <div>Subtotal</div>
                            <div><RxDotFilled /></div>
                            <div className="text-xs ml-1">{totalQuantity} <span className="ml-0.5 text-xs">items</span></div>
                        </div>
                        <div>Rs.{totalPrice.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <div>Shipping</div>
                        <div>Free</div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold mb-4">
                        <div>Total</div>
                        <div>Rs.{totalPrice.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Link href="/checkout">
                            <button className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition-all w-full font-playfair">
                                Checkout
                            </button>
                        </Link>
                        <button
                            onClick={handleGoBack}
                            className="underline text-sm hover:text-gray-700"
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
