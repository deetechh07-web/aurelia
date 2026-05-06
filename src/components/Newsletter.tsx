"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Join the Aurelia Society
          </h2>
          <p className="text-foreground/70 font-light mb-10">
            Subscribe to receive exclusive beauty tips, early access to new collections, and special offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 bg-transparent border-b border-foreground/20 px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-foreground/50 text-foreground"
              required
            />
            <button
              type="submit"
              className="bg-foreground text-background px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-gold transition-colors glow whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
