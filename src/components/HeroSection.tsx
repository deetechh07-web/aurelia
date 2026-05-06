"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SceneContainer from "./3d/SceneContainer";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function HeroSection() {
  const openCart = useCartStore((state) => state.openCart);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[100dvh] flex items-center pt-20 md:pt-24 overflow-hidden">
      {/* Background ambient glow - Luxury Lighting */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-pink-blush/60 rounded-full blur-[80px] md:blur-[120px] animate-blob mix-blend-screen dark:mix-blend-lighten" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gold/20 rounded-full blur-[80px] md:blur-[120px] animate-blob mix-blend-screen dark:mix-blend-lighten" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-peach-warm/30 rounded-full blur-[100px] animate-blob mix-blend-screen dark:mix-blend-lighten" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div style={{ y, opacity }} className="order-2 lg:order-1 text-center lg:text-left mt-[-40px] md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[3.5rem] leading-[1.1] md:text-7xl lg:text-8xl font-serif font-medium mb-6 tracking-tight drop-shadow-sm"
          >
            Radiance <br />
            <span className="italic text-gradient">begins with care.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-xl text-foreground/80 mb-10 max-w-sm md:max-w-md mx-auto lg:mx-0 font-light drop-shadow-sm"
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
              className="px-8 py-4 bg-foreground text-background rounded-full hover:bg-gold hover:text-white transition-all duration-300 text-sm tracking-widest uppercase glow shimmer-effect font-medium"
            >
              Shop Now
            </button>
            <Link 
              href="/collection"
              className="px-8 py-4 glass-panel text-foreground rounded-full hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest uppercase text-center"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="order-1 lg:order-2 w-full h-[45vh] md:h-[50vh] lg:h-[80vh] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
        >
          {/* subtle glow behind product */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/10 blur-[60px] rounded-full pointer-events-none" />
          <SceneContainer />
        </motion.div>
      </div>
    </section>
  );
}
