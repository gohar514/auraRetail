import { PriceDisplay } from "./PriceDisplay"; // Separate PriceDisplay component

// ProductDetails Component
export const ProductDetails = ({ product }) => {
  return (
    <div className="p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
        {product.name}
      </h3>
      <div className="flex items-center justify-center gap-2 mt-2">
        <PriceDisplay product={product} />
      </div>
    </div>
  );
};
