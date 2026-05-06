"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  isCustomComponent?: boolean;
  componentType?: "cartSummary" | "confirmation";
};

export function ConciergeChatbot() {
  const { isCheckoutOpen, closeCheckout, items, getCartTotal, clearCart } = useCartStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Collected data
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isCheckoutOpen) {
      // Start flow
      setMessages([]);
      setStep(0);
      setUserData({ name: "", phone: "", email: "", address: "", notes: "" });
      advanceFlow(0);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = async (text: string, customComp?: "cartSummary" | "confirmation", delay = 800) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: "bot",
        text,
        isCustomComponent: !!customComp,
        componentType: customComp,
      },
    ]);
  };

  const advanceFlow = async (currentStep: number, userInput?: string) => {
    switch (currentStep) {
      case 0:
        await addBotMessage("Hello beautiful ✨\nWelcome to Aurelia.\nI'll help process your order.", undefined, 500);
        await addBotMessage("Here is your order summary:", "cartSummary", 1000);
        await addBotMessage("May I have your full name? ✨", undefined, 800);
        setStep(1);
        break;
      case 1:
        if (userInput) {
          setUserData((p) => ({ ...p, name: userInput }));
          await addBotMessage("What phone number can we contact you on?", undefined, 600);
          setStep(2);
        }
        break;
      case 2:
        if (userInput) {
          setUserData((p) => ({ ...p, phone: userInput }));
          await addBotMessage("✨ Our beauty team may contact you via phone for delivery updates.", undefined, 600);
          await addBotMessage("What email should we send your confirmation to?", undefined, 1000);
          setStep(3);
        }
        break;
      case 3:
        if (userInput) {
          setUserData((p) => ({ ...p, email: userInput }));
          await addBotMessage("Please enter your delivery address/location ✨", undefined, 600);
          setStep(4);
        }
        break;
      case 4:
        if (userInput) {
          setUserData((p) => ({ ...p, address: userInput }));
          await addBotMessage("Any special delivery instructions?", undefined, 600);
          setStep(5);
        }
        break;
      case 5:
        if (userInput !== undefined) { // allow empty notes
          setUserData((p) => ({ ...p, notes: userInput }));
          await addBotMessage("Processing your order...", undefined, 1000);
          await addBotMessage("", "confirmation", 1500);
          clearCart();
          setStep(6);
        }
        break;
      default:
        break;
    }
  };

  const handleSend = () => {
    if (step === 6 || step === 0) return; // flow complete or not started waiting for user input
    // Only notes (step 5) can be completely empty
    if (!input.trim() && step !== 5) return;

    const userText = input.trim() || "No notes";
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(), sender: "user", text: userText },
    ]);
    setInput("");
    advanceFlow(step, userText);
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.componentType === "cartSummary") {
      return (
        <div className="bg-card-bg/50 border border-border-color p-4 rounded-xl mt-2 max-w-sm w-full">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1 font-light border-b border-border-color/30 last:border-0">
              <span className="truncate pr-2">{item.quantity}x {item.name}</span>
              <span className="font-serif">{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium pt-2 mt-2 border-t border-border-color">
            <span>Subtotal</span>
            <span className="font-serif text-gold">${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      );
    }
    if (msg.componentType === "confirmation") {
      return (
        <div className="bg-card-bg border border-gold/30 p-5 rounded-xl mt-2 w-full max-w-sm glow">
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif text-lg">Order Confirmed</h3>
          </div>
          <div className="space-y-1 text-sm font-light mb-4">
            <p><strong className="font-medium text-foreground">Name:</strong> {userData.name}</p>
            <p><strong className="font-medium text-foreground">Address:</strong> {userData.address}</p>
            <p><strong className="font-medium text-foreground">Email:</strong> {userData.email}</p>
          </div>
          <p className="text-sm font-medium mb-1">✨ Your order has been prepared successfully.</p>
          <p className="text-sm font-medium text-foreground/70">✨ A confirmation email has been sent.</p>
          <button 
            onClick={closeCheckout}
            className="w-full mt-4 bg-foreground text-background py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors"
          >
            Close Concierge
          </button>
        </div>
      );
    }
    return <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>;
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-background w-full max-w-lg h-[80vh] md:h-[600px] rounded-3xl shadow-2xl border border-border-color overflow-hidden flex flex-col relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-color bg-background/80 backdrop-blur-md absolute top-0 w-full z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg tracking-wide">Aurelia Concierge</h2>
                  <p className="text-xs text-foreground/60">Always here for you</p>
                </div>
              </div>
              <button
                onClick={closeCheckout}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 pt-24 pb-20 scroll-smooth">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                        msg.sender === "user"
                          ? "bg-foreground text-background rounded-br-sm"
                          : "bg-card-bg border border-border-color rounded-bl-sm text-foreground"
                      }`}
                    >
                      {renderMessageContent(msg)}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-card-bg border border-border-color rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1">
                      <motion.div className="w-2 h-2 bg-foreground/30 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                      <motion.div className="w-2 h-2 bg-foreground/30 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                      <motion.div className="w-2 h-2 bg-foreground/30 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            {step > 0 && step < 6 && (
              <div className="absolute bottom-0 w-full p-4 bg-background/90 backdrop-blur-md border-t border-border-color">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type={step === 3 ? "email" : step === 2 ? "tel" : "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={step === 5 ? "Any notes (optional)..." : "Type your answer..."}
                    className="flex-1 bg-card-bg border border-border-color rounded-full px-5 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-foreground placeholder:text-foreground/40"
                    disabled={isTyping}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isTyping || (!input.trim() && step !== 5)}
                    className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
