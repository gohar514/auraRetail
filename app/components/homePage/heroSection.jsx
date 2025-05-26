
import Link from 'next/link';

import React from 'react';

const gg = "/assets/heroPhotowebp.webp"; // Path to the image in the public folder

const HeroSection = () => {
  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[95vh] overflow-hidden font-playfair bg-cream">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${gg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay (if needed) */}
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-end gap-6 pt-12 pb-8 h-full px-6 text-center text-cream">
        {/* Headline */}
        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-playfair">
          Discover Luxury at <span className="inline-block animate-aura-fade ">Aura</span>
        </h1>

      

        {/* CTA Button */}
        <Link href="/products" passHref>
          <p className="inline-block bg-black bg-opacity-50  text-lg font-semibold py-2 px-6 mb-4 md:mb-10 rounded-lg shadow-lg hover:bg-opacity-70 transition-all duration-300">
            Shop Now
          </p>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

