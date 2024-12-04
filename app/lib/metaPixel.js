export const fbPixel = (event, options = {}) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(event, options);
    }
  };
  
  export const AddToCart = () => {
    fbPixel("track", "AddToCart");
  };
  export const purchase = () => {
    fbPixel("track", "Purchase");
  };

  export const SingleProductPageView = () => {
    fbPixel("track", "SingleProductPageView");
  };