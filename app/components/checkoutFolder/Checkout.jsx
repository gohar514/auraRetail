

// "use client"; // Mark it as a Client Component

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from 'next/navigation';
// import { clearCart } from "@/app/store/cartSlice";
// import { useDispatch } from "react-redux";


// import Inputs from "./Inputs"
// import OrderSummary from "./OrderSummary";

// const Checkout = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const cartItems = cart?.cartItems || [];
//   const totalAmount = cart?.totalAmount || 0;
//   const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
//   const [loading,setLoading]=useState(false)

//   useEffect(() => {
//     console.log("Cart from Redux: ", cart);
//     console.log("Cart Items: ", cartItems);
//   }, [cart]);

//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     secondName: "",
//     country: "Pakistan",
//     province: "",
//     city: "",
//     area: "",
//     address: "",
//     apartment: "",
//     mobile: "",
//     secondNumber: "",
//     postalCode: "",
//     paymentMethod: "cod",
//   });

//   const [showOrderSummary, setShowOrderSummary] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };


//   console.log(cartItems)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Transform cartItems to match the expected structure
//     const transformedCartItems = cartItems.map(item => ({
//       name: item.name,
//       quantity: item.quantity,
//       price: parseFloat(item.price),
//     }));

//     // Validate cartItems structure
//     const isValid = transformedCartItems.every(item =>
//       item.name && typeof item.name === 'string' &&
//       item.quantity && Number.isInteger(item.quantity) &&
//       item.price && typeof item.price === 'number'
//     );

//     if (!isValid) {
//       console.error("Invalid cartItems structure:", transformedCartItems);
//       return;  // Stop submission if validation fails
//     }

//     console.log('Submitting data:', { ...formData, cartItems: transformedCartItems, totalAmount, totalQuantity });

//     try {
//       setLoading(true)
//       const response = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           cartItems: transformedCartItems,
//           totalAmount,
//           totalQuantity,
//         }),
//       });

//       if (response.ok) {
//         // Redirect to thank you page upon successful order creation
//         setLoading(false)
//         router.push('/thank-you');
//         // Clear the cart
//         dispatch(clearCart());
//       } else {
//         setLoading(false)
//         const data = await response.json();
//         console.error("Error submitting order: ", data);
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };
  

//   const toggleOrderSummary = () => {
//     setShowOrderSummary(!showOrderSummary);
//   };

//   return (
//     <div className="py-4 px-4 lg:px-16 font-tenorSans">
//       <div className="max-w-4xl mx-auto">
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
//           {/* Left Column: Contact and Delivery */}
//          <Inputs formData={formData}  handleChange={handleChange}/>
          

//        <OrderSummary formData={formData} handleChange={handleChange} toggleOrderSummary={toggleOrderSummary} showOrderSummary={showOrderSummary} cartItems={cartItems} loading={loading} totalQuantity={totalQuantity} totalAmount={totalAmount}/>

//           {/* Order Summary */}
          

//           {/* Place Order Button */}
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

"use client"; // Mark it as a Client Component

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart } from "@/app/store/cartSlice";
import Inputs from "./Inputs";
import OrderSummary from "./OrderSummary";

// Memoize components for minimal re-renders
const MemoizedInputs = React.memo(Inputs);
const MemoizedOrderSummary = React.memo(OrderSummary);

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useMemo(() => cart?.cartItems || [], [cart]);
  const totalAmount = useMemo(() => cart?.totalAmount || 0, [cart]);
  const totalQuantity = useMemo(() => cart?.totalQuantity, [cart]);

  const [loading, setLoading] = useState(false);
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

  // Update form data efficiently
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    // Optionally log changes for debugging or optimization purposes
    console.log("Cart or form data changed", { cart, formData });
  }, [cart, formData]);

  const validateCartItems = (cartItems) => {
    return cartItems.every(
      (item) =>
        item.name &&
        typeof item.name === "string" &&
        item.quantity &&
        Number.isInteger(item.quantity) &&
        item.price &&
        typeof item.price === "number"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform cartItems to match the expected structure
    const transformedCartItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price),
    }));

    if (!validateCartItems(transformedCartItems)) {
      console.error("Invalid cartItems structure:", transformedCartItems);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cartItems: transformedCartItems,
          totalAmount,
          totalQuantity,
        }),
      });

      if (response.ok) {
        // Redirect to thank you page and clear the cart
        dispatch(clearCart());
        router.push("/thank-you");
      } else {
        const data = await response.json();
        console.error("Error submitting order:", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoading(false);
    }
  };

  const toggleOrderSummary = useCallback(() => {
    setShowOrderSummary((prev) => !prev);
  }, []);

  return (
    <div className="py-4 px-4 lg:px-16 font-tenorSans">
      <div className="max-w-4xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Left Column: Contact and Delivery */}
          <MemoizedInputs formData={formData} handleChange={handleChange} />

          {/* Right Column: Order Summary */}
          <MemoizedOrderSummary
            formData={formData}
            handleChange={handleChange}
            toggleOrderSummary={toggleOrderSummary}
            showOrderSummary={showOrderSummary}
            cartItems={cartItems}
            loading={loading}
            totalQuantity={totalQuantity}
            totalAmount={totalAmount}
          />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
