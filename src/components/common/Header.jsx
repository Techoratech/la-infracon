import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';

export default function Header({ onOpenEnquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Growth', href: '#growth' },
    { name: 'About', href: '#about' },
    { name: 'Project', href: '#project' },
    { name: 'Plots', href: '#plots' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state
      setIsScrolled(currentScrollY > 40);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Active section highlight
      const sections = ['hero', 'growth', 'about', 'project', 'plots', 'amenities', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToTarget(href, -80);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-sand/40 py-3.5 shadow-luxury-sm text-black'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 sm:h-9 flex items-center justify-center">
              <img
                src={isScrolled ? siteConfig.brand.logoBlack : siteConfig.brand.logoWhite}
                alt={siteConfig.brand.name}
                className="h-full w-auto object-contain transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl font-bold tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                {siteConfig.brand.name}
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] hidden sm:block transition-colors duration-300 ${
                  isScrolled ? 'text-taupe' : 'text-white/70'
                }`}
              >
                {siteConfig.brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1.5 ${
                    isScrolled
                      ? isActive
                        ? 'text-black font-semibold'
                        : 'text-black/60 hover:text-black'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isScrolled ? 'bg-black' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA & Phone */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider font-mono transition-colors ${
                isScrolled ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
              title="Direct Call"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.phoneRaw}</span>
            </a>

            <button
              onClick={() => {
                if (onOpenEnquiry) onOpenEnquiry();
                else scrollToTarget('#contact', -80);
              }}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 ${
                isScrolled ? 'btn-black' : 'btn-white'
              }`}
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${siteConfig.contact.phoneDial}`}
              className={`p-2 rounded-full border ${
                isScrolled ? 'border-sand text-black' : 'border-white/30 text-white'
              }`}
              aria-label="Call LA INFRACON"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                isScrolled ? 'border-sand text-black' : 'border-white/30 text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-ivory text-black flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-taupe font-mono">
                Palm Corridor Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-serif text-3xl font-medium tracking-wide text-black hover:text-taupe flex items-center justify-between border-b border-sand/30 pb-3"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-taupe" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Footer CTAs & Contact */}
            <div className="flex flex-col gap-3 pt-6 border-t border-sand/40">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                  else scrollToTarget('#contact', -80);
                }}
                className="btn-black w-full py-3.5 rounded-xl text-center text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <span>Book Site Visit / Enquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  className="btn-black-outline py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {siteConfig.contact.phoneRaw}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hello LA INFRACON, I would like more information about Palm Corridor plots.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 py-2.5 rounded-xl text-center text-xs flex items-center justify-center gap-2 transition-colors font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-center text-[11px] text-taupe uppercase tracking-widest pt-2">
                {siteConfig.brand.tagline}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
