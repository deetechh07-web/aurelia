"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Minus, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";
import { useParams } from "next/navigation";

// Mock database for products (ideally this comes from an API or separate data file)
const productDb: Record<string, any> = {
  "1": { id: 1, name: "Lumière Gold Serum", category: "Serum", price: "$185", image: "/images/serum.png", description: "Infused with 24k gold flakes and rare botanical extracts for an instant radiant glow.", benefits: ["Deeply hydrates and plumps skin", "Evens out skin tone", "Reduces appearance of fine lines"], ingredients: "Aqua, Hyaluronic Acid, 24K Gold Flakes, Rosehip Oil, Vitamin C, Peptide Complex." },
  "2": { id: 2, name: "Velvet Restorative Cream", category: "Skincare", price: "$140", image: "/images/cream.png", description: "A rich, deeply hydrating night cream that repairs and rejuvenates while you sleep.", benefits: ["Intensive overnight repair", "Restores moisture barrier", "Soothes irritated skin"], ingredients: "Aqua, Shea Butter, Ceramide NP, Squalane, Niacinamide." },
  "3": { id: 3, name: "Pure Essence Toner", category: "Skincare", price: "$85", image: "/images/toner.png", description: "Balancing and refining toner with rose water and hyaluronic acid.", benefits: ["Balances skin pH", "Tightens pores", "Preps skin for serums"], ingredients: "Rose Damascena Water, Glycerin, Witch Hazel Extract, Hyaluronic Acid." },
  "4": { id: 4, name: "Satin Lip Gloss", category: "Lip Gloss", price: "$45", image: "/images/lipgloss.png", description: "A high-shine, non-sticky lip gloss infused with jojoba oil.", benefits: ["Long-lasting hydration", "Non-sticky formula", "High gloss finish"], ingredients: "Jojoba Oil, Vitamin E, Shea Butter, Natural Pigments." },
};

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product = productDb[productId] || productDb["1"]; // Fallback to 1

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, we might redirect to checkout immediately or open the cart
    // For now, we'll let the user open the cart manually
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="pt-32 pb-4 px-6 md:px-12 container mx-auto">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/collection" className="hover:text-gold transition-colors">Collection</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <section className="py-10 px-6 md:px-12 container mx-auto flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[500px] md:h-[700px] bg-card-bg flex items-center justify-center rounded-sm relative overflow-hidden"
          >
             <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif text-3xl">
                AURELIA
             </div>
             <Image src={product.image} alt={product.name} fill className="object-cover z-10" />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-sm text-foreground/50 underline cursor-pointer">(128 Reviews)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-light text-foreground mb-8">{product.price}</p>

            <p className="text-foreground/80 font-light leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center border border-border-color rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-gold transition-colors text-foreground"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-gold transition-colors text-foreground"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-background border border-foreground text-foreground py-4 rounded-full text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <button 
              onClick={handleBuyNow}
              className="w-full bg-foreground text-background py-4 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors glow mb-12"
            >
              Buy It Now
            </button>

            {/* Accordion / Tabs */}
            <div className="border-t border-border-color pt-8">
              <div className="flex gap-8 border-b border-border-color mb-6">
                {["description", "ingredients", "benefits"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs uppercase tracking-widest transition-colors relative ${
                      activeTab === tab ? "text-foreground font-medium" : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[100px] text-foreground/80 font-light text-sm leading-relaxed">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.p key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {product.description}
                    </motion.p>
                  )}
                  {activeTab === "ingredients" && (
                    <motion.p key="ingr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {product.ingredients}
                    </motion.p>
                  )}
                  {activeTab === "benefits" && (
                    <motion.ul key="bene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="list-disc pl-5 space-y-2">
                      {product.benefits.map((benefit: string, i: number) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
