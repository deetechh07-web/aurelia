"use client";

import { motion } from "framer-motion";
import SceneContainer from "./3d/SceneContainer";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function HeroSection() {
  const openCart = useCartStore((state) => state.openCart);
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-blush rounded-full blur-[120px] -z-10 opacity-70 transition-colors duration-500" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-6"
          >
            Radiance <br />
            <span className="italic text-gradient">begins with care.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-md mx-auto lg:mx-0 font-light"
          >
            Experience the pinnacle of luxury skincare. Formulated with rare botanicals to awaken your skin's natural glow.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button 
              onClick={openCart}
              className="px-8 py-4 bg-foreground text-background rounded-full hover:bg-gold hover:text-white transition-all duration-300 text-sm tracking-widest uppercase glow"
            >
              Shop Now
            </button>
            <Link 
              href="/collection"
              className="px-8 py-4 border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest uppercase text-center"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="order-1 lg:order-2 w-full h-[50vh] lg:h-[80vh] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
        >
          <SceneContainer />
        </motion.div>
      </div>
    </section>
  );
}
