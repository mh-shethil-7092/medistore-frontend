"use client";

export default function FAQSection() {
  const faqs = [
    { question: "Do I need a prescription?", answer: "We sell OTC medicines that do not require one." },
    { question: "How fast is delivery?", answer: "Standard delivery takes 24-48 hours." },
    { question: "Are medicines real?", answer: "Yes, we only work with licensed pharmacies." }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Common Questions ❓</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-zinc-900 border border-zinc-800 rounded-lg p-4 cursor-pointer">
            <summary className="font-medium list-none flex justify-between">
              {faq.question}
              <span className="text-blue-500">+</span>
            </summary>
            <p className="text-gray-400 text-sm mt-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}