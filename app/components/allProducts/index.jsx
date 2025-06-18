"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { ProductsData } from "../homePage/ProductsData";
import { AllProductsPageView } from "@/app/lib/metaPixel";

// ✅ Reusable SlideWithFallback component
const SlideWithFallback = ({ image, product, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Fallback Image */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/assets/static_image_aura_with_text.png"
          alt={`${product.name} fallback`}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Actual Product Image */}
      <Image
        src={image}
        alt={product.name}
        fill
        className="object-cover rounded-lg z-10 transition-opacity duration-300"
        quality={60}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        loading={index === 0 ? "eager" : "lazy"}
        priority={index === 0}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const AllProducts = ({ relatedProducts }) => {
  const pathname = usePathname();

  useEffect(() => {
    AllProductsPageView();
  }, [pathname]);

  const productsToShow = useMemo(
    () => (relatedProducts?.length > 0 ? relatedProducts : ProductsData),
    [relatedProducts]
  );

  const [sortOption, setSortOption] = useState("");

  const sortedProducts = useMemo(() => {
    const sortBy = {
      "Price, low to high": (a, b) =>
        a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100),
      "Price, high to low": (a, b) =>
        b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100),
      "Date, old to new": (a, b) => new Date(a.date) - new Date(b.date),
      "Date, new to old": (a, b) => new Date(b.date) - new Date(a.date),
      default: () => 0,
    };

    return [...productsToShow].sort(sortBy[sortOption] || sortBy.default);
  }, [sortOption, productsToShow]);

  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-tenorSans bg-cream">
      {/* Sort dropdown */}
      <div className="flex justify-end items-center mb-8">
        <select
          className="text-sm py-2 px-2 bg-cream rounded-md shadow-sm outline-darkGreen border border-darkGreen"
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
      <div className="grid gap-2 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, index) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-[#FFFCF7] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Image Slider */}
              <div className="relative w-full aspect-[1/1]">
                <Swiper
                  spaceBetween={5}
                  slidesPerView={1}
                  loop={product.images.length > 1}
                  className="absolute inset-0 w-full h-full"
                >
                  {product.images.map((image, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <SlideWithFallback
                        image={image}
                        product={product}
                        index={imgIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold z-10">
                    {product.discount}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <h2 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 line-clamp-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-red-600">
                    Rs.{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-xs text-gray-500 line-through">
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

export default React.memo(AllProducts);
