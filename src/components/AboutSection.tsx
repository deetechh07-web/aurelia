"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-40 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif leading-snug mb-8 text-foreground">
            Beauty in its purest form, crafted for your ultimate confidence.
          </h2>
          <p className="text-foreground/80 text-lg md:text-xl font-light leading-relaxed">
            At Aurelia, we believe that true luxury lies in simplicity and efficacy. 
            By blending science with the world’s most potent natural ingredients, we create 
            a skincare experience that not only transforms your skin but elevates your daily ritual. 
            Your glow is our masterpiece.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
