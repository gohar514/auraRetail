// PriceDisplay Component for Price logic
export const PriceDisplay = ({ product }) => {
    const discountedPrice = product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product.price.toFixed(2);
  
    return (
      <>
        <div className="text-base text-red-600">
          <span className="mr-1">Rs.</span>
          {discountedPrice}
        </div>
        {product.discount > 0 && (
          <div className="text-base text-gray-500 line-through">
            Rs.{product.price.toFixed(2)}
          </div>
        )}
      </>
    );
  };
  