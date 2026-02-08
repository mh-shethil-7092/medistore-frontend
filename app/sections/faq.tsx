"use client";

export default function FAQSection() {
  const faqs = [
    {
      question: "Do I need a prescription?",
      answer: "We sell only over-the-counter medicines that do not require a prescription."
    },
    {
      question: "How fast is delivery?",
      answer: "Standard delivery usually takes between 24 to 48 hours depending on your location."
    },
    {
      question: "Are the medicines authentic?",
      answer: "Yes. All medicines are sourced from licensed and verified pharmacies only."
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-14 max-w-2xl mx-auto">
          Find answers to the most common questions about our medicine store,
          delivery process, and authenticity.
        </p>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>

                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
