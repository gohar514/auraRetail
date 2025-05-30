"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ProductsData } from "../homePage/ProductsData";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { AllProductsPageView } from "@/app/lib/metaPixel";
import { usePathname } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

// Register Swiper modules
SwiperCore.use([Autoplay]);

const AllProducts = ({ relatedProducts }) => {
  const productsToShow = useMemo(
    () => (relatedProducts?.length > 0 ? relatedProducts : ProductsData),
    [relatedProducts]
  );

  const [sortOption, setSortOption] = useState("");
  const pathname = usePathname();
  const swiperRefs = useRef([]);

  useEffect(() => {
    AllProductsPageView();
  }, [pathname]);

  // This triggers autoplay once for each Swiper
  useEffect(() => {
    swiperRefs.current.forEach((swiper, index) => {
      if (swiper && swiper.slides?.length > 1) {
        // Slide to second image after short delay
        setTimeout(() => {
          swiper.slideTo(1);
        }, 300);
  
        // Slide back to first image
        setTimeout(() => {
          swiper.slideTo(0);
        }, 2000);
      }
    });
  }, [productsToShow]);

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

  const handleSortChange = useCallback((e) => setSortOption(e.target.value), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-tenorSans bg-cream">
      <div className="flex justify-end items-center mb-8">
        <select
          className="text-sm py-2 px-2 bg-cream rounded-md shadow-sm outline-darkGreen border border-darkGreen"
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

      <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, index) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-[#FFFCF7] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 99999, // Delay doesn't matter, we'll control it manually
                    disableOnInteraction: true,
                  }}
                  onSwiper={(swiper) => {
                    swiperRefs.current[index] = swiper;
                  }}
                  className="w-full h-full"
                >
                  {product.images.map((image, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <div className="relative w-full h-full">
                        <Image
                          aria-label={`Image of ${product.name}`}
                          src={image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-105 transition-transform duration-300"
                          quality={75}
                          priority={imgIndex === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white py-1 px-2 rounded-md text-sm font-semibold z-10">
                    {product.discount}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xs sm:text-base font-semibold mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-red-600">
                    Rs. {(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-sm text-gray-500 line-through">
                      Rs. {product.price.toFixed(2)}
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
