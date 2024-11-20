// "use client";

// import { useState, useEffect } from "react";
// import { FaStar } from "react-icons/fa";

// const ReviewSection = ({ productId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     rating: 0,
//     description: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(`/api/reviews/${productId}`)
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((err) => console.error(err));
//   }, [productId]);

//   const handleRating = (ratingValue) => {
//     setFormData({ ...formData, rating: ratingValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.name || !formData.rating) {
//       setError("Name and rating are required.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/reviews/${productId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const newReview = await response.json();
//         setReviews([newReview, ...reviews]);
//         setFormData({ name: "", rating: 0, description: "" });
//       } else {
//         const data = await response.json();
//         setError(data.error || "Error submitting review.");
//       }
//     } catch (err) {
//       console.error("lala",err);
//       setError("Error submitting review.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Reviews</h2>

//       <form onSubmit={handleSubmit} className="mb-6 space-y-4">
//         <div>
//           <label htmlFor="name" className="block font-medium mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//             className="w-full border rounded p-2"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Rating</label>
//           <div className="flex">
//             {[...Array(5)].map((_, index) => (
//               <FaStar
//                 key={index}
//                 className={`cursor-pointer ${
//                   formData.rating > index ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 onClick={() => handleRating(index + 1)}
//               />
//             ))}
//           </div>
//         </div>

//         <div>
//           <label htmlFor="description" className="block font-medium mb-1">
//             Description (Optional)
//           </label>
//           <textarea
//             id="description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="w-full border rounded p-2"
//           />
//         </div>

//         {error && <div className="text-red-500">{error}</div>}

//         <button
//           type="submit"
//           className="bg-black text-white p-2 rounded hover:bg-gray-700"
//         >
//           Submit Review
//         </button>
//       </form>

//       <div className="space-y-4">
//         {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div key={review.id} className="border p-4 rounded">
//               <div className="font-medium">{review.name}</div>
//               <div className="flex">
//                 {[...Array(5)].map((_, index) => (
//                   <FaStar
//                     key={index}
//                     className={`${
//                       review.rating > index ? "text-yellow-400" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p>{review.description || "No description provided."}</p>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet. Be the first to review!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;

"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

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

  return (
    <div className="max-w-2xl mx-auto p-4 font-tenorSans">
      <h2 className="text-xl font-bold mb-4 font-playfair">Write A Review</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Rating</label>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  formData.rating > index ? "text-black" : "text-gray-300"
                }`}
                onClick={() => handleRating(index + 1)}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="bg-black text-white p-2 rounded font-playfair hover:bg-gray-700"
        >
          Submit Review
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4 font-playfair">Reviews</h2>
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
                  {review.name}
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
      </div>
    </div>
  );
};

export default ReviewSection;
