export const fbPixel = (event, options = {}) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq(event, options);
    }
  };
  
  export const AddToCart = () => {
    fbPixel("track", "AddToCart");
  };
  export const Purchase = () => {
    fbPixel("track", "Purchase");
  };

  export const SingleProductPageView = () => {
    fbPixel("track", "SingleProductPageView");

  };

  export const AllProductsPageView = () => {
    fbPixel("track", "AllProductsPageView");
  };

  export const HomePageView = () => {
    fbPixel("track", "HomePageView");
  };

  export const Checkout = () => {
    fbPixel("track", "Checkout");
  };