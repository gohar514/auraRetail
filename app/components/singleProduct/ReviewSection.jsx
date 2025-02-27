"use client";

import { useState, useEffect } from "react";


import SuccessPopUp from "./SuccessPopUp"; // Import the SuccessPopup
import SubmitReview from "./SubmitReview";
import ReviewCard from "./ReviewCard";



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
  const [popupReview, setPopupReview] = useState(null);

 

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
    <div className="max-w-2xl mx-auto  font-tenorSans ">
      

     <SubmitReview  handleSubmit={handleSubmit}  setFormData={setFormData}  handleRating={handleRating}  formData={formData} error={error} />
    <h2 className="text-xl font-bold mb-4  text-black font-playfair">Reviews</h2>

<ReviewCard handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} reviews={reviews}  setPopupReview={setPopupReview} handleNavigation={handleNavigation} currentIndex={currentIndex} popupReview={popupReview}/>

{/* Optional Success Popup */}
{showPopup && (
  <SuccessPopUp message={popupMessage} onClose={handleClosePopup} />
)}



    </div>
  );
};

export default ReviewSection;


