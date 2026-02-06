"use client";

import MedicineList from "@/components/MedicineList";
import Link from "next/link";
import FeedbackSection from "./feedback/FeedbackSection";
import FAQSection from "./sections/pagetwo";
import Hero from "./sections/Hero";

export default function Home() {
  return (
    <main className="space-y-16 p-6 text-white bg-black min-h-screen">
      <Hero />

      <section>
        <MedicineList limit={4} />
      </section>

      <FeedbackSection />
      <FAQSection />
    </main>
  );
}
