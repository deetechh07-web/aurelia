"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getCartTotal, getCartCount, openCheckout } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    openCheckout();
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100vh] w-full max-w-md bg-background border-l border-border-color shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border-color">
              <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-foreground/50 gap-4">
                  <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
                  <p className="font-light">Your cart is elegantly empty.</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2 border border-foreground text-foreground rounded-full text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-border-color/50 pb-6">
                    <div className="relative w-24 h-24 bg-card-bg rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-foreground text-sm pr-4 leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="text-foreground/70 text-sm font-serif">
                            {item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-foreground/40 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-border-color rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-l-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-foreground" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-r-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border-color bg-background/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/70 font-light">Subtotal</span>
                  <span className="font-serif text-xl text-foreground">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-foreground text-background py-4 rounded-full text-sm uppercase tracking-widest hover:bg-gold transition-colors mb-3 glow"
                >
                  Checkout securely
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-border-color text-foreground py-4 rounded-full text-sm uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(drawerContent, document.body);
}
