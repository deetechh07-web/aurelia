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
  const { addItem, openCart } = useCartStore();

  return (
    <section id="collection" className="py-16 md:py-24 bg-background transition-colors duration-300 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
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
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full h-[400px] md:h-[450px] overflow-hidden mb-6 bg-card-bg flex items-center justify-center rounded-sm transition-all duration-500 group-hover:premium-shadow group-hover:ring-1 group-hover:ring-gold/30 shadow-sm"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold/15 blur-[50px] rounded-full z-0" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110 z-10 drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 z-20 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-white/10 transition-colors duration-500 z-30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100" />
                  
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 px-6 z-40">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                        openCart();
                      }}
                      className="flex-1 max-w-[140px] bg-foreground text-background px-4 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-colors text-center glow"
                    >
                      Buy Now
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                      }}
                      className="flex-1 max-w-[140px] bg-background text-foreground px-4 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors text-center border border-border-color"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
                <div className="text-center">
                  <h3 className="font-serif text-2xl md:text-xl mb-2 text-foreground group-hover:text-gold transition-colors duration-300 drop-shadow-sm">
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
