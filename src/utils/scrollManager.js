import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tickerCallback = null;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (!lenis) {
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

    lenis = new Lenis({
      duration: isTouchDevice ? 0.85 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: true, // Syncs with native touch scroll on mobile without locking
      touchMultiplier: 1.0, // Natural 1:1 touch response
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    tickerCallback = (time) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Use default GSAP lag smoothing to allow smooth recovery from minor frame drops on mobile
    gsap.ticker.lagSmoothing(500, 33);
  }

  return lenis;
};

export const getLenis = () => lenis;

export const destroySmoothScroll = () => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

export const scrollToTarget = (target, offset = -96) => {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};
