"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 via-black to-zinc-900 border border-zinc-800">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-8">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium animate-fade-in">
          ✨ Your Trusted Health Partner
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Authentic Medicine <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Delivered to Your Door
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Shop for 100% genuine over-the-counter medicines from verified sellers. 
          Fast delivery, secure payments, and health support at your fingertips.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/shop" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            Start Shopping 💊
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full border border-zinc-700 transition-all flex items-center justify-center gap-2"
          >
            Create Account
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 border-t border-zinc-800/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">10k+</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Users</p>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Medicines</p>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">4.9/5</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}