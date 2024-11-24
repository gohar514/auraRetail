

"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import SuccessPopUp from "./SuccessPopUp"; // Import the SuccessPopup
import { motion } from "framer-motion";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    description: "",
  });
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Track current review index
  const [startX, setStartX] = useState(null); // Track swipe start position
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for the popup message

  // Fetch reviews on component mount
  useEffect(() => {
    fetch(`/api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, [productId]);

  const handleRating = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.rating) {
      setError("Name and rating are required.");
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setFormData({ name: "", rating: 0, description: "" });
        setCurrentIndex(0); // Reset to the first review

        // Show success popup
        setPopupMessage("You have successfully added a review. Thank you!");
        setShowPopup(true);
      } else {
        const data = await response.json();
        setError(data.error || "Error submitting review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error submitting review.");
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // Record the starting touch position
  };

  const handleTouchEnd = (e) => {
    if (startX === null) return; // Ignore if no start point is recorded
    const swipeDistance = startX - e.changedTouches[0].clientX;

    if (swipeDistance > 50 && currentIndex < reviews.length - 1) {
      // Swipe left
      setCurrentIndex((prev) => prev + 1);
    } else if (swipeDistance < -50 && currentIndex > 0) {
      // Swipe right
      setCurrentIndex((prev) => prev - 1);
    }
    setStartX(null); // Reset swipe start position
  };

  const handleNavigation = (direction) => {
    if (direction === "next" && currentIndex < reviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup when the button is clicked
  };

  return (
    <div className="max-w-2xl mx-auto  font-tenorSans">
      

      <section className="relative bg-gradient-to-b from-gray-100 to-gray-200 text-black py-12 px-4 sm:px-8 lg:px-12 rounded-lg shadow-xl max-w-4xl mx-auto my-8 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-full h-96 w-96 absolute -top-20 -left-20 blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.2, scale: 1.1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-full h-72 w-72 absolute bottom-0 -right-16 blur-2xl"
        />
      </div>

      {/* Form Title */}
      <h2 className="text-xl font-bold  text-center font-playfair">
        Share Your Experience
      </h2>
      <p className="text-gray-700 text-sm text-center mt-2">
        We value your feedback! Please take a moment to review your purchase.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 mt-6 relative z-10 max-w-full"
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block   mb-2">
            <span className="flex items-center gap-1">
               Name<span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name"
            className="w-full p-2 rounded-lg border border-gray-600  focus:outline-none  shadow-sm"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label className="block   mb-2">
            <span className="flex items-center gap-1">
               Rating<span className="text-red-500">*</span>
            </span>
          </label>
          <div className="flex space-x-2">
  {[...Array(5)].map((_, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer ${
        formData.rating > index ? "text-yellow-400" : "text-gray-500"
      }`}
      onClick={() => handleRating(index + 1)}
    >
      <FaStar
        className={`text-3xl ${
          formData.rating > index ? "text-yellow-400" : "text-transparent"
        }`}
        style={{
          stroke: "black",
          strokeWidth: 2,
          fill: formData.rating > index ? "currentColor" : "none",
        }}
      />
    </motion.div>
  ))}
</div>
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block  mb-2"
          >
            <span className="flex items-center gap-2">
               Description 
            </span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Write your thoughts here..."
            className="w-full p-2 rounded-lg border border-gray-600   focus:outline-none  shadow-sm"
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none  font-playfair "
        >
          Submit Review
        </motion.button>
      </form>
    </section>
      <h2 className="text-xl font-bold mb-4 font-playfair">Reviews</h2>
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">Be the First to Review this product</p>
        ) : (
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 py-4 px-8 border rounded flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="text-base font-bold font-playfair">
                    {review.name.charAt(0).toUpperCase() + review.name.slice(1)}
                  </div>
                  <div>{new Date(review.createdAt).toLocaleDateString()}</div>
                </div>

                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`${
                        review.rating > idx ? "text-gray-800" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p>{review.description || "No description provided."}</p>
              </div>
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <>
            <button
              onClick={() => handleNavigation("prev")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentIndex === 0}
            >
              <FaArrowLeftLong />
            </button>
            <button
              onClick={() => handleNavigation("next")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 ${
                currentIndex === reviews.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentIndex === reviews.length - 1}
            >
              <FaArrowRightLong />
            </button>
          </>
        )}
      </div>

      {showPopup && (
        <SuccessPopUp message={popupMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ReviewSection;

