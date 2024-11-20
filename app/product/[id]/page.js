import SingleProduct from '@/app/components/singleProduct';
import React from 'react';

// Fetch the dynamic route parameter using App Router
const Page = async ({ params }) => {
  const { id } = params; // Extract 'id' from the route parameters

  return (
    <div>
      <SingleProduct productId={id} /> {/* Pass the ID as a prop */}
    </div>
  );
};

export default Page;
