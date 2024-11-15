// BestSellers Component (Updated to show first image in `images` array)

import Image from 'next/image'; 
import Link from 'next/link';
import { ProductsData } from './ProductsData';

const BestSellers = ({ relatedProducts }) => {
  const productsToShow = relatedProducts && relatedProducts.length > 0
    ? relatedProducts
    : ProductsData.slice(0, 4); // Show best sellers if no related products provided

  return (
    <section className="py-8 bg-gray-50 font-tenorSans">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-900 font-playfair">
          {relatedProducts && relatedProducts.length > 0 ? "Related Products" : "Best Sellers"}
        </h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsToShow.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <Link href={product.link}>
                <div className="relative w-full aspect-w-4 aspect-h-5">
                  <Image
                    src={product.images[0]} // Shows the first image in the `images` array
                    alt={product.name}
                    layout="responsive"
                    width={450}
                    height={562}
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    quality={75}
                    priority
                  />
                  
                  {product.discount > 0 && (
                    <div className="absolute top-0 right-0 bg-transparent text-red-600 py-1 px-2 rounded-md text-sm font-semibold">
                      {product.discount}% 
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="text-base text-red-600">
                    <span className="mr-1">Rs.</span>{product.discount > 0 ? ((product.price * (1 - product.discount / 100)).toFixed(2)) : product.price.toFixed(2)}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-base text-gray-500 line-through">
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
