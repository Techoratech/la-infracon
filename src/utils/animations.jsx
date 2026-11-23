import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * useReveal - Fade-up animation triggered at 85% viewport
 * y: 40 -> 0, opacity: 0 -> 1, 0.9s, ease power3.out
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion() || isMobileDevice()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: options.y || 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.9,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.y, options.duration, options.delay, options.start]);

  return ref;
}

/**
 * useSplitReveal - Headings split into words, sliding up from masked overflow, staggered 0.08s
 */
export function useSplitReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (isReducedMotion() || isMobileDevice()) {
      const words = container.querySelectorAll('.split-word');
      gsap.set(words, { y: '0%', opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const words = container.querySelectorAll('.split-word');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          {
            y: '110%',
            opacity: 0,
          },
          {
            y: '0%',
            opacity: 1,
            duration: options.duration || 0.85,
            stagger: options.stagger || 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: options.start || 'top 85%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [options.duration, options.stagger, options.start]);

  return ref;
}

/**
 * Helper to wrap text into words with masked overflow for useSplitReveal
 */
export function SplitText({ children, className = '' }) {
  if (typeof children !== 'string') return <span className={className}>{children}</span>;

  const words = children.split(' ');
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] pb-[0.08em]">
          <span className="split-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * useParallax - Image moves slower than scroll (-8% to +8%)
 */
export function useParallax(speed = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isReducedMotion() || isMobileDevice()) {
      gsap.set(el, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * useClipReveal - Image reveal with clip-path inset(100% 0 0 0) -> inset(0), slight scale 1.15 -> 1
 */
export function useClipReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isReducedMotion() || isMobileDevice()) {
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
      const img = el.querySelector('img');
      if (img) gsap.set(img, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const img = el.querySelector('img');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 82%',
          once: true,
        },
      });

      tl.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: options.duration || 1.1,
          ease: 'power3.inOut',
        }
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: options.duration || 1.1,
            ease: 'power3.out',
          },
          0
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options.duration, options.start]);

  return containerRef;
}

/**
 * useStagger - Children appear one after another (0.1s stagger)
 */
export function useStagger(childSelector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(childSelector);
    if (items.length === 0) return;

    if (isReducedMotion() || isMobileDevice()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: options.y || 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          stagger: options.stagger || 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: options.start || 'top 80%',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [childSelector, options.y, options.duration, options.stagger, options.start]);

  return containerRef;
}

/**
 * useLineDraw - Line draws itself with scaleX scrubbed or triggered by scroll
 */
export function useLineDraw(options = {}) {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    if (isReducedMotion() || isMobileDevice()) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: options.origin || 'left center' },
        {
          scaleX: 1,
          duration: options.duration || 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            scrub: options.scrub ?? false,
            once: !options.scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.duration, options.origin, options.start, options.scrub]);

  return lineRef;
}

/**
 * SectionDivider - Thin sand divider line that draws itself on scroll
 */
export function SectionDivider({ className = '' }) {
  const lineRef = useLineDraw({ scrub: true, start: 'top 90%' });
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
      <div
        ref={lineRef}
        className="w-full h-[1px] bg-sand/40 will-change-transform"
      />
    </div>
  );
}
