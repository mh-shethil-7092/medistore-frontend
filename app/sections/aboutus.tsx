import React from "react";

const AboutUs = () => {
  return (
    <main className="min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          About Us
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Who we are and what we stand for
        </p>

        {/* Card Wrapper */}
        <div className="space-y-8">
          {/* Mission */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to build a reliable medicine marketplace where
              sellers can manage their products easily and customers can
              purchase safely with confidence and simplicity.
            </p>
          </section>

          {/* Offer */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Seller dashboard for medicine management</li>
              <li>Customer shopping and cart system</li>
              <li>Authentication with role-based access</li>
              <li>Smooth checkout experience</li>
            </ul>
          </section>

          {/* Why Us */}
          <section className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md dark:shadow-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Why Choose Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Built with modern technologies like Next.js, Express, and MongoDB,
              our platform focuses on performance, security, and a clean user
              experience across all devices.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
