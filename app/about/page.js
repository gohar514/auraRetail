'use client';
import FaqItem from "../components/checkoutFolder/FaqItem";


const AboutPage = () => {
 

  return (
    <div className="font-sans flex flex-col gap-4 px-4 container mx-auto bg-cream">
      {/* About Us Section */}
      <section id="about-us" className="min-h-screen p-2">
      <h1 className="text-3xl font-bold text-center mb-4 font-playfair">About Us</h1>

<section className="mb-4">
  <h2 className="text-xl font-semibold font-playfair">Who are we?</h2>
  <p className=" mt-2 text-gray-600">
    Founded in 2024, AURA is a high-street brand with a focus on combining
    functional, sustainable design with popular fashion for a diverse audience
    spanning different ages and lifestyles.
  </p>
  <p className=" mt-2 text-gray-600">
    The culture at AURA is about simplicity, kindness, growth, and inclusivity. The
    customer is at the heart of the AURA business model. We are committed to providing
    a comprehensive shopping experience that evolves with what our customers want more
    and better of.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-semibold font-playfair">Vision</h2>
  <p className=" mt-2 text-gray-600">
    We create simple lifestyle choices that let you tell your own stories.
  </p>
</section>

<section>
  <h2 className="text-xl font-semibold font-playfair">Core Values</h2>
  <ul className="list-disc ml-6 mt-2 text-gray-600">
    <li>Inclusivity</li>
    <li>Collaboration</li>
    <li>Ownership</li>
    <li>Excellence</li>
    <li>Simplicity</li>
    <li>Integrity</li>
  </ul>
</section>
      
      </section>

     

      {/* Contact Us Section */}
      <section id="contact-us" className="min-h-screen p-2 text-gray-600">
      <h1 className="text-2xl font-bold text-center mb-4 font-playfair text-black">Contact Us</h1>

<section className="mb-2">
  <h2 className="text-xl font-semibold font-playfair text-black">Email Us</h2>
  <p className=" mt-1">
    You can reach us via email at{' '}
    <span
      className="text-black hover:underline cursor-pointer"
      onClick={() => navigator.clipboard.writeText("auraretail.pk@gmail.com")}
    >
      auraretail.pk@gmail.com
    </span>
    . Click to copy the email address.
  </p>
</section>

<section>
  <h2 className="text-xl text-black font-semibold mt-4 font-playfair">Call Us</h2>
  <p className=" mt-1 text-base">
    You can also contact us by phone at{' '}
    <span
      className="text-black hover:underline cursor-pointer"
      onClick={() => navigator.clipboard.writeText("03170820118")}
    >
      03170820118
    </span>
    . Click to copy the phone number.
  </p>
</section>
       
      </section>

      {/* Shipping & Returns Section */}
      <section id="shipping-returns" className="min-h-screen p-2 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 font-playfair ">Shipping & Exchange</h1>
        
        {/* Shipping Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 font-playfair">Shipping Policy</h2>
          <p className="text-lg text-gray-600">
            At <span className="font-bold text-black font-playfair">Aura</span>, we offer <span className="font-bold text-gray-700 font-playfair">free nationwide shipping</span> on all orders. Whether you're in a city or a rural area, we've got you covered. We aim to deliver your products to you as quickly and efficiently as possible. 
          </p>
          <p className="text-lg text-gray-600">
            Your order will typically be processed and shipped within 1-2 business days, and you'll receive a tracking number to monitor your shipment.
          </p>
        </div>

        {/* Exchange Policy */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 font-playfair">Exchange Policy</h2>
          <p className="text-lg text-gray-600">
            At <span className="font-bold text-black font-playfair">Aura</span>, we want you to love your purchase. If for any reason you are not completely satisfied, we offer an exchange within <span className="font-bold font-playfair text-red-600">7 days</span> of purchase. 
          </p>
          <p className="text-lg text-gray-600">
            The product must be in its original condition with tags attached and unworn. Simply get in touch with us, and we will guide you through the exchange process. Please note that the customer is responsible for return shipping costs.
          </p>
        </div>
        
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="min-h-screen p-2">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 font-playfair">FAQ's</h1>
        <FaqItem
        question="What is Aura?"
        answer="AURA is a High Street fashion brand. It stands for Life Aesthetics, Metropolitan Apparel."
      />
      <FaqItem
        question="How can I contact customer support?"
        answer="You can reach out to customer support via email at auraretail.pk@gmail.com or call us at 0317-0820117."
      />
      <FaqItem
        question="What is your return policy?"
        answer="We accept returns within 7 days of purchase. Please make sure the product is in its original condition and packaging."
      />
      <FaqItem
        question="What are the delivery charges?"
        answer="AURA is offering free delivery on all orders nationwide."
      />
      <FaqItem
        question="Do you have a refund policy?"
        answer=" At AURA we do not refund orders however, we do offer exchanges.."
      />
      <FaqItem
        question="Can i exchange my product, if needed?"
        answer="Yes, you can exchange products within 7 days of purchase with the original sales receipt, if the product is defective or of an incorrect size. Articles must be unworn, unaltered and tagged. Promotional merchandise is non-exchangeable."
      />
      <FaqItem
        question="What do i do if i received a faulty item in my order?"
        answer="Kindly do not accept an order if the parcel is damaged or the seal is opened. If you receive a faulty product, immediately call our customer care helpline at +92-317-0820117 between 9 am to 6 pm You can also email us at auraretail.pk@gmail.com"
      />
      <FaqItem
        question="Can i cancel my order ?"
        answer="Orders cannot be canceled once we have verified an order with you and it has been processed and dispatched."
      />
      <FaqItem
        question="Can i make changes to my order after confirming it?"
        answer="Yes, changes to order are accepted if you immediately call Customer Care and advise them. Once the order has been processed and dispatched we are unable to make changes"
      />
       
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy-policy" className="min-h-screen p-2 mb-6">
      
      
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 font-playfair">Privacy Policy</h1>

        <div className="space-y-4">
         
          <p className="text-lg text-gray-600">
            This Privacy Policy outlines the types of personal information collected and received by <span className="font-bold text-black font-playfair">Aura</span> ("we," "us," or "our") and how we use, disclose, and protect that information. By using or accessing our website, you consent to the terms and practices described in this policy.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Information We Collect:</h3>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 font-playfair">a) Personal Information</h4>
            <p className="text-lg text-gray-600">
              We may collect personal information from you when you voluntarily provide it to us, such as when you create an account, make a purchase, subscribe to our newsletter, opt for receiving marketing SMS/WhatsApp, direct emails, or interact with our website's features. This may include your name, email address, shipping address, billing information, and other details necessary to provide our services to you. Saved card details will never be shared with third parties and will only be used to process your order, using our payment service provider's systems.
            </p>
            <p className="text-lg text-gray-600 ">
              At all times, we will offer you the opportunity to unsubscribe from any service or update to which you have subscribed if you change your mind. Any email we send you will contain an easy automated unsubscribe link so that you can opt out of that particular email shot.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 font-playfair">b) Non-Personal Information</h4>
            <p className="text-lg text-gray-600">
              We may also collect non-personal information about your interactions with our website. This may include your IP address, browser type, device information, and browsing behavior. Such information is collected through the use of cookies, log files, and similar technologies.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Use of Information:</h3>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 font-playfair">a) Personal Information</h4>
            <p className="text-lg text-gray-600">
              We may use personal information to process and fulfill your orders, provide customer support and respond to inquiries, customize and improve our website and services, send you promotional offers, updates, and newsletters (you can opt out at any time), and conduct market research and analyze trends.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 font-playfair">b) Non-Personal Information</h4>
            <p className="text-lg text-gray-600">
              Non-personal information is primarily used to analyze and improve the functionality and performance of our website. This data helps us understand how users interact with our website and enables us to enhance the user experience.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Disclosure of Information:</h3>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 font-playfair">a) Service Providers</h4>
            <p className="text-lg text-gray-600">
              We may engage trusted third-party service providers to assist us in operating our website and providing our services. These service providers may have access to your personal information but are obligated to keep it confidential and use it solely for the purposes specified by us.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 font-playfair">b) Legal Requirements</h4>
            <p className="text-lg text-gray-600">
              We may disclose your personal information if required to do so by law or in response to valid legal requests, such as subpoenas, court orders, or government regulations.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Data Security:</h3>
          <p className="text-lg text-gray-600">
            We implement appropriate technical and organizational measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Third-Party Links:</h3>
          <p className="text-lg text-gray-600">
            We do collect information about site traffic, sales, wish lists, and other commercial information which we may pass on to third parties, but this information does not include any information which can identify you personally.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Changes to This Policy:</h3>
          <p className="text-lg text-gray-600">
            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective when posted on this page. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 font-playfair">Contact Information:</h3>
          <p className="text-lg text-gray-600">
            For any further information or to unsubscribe from our services, you may contact us at <span className=" text-gray-900">0317-082011-7</span> or email us at <span className="text-gray-900">auraretail.pk@gmail.com</span>.
          </p>
        </div>
      
    
      </section>
    </div>
  );
};

export default AboutPage;
