"use client";

import MedicineList from "@/components/MedicineList";
import Link from "next/link";
// Ensure these paths match your folder structure exactly
import ReviewSection from "./sections/pageone"; 
import FAQSection from "./sections/pagetwo";
import Hero from "./sections/Hero"


export default function Home() {
  return (
    <main className="space-y-16 p-6 text-white bg-black min-h-screen">
      {/* Hero and Medicine Sections... */<Hero></Hero>}
      
      <section>
        <MedicineList limit={4} />
      </section>

      {/* These will now work because the files exist and are exported correctly */}
      <ReviewSection />
      <FAQSection />
          
      {/* Why Choose Us section... */}
    </main>
  );
}