// products.js (updated)
import image1 from "@/assets/shoes.png";
import image2 from "@/assets/image2.png";
import image3 from "@/assets/image3.png";
import image4 from "@/assets/image4.png";
import image5 from "@/assets/image5.png";
import image6 from "@/assets/image6.png";


export const ProductsData = [
  {
    id: 1,
    name: "Leather Crossbody Bag",
    price: 120,
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6
    ],
    link: "/product/1",
    description: "Discover the perfect blend of fashion and function with our roomy and elegant Shoulder bag...",
    color: "Olive Green",
    material: "100% Goat Leather",
    gender: "Female",
    width: 16,
    height: 11,
    discount: 40,
   video: "5fwp1VyrRe0"
  },
    {
      id: 2,
      name: "Classic Tote Bag",
      price: 180,
      images: [
        image2,
        image1,
        image3,
        image4,
        image5,
        image6
      ],
      link: "/product/2",
      date: "2023-08-20",
       description:"This is made with 100% cow leather. Elevate your style with our curated selection of high-quality products. Shop now for exclusivity and elegance.",
       color: "Olive Green",
       material: "100% Cow Leather",
        gender: "Female",
        width: 16,
        height: 11,
        discount: 50,
       video: "5fwp1VyrRe0"
    },
    {
      id: 3,
      name: "Elegant Handbag",
      price: 220,
      images: [
        image3,
        image1,
        image2,
        image5,
        image4,
        image6
      ],
      link: "/product/3",
      date: "2023-10-01",
       description:"This is made with 100% cow leather. Elevate your style with our curated selection of high-quality products. Shop now for exclusivity and elegance.",
       color: "Olive Green",
       material: "100% Cow Leather",
        gender: "Female",
        width: 16,
        height: 11,
        discount: 60,
        video: "5fwp1VyrRe0"
    },
    {
      id: 4,
      name: "Minimalist Handbag",
      price: 240,
      images: [
        image4,
        image3,
        image2,
        image1,
        image5,
        image6
      ],
      link: "/product/4",
      date: "2023-10-10",
      description:"This is made with 100% cow leather. Elevate your style with our curated selection of high-quality products. Shop now for exclusivity and elegance.",
      color: "Olive Green",
      material: "100% Cow Leather",
       gender: "Female",
       width: 16,
       height: 11,
       discount: 0,
      video: "5fwp1VyrRe0"
    }
    // Add more products as necessary
];
