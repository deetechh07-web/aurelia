"use client";

import { FaInstagram, FaTiktok, FaXTwitter, FaFacebookF, FaPinterestP } from "react-icons/fa6";
import { Logo } from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border-color transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-foreground/70 text-sm font-light leading-relaxed max-w-xs">
              Premium skincare crafted with nature's finest ingredients to reveal your inner radiance.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/70 font-light">
              <li><a href="#" className="hover:text-gold transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Serums & Oils</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Moisturizers</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Cleansers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground">About</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/70 font-light">
              <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Ingredients</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { Icon: FaInstagram, href: "#", label: "Instagram" },
                { Icon: FaTiktok, href: "#", label: "TikTok" },
                { Icon: FaXTwitter, href: "#", label: "X (Twitter)" },
                { Icon: FaFacebookF, href: "#", label: "Facebook" },
                { Icon: FaPinterestP, href: "#", label: "Pinterest" },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-card-bg border border-border-color flex items-center justify-center text-foreground hover:bg-gold hover:border-gold hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Aurelia Beauty. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
