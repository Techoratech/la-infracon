import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Compass, Scale, Clock, Award, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import {
  useSplitReveal,
  SplitText,
  useClipReveal,
  useParallax,
  useStagger,
  SectionDivider,
  isReducedMotion,
} from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const headingRef = useSplitReveal({ stagger: 0.06 });
  const paragraphsRef = useStagger('.about-para', { y: 25, stagger: 0.15 });
  const pillarsRef = useStagger('.pillar-card', { y: 30, stagger: 0.12 });
  const clipRef = useClipReveal({ duration: 1.2 });
  const parallaxImgRef = useParallax(7);
  const borderFrameRef = useRef(null);

  useEffect(() => {
    const frame = borderFrameRef.current;
    if (!frame || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { strokeDashoffset: 1200 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  const getPillarIcon = (index) => {
    const props = { className: 'w-5 h-5 text-black' };
    switch (index) {
      case 0:
        return <ShieldCheck {...props} />;
      case 1:
        return <Compass {...props} />;
      case 2:
        return <Scale {...props} />;
      case 3:
      default:
        return <Clock {...props} />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-ivory text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4 w-fit">
              <Award className="w-3.5 h-3.5 text-black" />
              <span>{siteConfig.about.tagline}</span>
            </div>

            {/* Split text heading word-by-word reveal */}
            <h2
              ref={headingRef}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
            >
              <SplitText>Building Dreams,</SplitText>{' '}
              <span className="text-taupe-dark font-normal italic inline-block">
                <SplitText>Creating Legacies</SplitText>
              </span>
            </h2>

            {/* Paragraphs with line-by-line staggered fade up */}
            <div ref={paragraphsRef} className="space-y-4 text-black/80 text-sm sm:text-base leading-relaxed font-light mb-8">
              {siteConfig.about.storyParagraphs.map((para, idx) => (
                <p key={idx} className="about-para will-change-transform">
                  {para}
                </p>
              ))}
            </div>

            {/* Four Pillars Grid with stagger and icon pop */}
            <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand/40">
              {siteConfig.about.pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="pillar-card p-5 rounded-2xl bg-white border border-sand/50 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 will-change-transform"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-beige-light border border-sand/60">
                      {getPillarIcon(idx)}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-black tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-taupe leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Frame with border draw, clip-reveal and parallax image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer drawing SVG border */}
              <div className="absolute -inset-3.5 pointer-events-none -z-10">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 135"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <rect
                    ref={borderFrameRef}
                    x="2"
                    y="2"
                    width="96"
                    height="131"
                    rx="14"
                    stroke="#CDBFA8"
                    strokeWidth="1"
                    strokeDasharray="1200"
                    strokeDashoffset="0"
                  />
                </svg>
              </div>

              {/* Arch Card Container with clip-path reveal */}
              <div
                ref={clipRef}
                className="relative rounded-t-[130px] rounded-b-2xl overflow-hidden border border-sand/70 shadow-luxury aspect-[3/4] bg-beige will-change-transform"
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    ref={parallaxImgRef}
                    src={siteConfig.about.image}
                    alt="Palm Corridor Avenue"
                    className="w-full h-[120%] -mt-[10%] object-cover will-change-transform"
                    loading="lazy"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-sand shadow-luxury-sm text-black">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-beige border border-sand flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black font-semibold">
                        Gated & Master-Planned
                      </div>
                      <div className="text-[11px] text-taupe font-light">
                        Palm Corridor Plotted Sanctuary
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Flairs */}
              <div className="absolute -top-2 -right-2 w-7 h-7 border-t border-r border-black" />
              <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b border-l border-black" />
            </div>
          </div>

        </div>

      </div>

      {/* Thin drawing section divider */}
      <SectionDivider className="mt-20 max-w-7xl mx-auto px-4" />
    </section>
  );
}
