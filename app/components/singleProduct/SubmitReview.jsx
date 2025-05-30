
// export default SubmitReview
import React, { useCallback, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';

function SubmitReview({ handleSubmit, setFormData, handleRating, formData, error }) {
  const [loading, setLoading] = useState(false);

  const stars = useMemo(() => {
    return [...Array(5)].map((_, index) => (
      <div
        key={index}
        className={`cursor-pointer ${formData.rating > index ? 'text-yellow-400' : 'text-gray-400'}`}
        onClick={() => handleRating(index + 1)}
        aria-label={`Rate ${index + 1} stars`}
      >
        <FaStar
          className="text-3xl"
          style={{
            stroke: 'black',
            strokeWidth: 2,
            fill: formData.rating > index ? 'currentColor' : 'none',
          }}
        />
      </div>
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream text-black py-12 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      {/* Title */}
      <h2 className="text-xl font-bold text-center font-playfair">Share Your Experience</h2>
      <p className="text-gray-700 text-sm text-center mt-2">
        We value your feedback! Please take a moment to review your purchase.
      </p>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6 mt-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Name"
            required
            className="w-full p-2 rounded-lg border bg-[#FFFCF7] border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label className="block mb-2 font-medium">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">{stars}</div>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Write your thoughts here..."
            className="w-full p-2 rounded-lg border bg-[#FFFCF7] border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400 shadow-sm"
            rows={4}
          />
        </div>

        {/* Error */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-darkGreen text-cream py-3 rounded-lg font-semibold hover:bg-green-950 transition duration-200 flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </section>
  );
}

export default SubmitReview;



