'use client';


const AboutPage = () => {
 

  return (
    <div className="font-sans">
      {/* About Us Section */}
      <section id="about-us" className="min-h-screen p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p>Details about the company...</p>
      </section>

      {/* Collections Section */}
      <section id="collections" className="min-h-screen p-8 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Collections</h2>
        <p>Details about collections...</p>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="min-h-screen p-8 bg-gray-300">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>Contact details...</p>
      </section>

      {/* Shipping & Returns Section */}
      <section id="shipping-returns" className="min-h-screen p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Shipping & Returns</h2>
        <p>Shipping and returns details...</p>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="min-h-screen p-8 bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">FAQs</h2>
        <p>Frequently asked questions...</p>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy-policy" className="min-h-screen p-8 bg-gray-300">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>Details about privacy policy...</p>
      </section>
    </div>
  );
};

export default AboutPage;
