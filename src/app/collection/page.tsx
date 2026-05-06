"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { Search } from "lucide-react";
import Link from "next/link";

const allProducts = [
  { id: 1, name: "Lumière Gold Serum", category: "Serum", price: "$185", image: "/images/serum.png", description: "Infused with 24k gold flakes and rare botanical extracts for an instant radiant glow." },
  { id: 2, name: "Velvet Restorative Cream", category: "Skincare", price: "$140", image: "/images/cream.png", description: "A rich, deeply hydrating night cream that repairs and rejuvenates while you sleep." },
  { id: 3, name: "Pure Essence Toner", category: "Skincare", price: "$85", image: "/images/toner.png", description: "Balancing and refining toner with rose water and hyaluronic acid." },
  { id: 4, name: "Satin Lip Gloss", category: "Lip Gloss", price: "$45", image: "/images/lipgloss.png", description: "A high-shine, non-sticky lip gloss infused with jojoba oil." },
  { id: 5, name: "Botanical Body Wash", category: "Body Care", price: "$65", image: "/images/bodywash.png", description: "Gentle, sulfate-free body wash with a calming lavender scent." },
  { id: 6, name: "Radiance Eye Cream", category: "Skincare", price: "$120", image: "/images/eyecream.png", description: "Target dark circles and fine lines with this potent peptide blend." },
  { id: 7, name: "Hydrating Mist", category: "Skincare", price: "$55", image: "/images/mist.png", description: "A refreshing mist to lock in moisture and set makeup." },
  { id: 8, name: "Vitamin C Boost", category: "Serum", price: "$150", image: "/images/vitaminc.png", description: "Brightening serum with 15% pure Vitamin C and ferulic acid." },
];

const categories = ["All", "Skincare", "Serum", "Lip Gloss", "Body Care", "Best Sellers"];

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === "All" || 
      (activeCategory === "Best Sellers" ? [1, 2, 4].includes(product.id) : product.category === activeCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-12 flex-grow container mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif text-foreground mb-6"
          >
            The Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/70 text-lg max-w-2xl mx-auto font-light"
          >
            Discover our full range of luxury skincare and beauty products, meticulously crafted to elevate your daily ritual.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "border border-border-color text-foreground hover:border-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-border-color py-2 pl-10 focus:outline-none focus:border-gold transition-colors text-foreground"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative w-full h-[450px] overflow-hidden mb-6 bg-card-bg flex items-center justify-center rounded-sm transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)]">
                    {/* Using a fallback div if image not found, but we have actual images or we should use them */}
                    <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif text-2xl">
                      AURELIA
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-105 z-10"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-20" />
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                      }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-background text-foreground px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-foreground hover:text-background z-30"
                    >
                      Add to Bag
                    </button>
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl mb-2 text-foreground group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-foreground/70 text-sm font-light mb-3 max-w-xs mx-auto">
                      {product.description}
                    </p>
                    <p className="font-medium text-foreground">{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/50 text-lg">No products found matching your search.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
