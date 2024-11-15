"use client"
import React, { useState } from 'react';
import { ProductsData } from '../homePage/ProductsData';
import Link from 'next/link';

const AllProducts = () => {
  // State to track sorting option
  const [sortOption, setSortOption] = useState('');
  // State for sorted products
  const [sortedProducts, setSortedProducts] = useState([...ProductsData]);

  // Sorting logic
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedArray = [...ProductsData];

    switch (selectedOption) {
      case 'Price, low to high':
        sortedArray.sort((a, b) => 
          (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100))
        );
        break;
      case 'Price, high to low':
        sortedArray.sort((a, b) => 
          (b.price * (1 - b.discount / 100)) - (a.price * (1 - a.discount / 100))
        );
        break;
      case 'Date, old to new':
        sortedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'Date, new to old':
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        sortedArray = [...ProductsData];
    }

    setSortedProducts(sortedArray);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-tenorSans">
      <div className="flex justify-end items-center mb-8">
        {/* Sorting dropdown */}
        <div className="relative inline-block text-left">
          <select
            className="block text-sm w-full py-2 px-2 bg-white rounded-md shadow-sm"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Sort</option>
            <option value="As Featured">As Featured</option>
            <option value="Price, low to high">Price, low to high</option>
            <option value="Price, high to low">Price, high to low</option>
            <option value="Date, old to new">Date, old to new</option>
            <option value="Date, new to old">Date, new to old</option>
          </select>
        </div>
      </div>

      {/* Grid layout for products */}
      <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {sortedProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <img
                  src={product.images[0]}  // Updated to display the first image in the array
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Discount Badge (top-right corner) */}
                {product.discount > 0 && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold">
                    {product.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xs sm:text-base font-semibold mb-2">{product.name}</h2>
                {/* Price */}
                <div className="flex items-center gap-2">
                  <div className="text-sm text-red-600">
                    Rs.{product.discount > 0 ? ((product.price * (1 - product.discount / 100)).toFixed(2)) : product.price.toFixed(2)}
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
}

export default AllProducts;
