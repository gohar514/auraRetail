// "use client";

// import Image from "next/image"; 
// import Link from "next/link";
// import { useState } from "react";
// import { ProductsData } from "./ProductsData";
// import { motion } from "framer-motion"; // Import motion for transition

// const BestSellers = ({ relatedProducts }) => {
//   const productsToShow = relatedProducts && relatedProducts.length > 0
//     ? relatedProducts
//     : ProductsData.slice(0, 4); // Show best sellers if no related products provided
  
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [currentImages, setCurrentImages] = useState(Array(productsToShow.length).fill(0)); // Default to the first image for each product
//   const [directions, setDirections] = useState(Array(productsToShow.length).fill(0)); // Manage directions per product

//   // Handle swipe gestures
//   const handleTouchStart = (e) => {
//     const touchStart = e.touches[0].clientX;
//     setTouchStart(touchStart);
//   };

//   const handleTouchEnd = (e, index) => {
//     const touchEnd = e.changedTouches[0].clientX;
//     setTouchEnd(touchEnd);

//     if (touchStart - touchEnd > 50) {
//       // Swipe left (next image)
//       handleNextImage(index);
//     }
//     if (touchEnd - touchStart > 50) {
//       // Swipe right (previous image)
//       handlePrevImage(index);
//     }
//   };

//   const handleNextImage = (index) => {
//     setDirections((prev) => {
//       const updatedDirections = [...prev];
//       updatedDirections[index] = 1; // Set direction to 1 (left)
//       return updatedDirections;
//     });
//     setCurrentImages((prevIndex) => {
//       const updatedIndex = [...prevIndex];
//       updatedIndex[index] = (updatedIndex[index] + 1) % productsToShow[index].images.length;
//       return updatedIndex;
//     });
//   };

//   const handlePrevImage = (index) => {
//     setDirections((prev) => {
//       const updatedDirections = [...prev];
//       updatedDirections[index] = -1; // Set direction to -1 (right)
//       return updatedDirections;
//     });
//     setCurrentImages((prevIndex) => {
//       const updatedIndex = [...prevIndex];
//       updatedIndex[index] = 
//         updatedIndex[index] === 0 ? productsToShow[index].images.length - 1 : updatedIndex[index] - 1;
//       return updatedIndex;
//     });
//   };

//   return (
//     <section className="py-8 bg-gray-50 font-tenorSans">
//       <div className="container mx-auto px-6">
//         <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-900 font-playfair">
//           {relatedProducts && relatedProducts.length > 0 ? "Related Products" : "Best Sellers"}
//         </h2>

//         <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {productsToShow.map((product, index) => (
//             <div
//               key={product.id}
//               className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
//             >
//               <Link href={product.link}>
//                 <div 
//                   className="relative w-full aspect-w-4 aspect-h-5"
//                   onTouchStart={handleTouchStart}
//                   onTouchEnd={(e) => handleTouchEnd(e, index)}
//                 >
//                   <motion.div
//                     key={currentImages[index]}
//                     initial={{ x: directions[index] === 1 ? "100%" : "-100%", opacity: 0 }}
//                     animate={{ x: "0%", opacity: 1 }}
//                     exit={{ x: directions[index] === 1 ? "-100%" : "100%", opacity: 0 }}
//                     transition={{ duration: 0.5, ease: "easeInOut" }}
//                     className="w-full h-full"
//                   >
//                     <Image
//                       src={product.images[currentImages[index]]} // Dynamic image index
//                       alt={product.name}
//                       layout="responsive"
//                       width={450}
//                       height={562}
//                       objectFit="cover"
//                       className="group-hover:scale-105 transition-transform duration-300"
//                       quality={75}
//                       priority
//                     />
//                   </motion.div>
                  
//                   {product.discount > 0 && (
//                     <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold">
//                       {product.discount}% 
//                     </div>
//                   )}
//                 </div>
//               </Link>

//               <div className="p-4 text-center">
//                 <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
//                   {product.name}
//                 </h3>
//                 <div className="flex items-center justify-center gap-2 mt-2">
//                   <div className="text-base text-red-600">
//                     <span className="mr-1">Rs.</span>{product.discount > 0 ? ((product.price * (1 - product.discount / 100)).toFixed(2)) : product.price.toFixed(2)}
//                   </div>
//                   {product.discount > 0 && (
//                     <div className="text-base text-gray-500 line-through">
//                       Rs.{product.price.toFixed(2)}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-12">
//           <Link href="/products">
//             <p className="inline-block py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 font-playfair">
//               View All 
//             </p>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSellers;

"use client";
import React, { useState } from "react";
import { ProductsData } from "../homePage/ProductsData";
import Link from "next/link";
import { motion } from "framer-motion";

const AllProducts = () => {
  const [sortOption, setSortOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState([...ProductsData]);
  const [currentImages, setCurrentImages] = useState(Array(ProductsData.length).fill(0));
  const [direction, setDirection] = useState(0); // Direction for swipe animations
  const [touchStart, setTouchStart] = useState(0);

  // Handle sorting options and update the product list accordingly
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    // Sort logic based on selected option
    const sortBy = {
      "Price, low to high": (a, b) => a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100),
      "Price, high to low": (a, b) => b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100),
      "Date, old to new": (a, b) => new Date(a.date) - new Date(b.date),
      "Date, new to old": (a, b) => new Date(b.date) - new Date(a.date),
      default: () => 0
    };

    // Sort products and update state
    setSortedProducts([...ProductsData].sort(sortBy[selectedOption] || sortBy.default));
  };

  // Handle touch start to detect swipe direction
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

  // Handle touch end, check swipe distance and update image index accordingly
  const handleTouchEnd = (e, index) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (Math.abs(touchStart - touchEnd) > 50) {
      const swipeDirection = touchStart - touchEnd > 0 ? 1 : -1;
      setDirection(swipeDirection);
      setCurrentImages((prev) =>
        prev.map((image, idx) => idx === index 
          ? (image + swipeDirection + sortedProducts[index].images.length) % sortedProducts[index].images.length
          : image
        )
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-tenorSans">
      {/* Sort Dropdown */}
      <div className="flex justify-end items-center mb-8">
        <select
          className="text-sm py-2 px-2 bg-white rounded-md shadow-sm"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort</option>
          <option value="Price, low to high">Price, low to high</option>
          <option value="Price, high to low">Price, high to low</option>
          <option value="Date, old to new">Date, old to new</option>
          <option value="Date, new to old">Date, new to old</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, index) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Image Section */}
              <div
                className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
              >
                <motion.img
                  key={currentImages[index]}
                  src={product.images[currentImages[index]]}
                  alt={product.name}
                  initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold">
                    {product.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xs sm:text-base font-semibold mb-2">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-red-600">
                    Rs.{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      Rs.{product.price.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
