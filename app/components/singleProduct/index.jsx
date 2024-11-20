
import React from 'react';
import ImageAndDescription from './ImageAndDescription';
import BestSellers from '../homePage/bestSellers';
import { ProductsData } from '../homePage/ProductsData';
import ReviewSection from './ReviewSection';

const SingleProduct = ({ productId }) => {
  // Example: Pick some related products
  const relatedProducts = ProductsData.slice(1, 4); // Replace this with actual related products logic

  return (
    <div>
      <ImageAndDescription />
      <ReviewSection productId={productId}/>
      {/* Pass related products */}
      <BestSellers relatedProducts={relatedProducts} />
    </div>
  );
};

export default SingleProduct;
