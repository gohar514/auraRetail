import React, { useMemo } from 'react';
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const ReviewCard = ({
  handleTouchStart,
  handleTouchEnd,
  reviews = [], // Default to empty array if reviews is not provided
  setPopupReview,
  handleNavigation,
  currentIndex,
  popupReview
}) => {
  // Memoize the navigation buttons to avoid unnecessary re-renders
  const prevDisabled = useMemo(() => currentIndex === 0, [currentIndex]);
  const nextDisabled = useMemo(() => currentIndex === reviews.length - 1, [currentIndex]);

  return (
    <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Be the First to Review this product</p>
      ) : (
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 py-6 px-4 sm:px-6 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform duration-300"
              >
                {/* Review Header */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  {/* Avatar */}
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-gray-800 text-white flex justify-center items-center text-xl font-semibold">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Name & Date */}
                  <div className="flex flex-col justify-center text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {review.name.charAt(0).toUpperCase() + review.name.slice(1)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center mb-4 space-x-2">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`${
                        review.rating > idx ? "text-gray-800 transform scale-125" : "text-gray-300"
                      } transition-all duration-300`}
                      size={24}
                    />
                  ))}
                </div>

                {/* Review Description */}
                <p className="text-gray-800 text-center leading-relaxed tracking-wide">
                  {review.description.length > 10 ? (
                    <>
                      {review.description.substring(0, 10)}...
                      <button
                        onClick={() => setPopupReview(review)}
                        className="underline"
                      >
                        See More
                      </button>
                    </>
                  ) : (
                    review.description
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={() => handleNavigation("prev")}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-transparent transition duration-300 ${prevDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={prevDisabled}
              >
                <FaArrowLeftLong size={20} />
              </button>
              <button
                onClick={() => handleNavigation("next")}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 transition duration-300 ${nextDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={nextDisabled}
              >
                <FaArrowRightLong size={20} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Popup Modal */}
      {popupReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 sm:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setPopupReview(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>

            {/* Popup Review Content */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-gray-800 text-white flex justify-center items-center text-xl font-semibold">
                  {popupReview.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {popupReview.name.charAt(0).toUpperCase() + popupReview.name.slice(1)}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(popupReview.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-center mb-4 space-x-2">
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={`${
                      popupReview.rating > idx
                        ? "text-gray-800 transform scale-125"
                        : "text-gray-300"
                    } transition-all duration-300`}
                    size={24}
                  />
                ))}
              </div>
              <p className="text-gray-800 text-center leading-relaxed tracking-wide">
                {popupReview.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
