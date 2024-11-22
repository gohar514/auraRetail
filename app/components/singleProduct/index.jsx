
import React from 'react';
import ImageAndDescription from './ImageAndDescription';
import BestSellers from '../homePage/bestSellers';
import { ProductsData } from '../homePage/ProductsData';
import ReviewSection from './ReviewSection';
import ProductVideo from './ProductVideo';

const SingleProduct = ({ productId }) => {
  // Example: Pick some related products
  const relatedProducts = ProductsData.slice(1, 4); // Replace this with actual related products logic

  return (
    <div>
      <ImageAndDescription />
      
      <div className="container mx-auto px-4 lg:px-20 py-4 lg:py-12 grid grid-cols-1 md:grid-cols-2 gap-4  ">
  {/* Product Video Component */}
  <div  >
    <ProductVideo />
  </div>

  {/* Review Section Component */}
  <div>
    <ReviewSection productId={productId} />
  </div>
</div>
      
      {/* Pass related products */}
      <BestSellers relatedProducts={relatedProducts} />
    </div>
  );
};

export default SingleProduct;
