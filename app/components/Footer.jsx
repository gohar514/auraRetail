



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
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400 font-playfair">
          <p>&copy; {new Date().getFullYear()} Aura Bags Co. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





