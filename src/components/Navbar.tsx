"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "./CartDrawer";
import { Logo } from "./ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const { isCartOpen, openCart, closeCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Skincare", href: "/#collection" },
    { name: "About", href: "/#about" },
    { name: "Ingredients", href: "/#about" }, // Assuming ingredients is part of about or collection
    { name: "Journal", href: "/journal" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6 text-foreground" />
        </button>

        {/* Desktop Links (Left) */}
        <nav className="hidden md:flex gap-8 items-center w-1/3">
          {navLinks.slice(0, 2).map((link) => (
            <Link key={link.name} href={link.href} className="text-sm tracking-wide text-foreground hover:text-gold transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
            <Logo />
          </Link>
        </div>

        {/* Desktop Links (Right) & Icons */}
        <nav className="hidden md:flex gap-6 items-center justify-end w-1/3">
          {navLinks.slice(2, 4).map((link) => (
            <Link key={link.name} href={link.href} className="text-sm tracking-wide text-foreground hover:text-gold transition-colors">
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <button className="relative group" onClick={openCart}>
            <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-gold transition-colors" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Cart Icon */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="relative" onClick={openCart}>
            <ShoppingBag className="w-6 h-6 text-foreground" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-background z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-foreground" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-serif">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </header>
  );
}
