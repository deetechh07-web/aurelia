"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Lumière Gold Serum",
    description: "Infused with 24k gold flakes and rare botanical extracts for an instant radiant glow.",
    price: "$185",
    image: "/images/serum.png"
  },
  {
    id: 2,
    name: "Velvet Restorative Cream",
    description: "A rich, deeply hydrating night cream that repairs and rejuvenates while you sleep.",
    price: "$140",
    image: "/images/cream.png"
  },
  {
    id: 3,
    name: "Pure Essence Toner",
    description: "Balancing and refining toner with rose water and hyaluronic acid.",
    price: "$85",
    image: "/images/toner.png"
  }
];

export default function FeaturedProducts() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section id="collection" className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4 block">The Collection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Curated Essentials</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/collection"
              className="hidden md:inline-block border-b border-foreground pb-1 text-sm tracking-widest uppercase text-foreground hover:text-gold hover:border-gold transition-colors"
            >
              View All
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative w-full h-[450px] overflow-hidden mb-6 bg-card-bg flex items-center justify-center rounded-sm transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-background text-foreground px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-foreground hover:text-background"
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
        </div>
      </div>
    </section>
  );
}
