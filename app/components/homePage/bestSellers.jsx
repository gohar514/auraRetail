"use client";

import React, { useEffect, useMemo } from "react";
import { ProductsData } from "./ProductsData"; // Data
import Link from "next/link";
import { HomePageView } from "@/app/lib/metaPixel";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

// BestSellers Component
const BestSellers = ({ relatedProducts }) => {
  const productsToShow = useMemo(
    () => (relatedProducts?.length > 0 ? relatedProducts : ProductsData.slice(0, 4)),
    [relatedProducts]
  );

  const pathname = usePathname();
  useEffect(() => {
    HomePageView();
  }, [pathname]);

  return (
    <section className="py-8 bg-cream font-tenorSans">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-900 font-playfair">
          {relatedProducts?.length > 0 ? "Related Products" : "Best Sellers"}
        </h2>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsToShow.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFCF7] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[1/1]">
                <Swiper
                  spaceBetween={5}
                  slidesPerView={1}
                  loop={product.images.length > 1}
                  className="absolute inset-0 w-full h-full"
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg transition-transform duration-300 ease-in-out"
                          quality={70}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white py-1 px-2 rounded-md text-xs font-semibold z-10">
                    {product.discount}%
                  </div>
                )}
              </div>
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
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <p className="inline-block py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 font-playfair">
              View All
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
