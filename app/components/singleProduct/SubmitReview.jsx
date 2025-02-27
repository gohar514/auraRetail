// import React from 'react'
// import { motion } from "framer-motion";
// import { FaStar } from "react-icons/fa";

// function SubmitReview({handleSubmit,setFormData,  handleRating,  formData , error}) {
//   return (
//     <section className="relative bg-gradient-to-b from-gray-100 to-gray-200 text-black py-12 px-4 sm:px-8 lg:px-12 rounded-lg shadow-xl max-w-4xl mx-auto my-8 overflow-hidden">
//     {/* Decorative Background Elements */}
//     <div className="absolute inset-0 pointer-events-none overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 0.15, scale: 1 }}
//         transition={{ duration: 2, ease: "easeInOut" }}
//         className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-full h-96 w-96 absolute -top-20 -left-20 blur-2xl"
//       />
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 0.2, scale: 1.1 }}
//         transition={{ duration: 2.5, ease: "easeInOut" }}
//         className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-full h-72 w-72 absolute bottom-0 -right-16 blur-2xl"
//       />
//     </div>

//     {/* Form Title */}
//     <h2 className="text-xl font-bold  text-center font-playfair">
//       Share Your Experience
//     </h2>
//     <p className="text-gray-700 text-sm text-center mt-2">
//       We value your feedback! Please take a moment to review your purchase.
//     </p>

//     {/* Form */}
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 mt-6 relative z-10 max-w-full"
//     >
//       {/* Name Field */}
//       <div>
//         <label htmlFor="name" className="block   mb-2">
//           <span className="flex items-center gap-1">
//              Name<span className="text-red-500">*</span>
//           </span>
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//           placeholder="Name"
//           className="w-full p-2 rounded-lg border border-gray-600  focus:outline-none  shadow-sm"
//         />
//       </div>

//       {/* Rating Field */}
//       <div>
//         <label className="block   mb-2">
//           <span className="flex items-center gap-1">
//              Rating<span className="text-red-500">*</span>
//           </span>
//         </label>
//         <div className="flex space-x-2">
// {[...Array(5)].map((_, index) => (
//   <motion.div
//     key={index}
//     whileHover={{ scale: 1.1 }}
//     className={`cursor-pointer ${
//       formData.rating > index ? "text-yellow-400" : "text-gray-500"
//     }`}
//     onClick={() => handleRating(index + 1)}
//   >
//     <FaStar
//       className={`text-3xl ${
//         formData.rating > index ? "text-yellow-400" : "text-transparent"
//       }`}
//       style={{
//         stroke: "black",
//         strokeWidth: 2,
//         fill: formData.rating > index ? "currentColor" : "none",
//       }}
//     />
//   </motion.div>
// ))}
// </div>
//       </div>

//       {/* Description Field */}
//       <div>
//         <label
//           htmlFor="description"
//           className="block  mb-2"
//         >
//           <span className="flex items-center gap-2">
//              Description 
//           </span>
//         </label>
//         <textarea
//           id="description"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           placeholder="Write your thoughts here..."
//           className="w-full p-2 rounded-lg border border-gray-600   focus:outline-none  shadow-sm"
//         />
//       </div>

//       {/* Error Message */}
//       {error && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-red-500 text-sm"
//         >
//           {error}
//         </motion.div>
//       )}

//       {/* Submit Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         type="submit"
//         className="w-full bg-black text-white py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none  font-playfair "
//       >
//         Submit Review
//       </motion.button>
//     </form>
//   </section>
//   )
// }

// export default SubmitReview

import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

function SubmitReview({ handleSubmit, setFormData, handleRating, formData, error }) {
  // Memoize the star rendering logic to prevent recalculating on each render
  const stars = useMemo(() => {
    return [...Array(5)].map((_, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.1 }}
        className={`cursor-pointer ${formData.rating > index ? 'text-yellow-400' : 'text-gray-500'}`}
        onClick={() => handleRating(index + 1)}
        aria-label={`Rate ${index + 1} stars`}
      >
        <FaStar
          className={`text-3xl ${formData.rating > index ? 'text-yellow-400' : 'text-transparent'}`}
          style={{
            stroke: 'black',
            strokeWidth: 2,
            fill: formData.rating > index ? 'currentColor' : 'none',
          }}
        />
      </motion.div>
    ));
  }, [formData.rating, handleRating]);

  const handleNameChange = useCallback(
    (e) => setFormData({ ...formData, name: e.target.value }),
    [formData, setFormData]
  );

  const handleDescriptionChange = useCallback(
    (e) => setFormData({ ...formData, description: e.target.value }),
    [formData, setFormData]
  );

  return (
    <section className="relative bg-gradient-to-b from-[#FCF7F1] to-[#FFFCF7] text-black py-12 px-4 sm:px-8 lg:px-12 rounded-lg shadow-xl max-w-4xl mx-auto my-8 overflow-hidden">
  {/* Decorative Background Elements */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
  {/* First Decorative Element */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.1, scale: 1 }}
    transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
    className="bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-full h-[30rem] w-[30rem] absolute -top-32 -left-32 blur-3xl backdrop-filter backdrop-blur-lg"
  />
  
  {/* Second Decorative Element */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.15, scale: 1.1 }}
    transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.75 }}
    className="bg-gradient-to-r from-amber-800/15 via-amber-900/10 to-amber-800/15 rounded-full h-[25rem] w-[25rem] absolute -bottom-40 -right-40 blur-3xl backdrop-filter backdrop-blur-lg"
  />

  {/* Subtle Particle Effect (Optional) */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 4, ease: 'easeInOut', delay: 1 }}
    className="absolute inset-0 bg-[url('/path/to/particle-texture.png')] bg-cover mix-blend-overlay"
  />
</div>

  {/* Form Title */}
  <h2 className="text-xl font-bold text-center font-playfair">
    Share Your Experience
  </h2>
  <p className="text-gray-700 text-sm text-center mt-2">
    We value your feedback! Please take a moment to review your purchase.
  </p>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-6 mt-6 relative z-10 max-w-full">
    {/* Name Field */}
    <div>
      <label htmlFor="name" className="block mb-2">
        <span className="flex items-center gap-1">
          Name <span className="text-red-500">*</span>
        </span>
      </label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleNameChange}
        placeholder="Name"
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent placeholder-gray-400 shadow-sm"
      />
    </div>

    {/* Rating Field */}
    <div>
      <label className="block mb-2">
        <span className="flex items-center gap-1">
          Rating <span className="text-red-500">*</span>
        </span>
      </label>
      <div className="flex space-x-2">{stars}</div>
    </div>

    {/* Description Field */}
    <div>
      <label htmlFor="description" className="block mb-2">
        <span className="flex items-center gap-2">Description</span>
      </label>
      <textarea
        id="description"
        value={formData.description}
        onChange={handleDescriptionChange}
        placeholder="Write your thoughts here..."
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent placeholder-gray-400 shadow-sm"
      />
    </div>

    {/* Error Message */}
    {error && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">
        {error}
      </motion.div>
    )}

    {/* Submit Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      className="w-full bg-darkGreen text-cream py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none font-playfair"
    >
      Submit Review
    </motion.button>
  </form>
</section>
  );
}

export default SubmitReview;

