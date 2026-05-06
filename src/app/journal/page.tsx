"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    id: 1,
    title: "The Ultimate 5-Step Evening Routine",
    category: "Skincare Routines",
    date: "October 12, 2023",
    image: "/images/serum.png",
    excerpt: "Discover the secrets to waking up with a radiant, deeply hydrated complexion by following our minimalist evening ritual.",
  },
  {
    id: 2,
    title: "Understanding Peptides vs. Retinol",
    category: "Beauty Tips",
    date: "October 05, 2023",
    image: "/images/cream.png",
    excerpt: "Navigate the complex world of active ingredients. Here is everything you need to know about incorporating peptides and retinol into your regimen.",
  },
  {
    id: 3,
    title: "The Science of the Aurelia Glow",
    category: "Editorial",
    date: "September 28, 2023",
    image: "/images/toner.png",
    excerpt: "We take a deep dive into the rare botanicals and scientific innovation behind our best-selling Lumière Gold Serum.",
  },
  {
    id: 4,
    title: "Summer to Fall Skin Transition",
    category: "Glow-up Advice",
    date: "September 15, 2023",
    image: "/images/serum.png",
    excerpt: "As the seasons change, so should your skincare. Learn how to adapt your hydration strategy for the cooler months ahead.",
  }
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-card-bg transition-colors duration-300">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">The Journal</span>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6">
              Beauty, <span className="italic">Elevated.</span>
            </h1>
            <p className="text-foreground/70 text-lg font-light">
              Explore our curated collection of editorial beauty insights, expert skincare routines, and the philosophy of the ultimate glow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 px-6 md:px-12 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 cursor-pointer group"
        >
          <div className="relative w-full h-[500px] bg-card-bg overflow-hidden rounded-sm">
            <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif text-3xl">
              AURELIA EDITORIAL
            </div>
            <Image src="/images/serum.png" alt="Featured" fill className="object-cover transition-transform duration-700 group-hover:scale-105" /> 
          </div>
          <div>
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Featured Story</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 group-hover:text-gold transition-colors duration-300">
              The Art of Slow Beauty
            </h2>
            <p className="text-foreground/70 text-lg font-light leading-relaxed mb-8">
              In a world obsessed with instant results, we explore the profound benefits of adopting a slow, intentional approach to your beauty ritual. Discover how taking your time can transform not just your skin, but your well-being.
            </p>
            <button className="border-b border-foreground pb-1 text-sm tracking-widest uppercase text-foreground hover:text-gold hover:border-gold transition-colors">
              Read Full Story
            </button>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full h-[350px] bg-card-bg overflow-hidden rounded-sm mb-6">
                 <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif text-xl">
                    ARTICLE IMAGE
                 </div>
                 <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gold text-xs uppercase tracking-widest font-bold">{article.category}</span>
                <span className="text-foreground/50 text-xs">{article.date}</span>
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-foreground/70 font-light mb-6 flex-grow">
                {article.excerpt}
              </p>
              <div className="mt-auto">
                <button className="text-xs tracking-widest uppercase text-foreground group-hover:text-gold transition-colors flex items-center gap-2">
                  Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
