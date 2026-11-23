import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';

export default function Header() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Project', href: '#project', id: 'project' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroEl = document.getElementById('hero');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;

      // Switch header to light ivory glass when reaching the first light section (#about)
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect();
        setIsPastHero(aboutRect.top <= 100);
      } else {
        setIsPastHero(scrollY > heroHeight * 2);
      }

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }

      // Track active section with ScrollTrigger thresholds
      const sections = ['contact', 'project', 'about', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    scrollToTarget(href, -96);
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] max-w-[1100px] rounded-full transition-all duration-500 shadow-luxury-sm ${
          isPastHero
            ? 'bg-ivory/85 border border-sand/50 text-black backdrop-blur-xl'
            : 'bg-black/40 border border-white/20 text-white backdrop-blur-md'
        }`}
      >
        <div className="relative px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          
          {/* Logo Only (Left) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center group py-0.5"
            aria-label="LA INFRACON Home"
          >
            <div className="h-7 sm:h-8 flex items-center justify-center">
              <img
                src={isPastHero ? siteConfig.brand.logoBlack : siteConfig.brand.logoWhite}
                alt={siteConfig.brand.name}
                className="h-full w-auto object-contain transition-opacity duration-300"
              />
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium relative py-1 transition-colors ${
                    isPastHero
                      ? isActive
                        ? 'text-black font-semibold'
                        : 'text-black/60 hover:text-black'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                        isPastHero ? 'bg-black' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Contact Pill Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                isPastHero
                  ? activeSection === 'contact'
                    ? 'bg-black text-white'
                    : 'btn-black'
                  : activeSection === 'contact'
                  ? 'bg-white text-black'
                  : 'btn-white'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile: Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border transition-colors ${
                isPastHero
                  ? 'border-sand/60 text-black hover:bg-black/5'
                  : 'border-white/25 text-white hover:bg-white/10'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Scroll progress line at bottom edge of pill */}
          <div className="absolute -bottom-[1px] left-6 right-6 h-[2px] overflow-hidden rounded-full pointer-events-none opacity-60">
            <div
              className={`h-full transition-all duration-75 ${
                isPastHero ? 'bg-black' : 'bg-white'
              }`}
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Ivory Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-ivory text-black flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
          >
            {/* Top Brand Header in Drawer */}
            <div className="flex items-center justify-between pb-4 border-b border-sand/30">
              <img
                src={siteConfig.brand.logoBlack}
                alt={siteConfig.brand.name}
                className="h-7 w-auto object-contain"
              />
              <span className="text-[11px] font-mono text-taupe uppercase tracking-widest">
                Navigation
              </span>
            </div>

            {/* Large Serif Links with Staggered Reveal */}
            <div className="flex flex-col gap-5 my-auto">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'About', href: '#about' },
                { name: 'Project', href: '#project' },
                { name: 'Contact', href: '#contact' },
              ].map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.35 }}
                  className="font-serif text-4xl sm:text-5xl font-medium tracking-wide text-black hover:text-taupe flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-5 h-5 text-sand group-hover:text-black group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Bottom: Phone, WhatsApp, Socials */}
            <div className="flex flex-col gap-4 pt-6 border-t border-sand/40">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  className="btn-black-outline py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono">{siteConfig.contact.phoneRaw}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hello LA INFRACON, I would like more information about Palm Corridor.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Social Channels (Instagram, Facebook, YouTube only) */}
              <div className="flex items-center justify-center gap-4 pt-2">
                {siteConfig.socialLinks.instagram && (
                  <a
                    href={siteConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-sand/50 text-black hover:bg-black hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socialLinks.facebook && (
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-sand/50 text-black hover:bg-black hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.socialLinks.youtube && (
                  <a
                    href={siteConfig.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border border-sand/50 text-black hover:bg-black hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="text-center text-[10px] text-taupe font-mono uppercase tracking-widest pt-1">
                {siteConfig.brand.tagline}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
