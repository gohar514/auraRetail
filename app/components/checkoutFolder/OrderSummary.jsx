// import React from 'react'
// import {  IoChevronDown, IoChevronUp } from "react-icons/io5";
// import { RxDotFilled } from "react-icons/rx";
// import Image from "next/image";

// const OrderSummary = ({formData, handleChange, toggleOrderSummary, showOrderSummary, cartItems, loading, totalQuantity, totalAmount}) => {
//   return (
//     <>
//        {/* Right Column: Mobile, Shipping & Payment */}
//        <div className="space-y-4  p-4 md:py-6 md:pr-6 md:pl-2">
            
            

//             {/* Shipping Method */}
//             <div className="space-y-2">
//               <div className="font-semibold text-xl font-playfair">Shipping Method</div>
//               <div className="flex justify-between items-center border h-12 border-gray-300 bg-[#f6f6f6] rounded">
//                 <div className="pl-2">Free Shipping</div>
//                 <div className="font-semibold pr-2">FREE</div>
//               </div>
//             </div>

//             {/* Payments */}
//             <div className="space-y-2">
//               <div className="font-semibold text-xl font-playfair">Payments</div>
//               <div className="flex justify-start gap-1 items-center h-12 border border-gray-300 bg-[#f6f6f6] rounded">
//                 <div className="pl-2 flex items-center">
//                   <input
//                     type="radio"
//                     id="cod"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={formData.paymentMethod === "cod"}
//                     onChange={handleChange}
//                     className="accent-black"
//                   />
//                   <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
//                 </div>
//               </div>
//             </div>
//             <div className="font-semibold text-xl  ">
//               <button
//                 type="button"
//                 onClick={toggleOrderSummary}
//                 className="flex justify-between items-center w-full"
//               >
//                 <span className="-mb-4 font-playfair">Order Summary</span>
//                 {showOrderSummary ? <IoChevronUp className="-mb-4" /> : <IoChevronDown className="-mb-4" />}
//               </button>
//             </div>
//             <div
//               className={`transition-all duration-700 ease-in-out overflow-hidden ${
//                 showOrderSummary ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="space-y-2">
//                 {cartItems.length > 0 ? (
//                   cartItems.map((item) => (
//                     <div key={item.id} className="flex justify-between p-2 text-xs items-center">
//                       <div className="flex items-center">
//                         <div className="relative">
//                         <Image
//                             src={item.images[0]}
//                             alt={item.name}
//                             width={200} // Example width in pixels
//                             height={200} // Example height in pixels
//                             className="w-10 h-10  object-cover rounded"
//                           />
//                           <span className="absolute -top-2 -right-2 bg-black bg-opacity-50 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                             {item.quantity}
//                           </span>
//                         </div>
//                         <span className="ml-4">{item.name}</span>
//                       </div>
//                       <div className="text-right">Rs. {item.price}</div>
//                     </div>
//                   ))
//                 ) : (
//                   <div>Your cart is empty.</div>
//                 )}
//               </div>

//               {/* Subtotal and Total */}
              
//             </div>
//             <div className="space-y-2  ">
//             <div className="flex justify-between items-center">
//                 <div className="flex justify-start items-center">
//                         <div className="">Sub total</div>
//                         <div><RxDotFilled /></div>
//                         <div className="text-xs ml-1">{totalQuantity} <span className="ml-0.5 text-xs">items</span></div>
//                         </div>
//                         <div>
//                             {totalAmount.toFixed(2)}
//                         </div>
//                         </div>
                        
//                 <div className="flex justify-between">
//                   <div>Shipping</div>
//                   <div>Free</div>
//                 </div>
//                 <hr className="my-2" />
//                 <div className="flex justify-between font-bold">
//                   <div>Total</div>
//                   <div>Rs. {totalAmount.toFixed(2)}</div>
//                 </div>
//               </div>
//               <button
//               type="submit"
//               className="p-3 bg-black flex justify-center items-center text-white rounded hover:bg-gray-600 mt-4 w-full font-playfair"
//             >
//             {loading?<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>:"Complete Order"
// }  
//             </button>
//           </div>
//     </>
//   )
// }

// export default OrderSummary

import React from 'react';
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import Image from "next/image";

// Shipping Method Component
const ShippingMethod = () => (
  <div className="space-y-2">
    <div className="font-semibold text-xl font-playfair">Shipping Method</div>
    <div className="flex justify-between items-center border h-12 border-gray-300 bg-[#f6f6f6] rounded">
      <div className="pl-2">Free Shipping</div>
      <div className="font-semibold pr-2">FREE</div>
    </div>
  </div>
);

// Payment Method Component
const PaymentMethod = ({ formData, handleChange }) => (
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
);

// Cart Items Component
const CartItems = ({ cartItems }) => (
  <div className="space-y-2">
    {cartItems.length > 0 ? (
      cartItems.map((item) => (
        <div key={item.id} className="flex justify-between p-2 text-xs items-center">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src={item.images[0]}
                alt={item.name}
                width={200}
                height={200}
                className="w-10 h-10 object-cover rounded"
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
);

// Order Summary Component
const OrderSummary = ({ formData, handleChange, toggleOrderSummary, showOrderSummary, cartItems, loading, totalQuantity, totalAmount }) => {
  return (
    <div className="space-y-4 p-4 md:py-6 md:pr-6 md:pl-2">
      {/* Shipping and Payment */}
      <ShippingMethod />
      <PaymentMethod formData={formData} handleChange={handleChange} />

      {/* Toggle Order Summary */}
      <div className="font-semibold text-xl">
        <button type="button" onClick={toggleOrderSummary} className="flex justify-between items-center w-full">
          <span className="-mb-4 font-playfair">Order Summary</span>
          {showOrderSummary ? <IoChevronUp className="-mb-4" /> : <IoChevronDown className="-mb-4" />}
        </button>
      </div>

      {/* Order Summary Details */}
      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showOrderSummary ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <CartItems cartItems={cartItems} />

        {/* Subtotal and Total */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <div>Sub total</div>
              <div><RxDotFilled /></div>
              <div className="text-xs ml-1">{totalQuantity} <span className="ml-0.5 text-xs">items</span></div>
            </div>
            <div>Rs. {totalAmount.toFixed(2)}</div>
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
      </div>

      {/* Complete Order Button */}
      <button
        type="submit"
        className="p-3 bg-black flex justify-center items-center text-white rounded hover:bg-gray-600 mt-4 w-full font-playfair"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
        ) : "Complete Order"}
      </button>
    </div>
  );
}

export default OrderSummary;
