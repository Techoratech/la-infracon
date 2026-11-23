import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';

export default function FloatingActions() {
  const [showFloating, setShowFloating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // SVG circular ring circumference
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroEl = document.getElementById('hero');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;

      // Show after hero
      setShowFloating(scrollY > heroHeight - 150);

      // Page scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Back to Top with Animated Circular Progress Ring */}
      <AnimatePresence>
        {showFloating && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={{ duration: 0.35, ease: 'backOut' }}
            onClick={() => scrollToTarget('#hero', -96)}
            className="pointer-events-auto relative p-3 rounded-full bg-white/95 text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-luxury flex items-center justify-center group"
            aria-label="Scroll to Top"
          >
            {/* SVG Circular Progress Track & Fill */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#CDBFA8"
                strokeWidth="2"
                className="opacity-30"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#0B0B0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
            </svg>

            <ArrowUp className="w-4 h-4 relative z-10 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating CTAs (Scale-in and soft pulse after hero) */}
      <AnimatePresence>
        {showFloating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'backOut' }}
            className="flex flex-col gap-2.5 pointer-events-auto"
          >
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              className="relative group p-3.5 sm:p-4 rounded-full bg-black text-white shadow-luxury hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-white/20 animate-pulse"
              style={{ animationDuration: '3s' }}
              aria-label={`Call LA INFRACON at ${siteConfig.contact.phoneRaw}`}
            >
              <Phone className="w-5 h-5 fill-white" />
              
              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black text-xs font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block shadow-luxury">
                Call {siteConfig.contact.phoneRaw}
              </span>
            </a>

            {/* WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hello LA INFRACON, I would like more information about plots at Palm Corridor.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-luxury hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white" />

              <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black text-xs font-sans text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block shadow-luxury">
                WhatsApp Us
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </aside>
  );
}
