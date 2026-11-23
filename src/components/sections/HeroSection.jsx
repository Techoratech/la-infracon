import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, ArrowRight, Compass } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { frameCache, checkIsMobile } from '../../utils/frameLoader';
import { scrollToTarget } from '../../utils/scrollManager';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onOpenEnquiry }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(reduced);

    if (reduced) return;

    const isMobile = checkIsMobile();
    const totalFrames = isMobile ? siteConfig.heroFrames.mobileCount : siteConfig.heroFrames.desktopCount;
    const targetFrames = isMobile ? frameCache.mobileFrames : frameCache.desktopFrames;
    const getPath = isMobile ? siteConfig.heroFrames.mobilePath : siteConfig.heroFrames.desktopPath;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Smooth Lerp State
    let currentFrame = 0;
    let targetFrame = 0;
    let animId = null;
    let lastRenderedFrame = -1;

    let width = window.innerWidth;
    let height = window.innerHeight;
    // Cap DPR on mobile at 1 for ultra-fast, smooth 60fps rendering without GPU stalls
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      const initialFrame = Math.round(currentFrame);
      renderFrame(initialFrame);
      lastRenderedFrame = initialFrame;
    };

    const renderFrame = (index) => {
      const safeIndex = Math.max(0, Math.min(index, totalFrames - 1));
      let img = targetFrames[safeIndex];

      if (!img) {
        img = new Image();
        img.src = getPath(safeIndex + 1);
        targetFrames[safeIndex] = img;
        img.onload = () => {
          if (Math.round(currentFrame) === safeIndex) {
            renderFrame(safeIndex);
          }
        };
        return;
      }

      if (!img.complete || img.naturalWidth === 0) return;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    renderFrame(0);

    const tick = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.005) {
        currentFrame += diff * (isMobile ? 0.2 : 0.12);
        const frameIndex = Math.round(currentFrame);
        if (frameIndex !== lastRenderedFrame) {
          renderFrame(frameIndex);
          lastRenderedFrame = frameIndex;
        }
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // GSAP ScrollTrigger Scrub for canvas & pin
    const pinDistance = isMobile ? '300%' : '350%';
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      scrub: isMobile ? 0.3 : 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        targetFrame = p * (totalFrames - 1);

        // Subtle scale (1 -> 1.06) on canvas across pin
        const scaleVal = 1 + p * 0.06;
        canvas.style.transform = `scale(${scaleVal})`;

        // Cinematic depth: as the growth section slides up over the hero (p > 0.75),
        // gently dim the background canvas so the overlapping card pops
        if (p > 0.75) {
          const dim = Math.max(0.65, 1 - (p - 0.75) * 1.4);
          canvas.style.filter = `brightness(${dim})`;
        } else {
          canvas.style.filter = 'brightness(1)';
        }
      },
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animId) cancelAnimationFrame(animId);
      st.kill();
    };
  }, []);

  const getPhaseStyle = (enterStart, enterEnd, exitStart, exitEnd) => {
    let opacity = 0;
    let translateY = 20;

    // Phase 1 starts fully visible immediately on page load (at scroll 0)
    if (enterStart <= 0 && scrollProgress <= enterEnd) {
      opacity = 1;
      translateY = 0;
    } else if (scrollProgress >= enterStart && scrollProgress <= enterEnd) {
      const factor = (scrollProgress - enterStart) / (enterEnd - enterStart);
      opacity = factor;
      translateY = 20 * (1 - factor);
    } else if (scrollProgress > enterEnd && scrollProgress < exitStart) {
      opacity = 1;
      translateY = 0;
    } else if (scrollProgress >= exitStart && scrollProgress <= exitEnd) {
      const factor = (scrollProgress - exitStart) / (exitEnd - exitStart);
      opacity = 1 - factor;
      translateY = -20 * factor;
    } else if (scrollProgress > exitEnd) {
      opacity = 0;
      translateY = -20;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.4 ? 'auto' : 'none',
      visibility: opacity <= 0.01 ? 'hidden' : 'visible',
    };
  };

  // Timings:
  // Phase 1 is 100% visible on load, holds until 0.16, exits by 0.24
  // Phase 2 enters 0.25, holds until 0.46, exits by 0.54
  // Phase 3 enters 0.56, holds until 0.74, exits by 0.82
  const phase1Style = getPhaseStyle(0.0, 0.16, 0.18, 0.25);
  const phase2Style = getPhaseStyle(0.26, 0.34, 0.46, 0.54);
  const phase3Style = getPhaseStyle(0.56, 0.64, 0.74, 0.82);

  const scrollIndicatorOpacity = Math.max(0, 1 - scrollProgress * 15);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full ${
        isReducedMotion ? 'min-h-[100svh]' : 'h-[100svh]'
      } overflow-hidden bg-black transition-opacity duration-300`}
    >
      {/* Background Canvas or Reduced Motion Fallback */}
      {isReducedMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${siteConfig.heroFrames.staticFallbackImage})` }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-0 will-change-transform"
        />
      )}

      {/* Soft dark gradient behind text at the bottom */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

      {/* Hero Content Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center pointer-events-none">
        
        {/* Phase 1: Brand Introduction */}
        <div
          style={phase1Style}
          className="absolute flex flex-col items-center text-center max-w-3xl px-4 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-4 backdrop-blur-sm">
            <span>Premium Plotted Sanctuary</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md">
            {siteConfig.brand.name}
          </h1>
          <p className="font-sans text-base sm:text-xl md:text-2xl font-light text-sand-light uppercase tracking-[0.22em] mt-3 sm:mt-4">
            {siteConfig.brand.tagline}
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-sand to-transparent mt-6" />
        </div>

        {/* Phase 2: Project Announcement */}
        <div
          style={phase2Style}
          className="absolute flex flex-col items-center text-center max-w-3xl px-4 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/20 text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-3 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-sand" />
            <span>Master-Planned Community</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
            {siteConfig.project.name}
          </h2>
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-sand-light/95 max-w-xl mt-3 font-normal">
            "{siteConfig.project.subtitle}"
          </p>
          <p className="text-xs sm:text-sm text-sand/90 max-w-lg mt-3 tracking-wide hidden sm:block">
            Gated freehold plots designed with palm-fringed boulevards, underground infrastructure, and curated open greens.
          </p>
        </div>

        {/* Phase 3: Climax CTA & Legacy Statement */}
        <div
          style={phase3Style}
          className="absolute flex flex-col items-center text-center max-w-3xl px-4 transition-all duration-300"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-[11px] sm:text-xs uppercase tracking-[0.25em] mb-4 backdrop-blur-sm">
            <span>Freehold Plotted Development</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            {siteConfig.project.heroHeadline}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-sand-light/90 max-w-lg mt-3 mb-8 font-light">
            Secure your sanctuary in the region's fastest-appreciating residential corridor.
          </p>
          
          {/* Interactive CTAs on Dark Hero */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToTarget('#growth', -96)}
              className="btn-white w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <span>Explore Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                'Hello LA INFRACON, I am interested in exploring Palm Corridor plots. Please send me the brochure and price sheet.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white-outline w-full sm:w-auto px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>

      {/* Scroll indicator: white line */}
      <div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-7 left-0 right-0 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 font-mono">
          Scroll to explore
        </span>
        <div className="w-[1.5px] h-9 bg-white/20 relative overflow-hidden rounded-full">
          <div className="w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
