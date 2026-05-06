"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Aurelia has completely transformed my skincare routine. The Lumière Gold Serum feels like absolute luxury, and my skin has never looked so radiant.",
    author: "Elena M.",
    role: "Beauty Editor"
  },
  {
    id: 2,
    quote: "I’m amazed at the texture and the subtle glow it leaves. It absorbs beautifully and the natural fragrance is divine. Worth every penny.",
    author: "Sarah K.",
    role: "Verified Buyer"
  },
  {
    id: 3,
    quote: "The Velvet Restorative Cream is a miracle worker. I wake up with plump, hydrated skin every morning. Truly a premium experience.",
    author: "Jessica T.",
    role: "Verified Buyer"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-foreground text-background overflow-hidden relative transition-colors duration-300">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-light/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 relative z-10">
          <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif">The Aurelia Glow</h2>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold mx-1" />
            ))}
          </div>

          <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute text-center px-4"
              >
                <p className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 italic text-background/90">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="text-gold font-medium tracking-wide">{testimonials[currentIndex].author}</h4>
                  <p className="text-xs text-background/50 uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
