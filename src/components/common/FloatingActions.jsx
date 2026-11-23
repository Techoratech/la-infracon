import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => scrollToTarget('#hero', -80)}
            className="pointer-events-auto p-3 rounded-full bg-white/95 border border-sand text-black hover:bg-black hover:text-white transition-all duration-300 shadow-luxury-sm backdrop-blur-md"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating CTA Group */}
      <div className="flex flex-col gap-2.5 pointer-events-auto">
        {/* Direct Phone Call Button: Black with white icon */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          href={`tel:${siteConfig.contact.phoneDial}`}
          className="relative group p-3.5 sm:p-4 rounded-full bg-black text-white shadow-luxury hover:scale-108 transition-transform duration-300 flex items-center justify-center border border-black/20"
          aria-label={`Call LA INFRACON at ${siteConfig.contact.phoneRaw}`}
        >
          <Phone className="w-5 h-5 fill-white" />
          
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black text-xs font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block shadow-luxury">
            Call {siteConfig.contact.phoneRaw}
          </span>
        </motion.a>

        {/* WhatsApp Chat Button: Green WhatsApp color */}
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            'Hello LA INFRACON, I would like more information about plots at Palm Corridor.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-luxury hover:scale-108 transition-transform duration-300 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />

          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black text-xs font-sans text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block shadow-luxury">
            WhatsApp Us
          </span>
        </motion.a>
      </div>

    </aside>
  );
}
