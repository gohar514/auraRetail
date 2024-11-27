// import Link from 'next/link';
// import { FaFacebookSquare } from "react-icons/fa";
// import { FaSquareInstagram } from "react-icons/fa6";
// import { AiFillTikTok } from "react-icons/ai";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-12 font-tenorSans">
//       <div className="container mx-auto pr-6 sm:pr-0 md:px-4">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-8 mb-8 justify-start">
//           <div className='flex max-sm:-ml-4 flex-col justify-center items-center'>
//             <h3 className="text-lg font-semibold mb-4 font-playfair">Company</h3>
//             <ul className='text-sm'>
//               <li className="mb-2">
//                 <Link href="/about#about-us" className="hover:underline">About Us</Link>
//               </li>
//               <li className="mb-2">
//                 <Link href="/about#collections" className="hover:underline">Collections</Link>
//               </li>
//               <li className="mb-2">
//                 <Link href="/about#contact-us" className="hover:underline">Contact Us</Link>
//               </li>
//             </ul>
//           </div>
//           <div className='flex flex-col justify-center items-center'>
//             <h3 className="text-lg font-semibold mb-4 whitespace-nowrap font-playfair">Customer Service</h3>
//             <ul className='text-sm'>
//               <li className="mb-2">
//                 <Link href="/about#shipping-returns" className="hover:underline whitespace-nowrap">Shipping & Returns</Link>
//               </li>
//               <li className="mb-2">
//                 <Link href="/about#faqs" className="hover:underline mx-auto ">FAQs</Link>
//               </li>
//               <li className="mb-2">
//                 <Link href="/about#privacy-policy" className="hover:underline">Privacy Policy</Link>
//               </li>
//             </ul>
//           </div>
//           <div className='max-sm:col-span-2 flex flex-col justify-center items-center'>
//             <h3 className="text-lg font-semibold mb-4 font-playfair">Follow Us</h3>
//             <div className='max-sm:flex gap-4  justify-between items-start text-sm'>
//             <div className="flex mb-2 justify-between items-center gap-2  ">
//             <a target='_blank' href="https://www.facebook.com/profile.php?id=61568097507682" className="hover:underline">Facebook</a>
//             <FaFacebookSquare/>
//             </div>
//             <div className="flex mb-2 justify-between items-center gap-2">
//             <a target='_blank' href="https://www.instagram.com/aura_retail.pk/"  className="hover:underline">Instagram</a>
//             <FaSquareInstagram  />
//             </div>
//             <div className="flex mb-2 justify-between items-center gap-2">
//             <a target='_blank' href="https://www.tiktok.com/@auraretail7?_t=8qz6ccAWkzZ&_r=1" className="hover:underline">TikTok</a>
//             <AiFillTikTok  />
            
//             </div>
//             </div>
//           </div>
         
//         </div>
//         <div className="border-t border-gray-700 pt-4 text-center">
//           <p className="text-sm font-playfair">&copy; {new Date().getFullYear()} Aura Bags Co. All Rights Reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import Link from "next/link";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 font-tenorSans">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 mb-8 text-center ">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-playfair">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about#about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#collections" className="hover:text-white">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about#contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-playfair">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
            <li>
                <Link href="/about#faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/about#privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about#shipping-returns" className="hover:text-white">
                  Shipping & Returns
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-playfair">Follow Us</h3>
            <div className="flex justify-center items-center md:flex-col gap-6 md:gap-2 ">
              <a
                href="https://www.facebook.com/profile.php?id=61568097507682"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookSquare size={24} />
              </a>
              <a
                href="https://www.instagram.com/aura_retail.pk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@auraretail7?_t=8qz6ccAWkzZ&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 hover:text-white"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
         
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aura Bags Co. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





