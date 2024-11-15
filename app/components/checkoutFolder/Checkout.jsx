

"use client"; // Mark it as a Client Component

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoHome, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import { clearCart } from "@/app/store/cartSlice";
import { useDispatch } from "react-redux";
import { MdEmail } from "react-icons/md";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems || [];
  const totalAmount = cart?.totalAmount || 0;
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    console.log("Cart from Redux: ", cart);
    console.log("Cart Items: ", cartItems);
  }, [cart]);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    secondName: "",
    country: "Pakistan",
    province: "",
    city: "",
    area: "",
    address: "",
    apartment: "",
    mobile: "",
    secondNumber: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  console.log(cartItems)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform cartItems to match the expected structure
    const transformedCartItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price),
    }));

    // Validate cartItems structure
    const isValid = transformedCartItems.every(item =>
      item.name && typeof item.name === 'string' &&
      item.quantity && Number.isInteger(item.quantity) &&
      item.price && typeof item.price === 'number'
    );

    if (!isValid) {
      console.error("Invalid cartItems structure:", transformedCartItems);
      return;  // Stop submission if validation fails
    }

    console.log('Submitting data:', { ...formData, cartItems: transformedCartItems, totalAmount, totalQuantity });

    try {
      setLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cartItems: transformedCartItems,
          totalAmount,
          totalQuantity,
        }),
      });

      if (response.ok) {
        // Redirect to thank you page upon successful order creation
        setLoading(false)
        router.push('/thank-you');
        // Clear the cart
        dispatch(clearCart());
      } else {
        setLoading(false)
        const data = await response.json();
        console.error("Error submitting order: ", data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  

  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <div className="py-4 px-4 lg:px-16 font-tenorSans">
      <div className="max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Left Column: Contact and Delivery */}
          <div className="space-y-4 p-4 md:py-6 md:pr-2 md:pl-6">
            
            <div className="space-y-2">
            <div className="flex justify-start items-center gap-2" >
              <label htmlFor="email" className="block text-xl font-playfair font-semibold">
                Contact
              </label>
              <MdEmail className="text-xl"/>
            </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Email"
              />
            </div>
            

            {/* Delivery Information */}
            <div className="space-y-2">
              <div className="flex justify-start items-center gap-2">
                <div className="font-semibold text-xl font-playfair">Delivery</div>
                <IoHome className="text-xl" />
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  id="secondName"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Second Name"
                />
                <select
                  id="province"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select Province</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">KPK</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                </select>

                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded bg-white"
                >
                  <option value="">Select City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                </select>

                <input
                  type="text"
                  id="area"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Area"
                />
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Complete Address"
                />
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Apartment (Optional)"
                />
              </div>
              <div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                pattern="03[0-9]{9}"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Mobile (03xxxxxxxxx)"
              />
            </div>
            <input
              type="tel"
              id="secondNumber"
              name="secondNumber"
              value={formData.secondNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Second Number (Optional)"
            />
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Postal Code (Optional)"
            />
            
            </div>
          </div>
          

          {/* Right Column: Mobile, Shipping & Payment */}
          <div className="space-y-4  p-4 md:py-6 md:pr-6 md:pl-2">
            
            

            {/* Shipping Method */}
            <div className="space-y-2">
              <div className="font-semibold text-xl font-playfair">Shipping Method</div>
              <div className="flex justify-between items-center border h-12 border-gray-300 bg-[#f6f6f6] rounded">
                <div className="pl-2">Free Shipping</div>
                <div className="font-semibold pr-2">FREE</div>
              </div>
            </div>

            {/* Payments */}
            <div className="space-y-2">
              <div className="font-semibold text-xl font-playfair">Payments</div>
              <div className="flex justify-start gap-1 items-center h-12 border border-gray-300 bg-[#f6f6f6] rounded">
                <div className="pl-2 flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
                </div>
              </div>
            </div>
            <div className="font-semibold text-xl  ">
              <button
                type="button"
                onClick={toggleOrderSummary}
                className="flex justify-between items-center w-full"
              >
                <span className="-mb-4 font-playfair">Order Summary</span>
                {showOrderSummary ? <IoChevronUp className="-mb-4" /> : <IoChevronDown className="-mb-4" />}
              </button>
            </div>
            <div
              className={`transition-all duration-700 ease-in-out overflow-hidden ${
                showOrderSummary ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-2">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between p-2 text-xs items-center">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-10 h-10  object-cover rounded"
                          />
                          <span className="absolute -top-2 -right-2 bg-black bg-opacity-50 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <span className="ml-4">{item.name}</span>
                      </div>
                      <div className="text-right">Rs. {item.price}</div>
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty.</div>
                )}
              </div>

              {/* Subtotal and Total */}
              
            </div>
            <div className="space-y-2  ">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center">
                        <div className="">Sub total</div>
                        <div><RxDotFilled /></div>
                        <div className="text-xs ml-1">{totalQuantity} <span className="ml-0.5 text-xs">items</span></div>
                        </div>
                        <div>
                            {totalAmount.toFixed(2)}
                        </div>
                        </div>
                        
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <div>Rs. {totalAmount.toFixed(2)}</div>
                </div>
              </div>
              <button
              type="submit"
              className="p-3 bg-black flex justify-center items-center text-white rounded hover:bg-gray-600 mt-4 w-full font-playfair"
            >
            {loading?<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>:"Complete Order"
}  
            </button>
          </div>

          {/* Order Summary */}
          

          {/* Place Order Button */}
          
        </form>
      </div>
    </div>
  );
};

export default Checkout;
