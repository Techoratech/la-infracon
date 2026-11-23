import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';
import { useSplitReveal, SplitText, SectionDivider, isReducedMotion } from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

function AnimatedPlotCard({ plot, index, onSelectPlot }) {
  const cardRef = useRef(null);
  const svgRef = useRef(null);
  const [sizeDisplay, setSizeDisplay] = useState(0);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const card = cardRef.current;
    const svg = svgRef.current;
    if (!card) return;

    const isMobile = window.innerWidth < 768;
    if (isReducedMotion() || isMobile) {
      setSizeDisplay(plot.numericSize);
      gsap.set(card, { opacity: 1, y: 0, rotate: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Rotation settling to 0 with stagger
      const initialRot = index === 0 ? -2.5 : index === 2 ? 2.5 : 0;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          rotate: initialRot,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1.0,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              // Count up size number
              const startVal = { val: 0 };
              gsap.to(startVal, {
                val: plot.numericSize,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => setSizeDisplay(Math.round(startVal.val)),
              });

              // Draw SVG plot boundary lines
              if (svg) {
                const paths = svg.querySelectorAll('rect, line, circle');
                paths.forEach((p) => {
                  try {
                    const len = p.getTotalLength ? p.getTotalLength() : 300;
                    gsap.fromTo(
                      p,
                      { strokeDasharray: len, strokeDashoffset: len },
                      { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 0.2 }
                    );
                  } catch (e) {}
                });
              }
            },
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, [index, plot.numericSize]);

  // 3D tilt on desktop
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024 || isReducedMotion()) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const renderPlotSvg = (id) => {
    switch (id) {
      case '600':
        return (
          <svg ref={svgRef} viewBox="0 0 160 190" className="w-full h-full max-h-32 text-black">
            <rect x="15" y="155" width="130" height="20" fill="rgba(205,191,168,0.18)" rx="3" stroke="#CDBFA8" strokeDasharray="3 3" />
            <text x="80" y="169" fill="#8C7B66" fontSize="8" textAnchor="middle" fontFamily="monospace">FRONTAGE ROAD (30 FT)</text>
            <rect x="35" y="25" width="90" height="120" fill="#FAF7F2" stroke="#0B0B0B" strokeWidth="1.5" rx="4" />
            <text x="80" y="20" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">20 FT</text>
            <text x="25" y="88" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 25 88)">30 FT</text>
            <rect x="42" y="32" width="76" height="106" fill="none" stroke="#CDBFA8" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="80" y="80" fill="#0B0B0B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="serif">PLOT AREA</text>
            <text x="80" y="95" fill="#8C7B66" fontSize="10" textAnchor="middle" fontFamily="sans-serif">600 SQ.FT</text>
            <circle cx="112" cy="40" r="7" fill="#FFFFFF" stroke="#0B0B0B" />
            <text x="112" y="43" fill="#0B0B0B" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
          </svg>
        );
      case '800':
        return (
          <svg ref={svgRef} viewBox="0 0 160 210" className="w-full h-full max-h-32 text-black">
            <rect x="15" y="175" width="130" height="20" fill="rgba(205,191,168,0.22)" rx="3" stroke="#CDBFA8" strokeDasharray="3 3" />
            <text x="80" y="189" fill="#8C7B66" fontSize="8" textAnchor="middle" fontFamily="monospace">FRONTAGE ROAD (30 FT)</text>
            <rect x="38" y="20" width="84" height="145" fill="#FAF7F2" stroke="#0B0B0B" strokeWidth="2" rx="4" />
            <text x="80" y="15" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">20 FT</text>
            <text x="26" y="95" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 26 95)">40 FT</text>
            <rect x="45" y="27" width="70" height="131" fill="none" stroke="#CDBFA8" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="80" y="85" fill="#0B0B0B" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="serif">PLOT AREA</text>
            <text x="80" y="100" fill="#8C7B66" fontSize="10" textAnchor="middle" fontFamily="sans-serif">800 SQ.FT</text>
            <circle cx="108" cy="35" r="7" fill="#FFFFFF" stroke="#0B0B0B" />
            <text x="108" y="38" fill="#0B0B0B" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
          </svg>
        );
      case '1000':
      default:
        return (
          <svg ref={svgRef} viewBox="0 0 160 190" className="w-full h-full max-h-32 text-black">
            <rect x="15" y="155" width="130" height="20" fill="rgba(205,191,168,0.18)" rx="3" stroke="#CDBFA8" strokeDasharray="3 3" />
            <text x="80" y="169" fill="#8C7B66" fontSize="8" textAnchor="middle" fontFamily="monospace">BOULEVARD ROAD (40 FT)</text>
            <rect x="30" y="22" width="100" height="123" fill="#FAF7F2" stroke="#0B0B0B" strokeWidth="1.5" rx="4" />
            <text x="80" y="17" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">25 FT</text>
            <text x="20" y="88" fill="#0B0B0B" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 20 88)">40 FT</text>
            <rect x="37" y="29" width="86" height="109" fill="none" stroke="#CDBFA8" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="80" y="78" fill="#0B0B0B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="serif">PLOT AREA</text>
            <text x="80" y="93" fill="#8C7B66" fontSize="10" textAnchor="middle" fontFamily="sans-serif">1000 SQ.FT</text>
            <circle cx="116" cy="36" r="7" fill="#FFFFFF" stroke="#0B0B0B" />
            <text x="116" y="39" fill="#0B0B0B" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
          </svg>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-white text-black shadow-luxury transition-all duration-300 will-change-transform w-[86vw] max-w-[340px] md:max-w-none md:w-auto shrink-0 snap-center ${
        plot.popular ? 'border-2 border-black' : 'border border-black/15'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-taupe font-bold px-2.5 py-1 rounded-md bg-beige-light border border-sand">
            {`0${index + 1}`} &bull; {plot.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {plot.status}
          </span>
        </div>

        {plot.popular && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-sand-light text-black font-sans mb-3">
            <Sparkles className="w-3 h-3 text-black" />
            <span>Featured Configuration</span>
          </div>
        )}

        {/* Counted Size Display */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif text-4xl sm:text-5xl font-bold text-black font-mono">
              {sizeDisplay}
            </h3>
            <span className="text-xl sm:text-2xl font-serif text-taupe">
              {plot.unit}
            </span>
          </div>
          <div className="text-xs uppercase tracking-wider text-taupe font-mono mt-1">
            Plot Dimensions: <span className="text-black font-semibold">{plot.dimensions}</span>
          </div>
        </div>

        {/* SVG Proportion Outline with stroke drawing */}
        <div className="my-5 p-3 rounded-2xl bg-ivory border border-sand/50 flex items-center justify-center">
          {renderPlotSvg(plot.id)}
        </div>

        {/* Features */}
        <div className="space-y-2.5 mb-6">
          {plot.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-black/80 font-light">
              <div className="w-4 h-4 rounded-full bg-beige border border-sand flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-black" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button with auto scroll & plot preselection */}
      <div className="pt-5 border-t border-sand/30">
        <p className="text-[11px] text-taupe italic mb-4">
          <strong className="text-black not-italic font-medium">Ideal For: </strong>
          {plot.idealFor}
        </p>

        <button
          onClick={() => onSelectPlot(plot.size)}
          className="btn-black w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
        >
          <span>Enquire for {plot.size} sq.ft</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function PlotAvailabilitySection({ onSelectPlot }) {
  const headingRef = useSplitReveal({ stagger: 0.07 });

  const handlePlotEnquire = (size) => {
    if (onSelectPlot) {
      onSelectPlot(size);
    }
    scrollToTarget('#contact', -96);
  };

  return (
    <section
      id="plots"
      className="relative py-24 sm:py-32 bg-beige text-black overflow-hidden border-t border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with SplitText */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Compass className="w-3.5 h-3.5 text-black" />
            <span>Tailored Land Parcels</span>
          </div>

          <h2
            ref={headingRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black"
          >
            <SplitText>Plot Size</SplitText>{' '}
            <span className="text-taupe-dark font-normal italic inline-block">
              <SplitText>Availability</SplitText>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed font-light">
            Choose from three meticulously demarcated plot configurations engineered for luxury villa construction, unhindered ventilation, and immediate capital growth.
          </p>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="md:hidden flex items-center justify-end gap-1.5 text-[11px] font-mono text-taupe mb-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-sand/30 border border-sand/50">
            ← Swipe plot sizes →
          </span>
        </div>

        {/* 3 Animated Rising Cards: Horizontal swipe on mobile, 3-column grid on desktop */}
        <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 items-stretch -mx-4 px-4 sm:mx-0 sm:px-0">
          {siteConfig.plotSizes.map((plot, idx) => (
            <AnimatedPlotCard
              key={plot.id}
              plot={plot}
              index={idx}
              onSelectPlot={handlePlotEnquire}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-taupe">
          All plots feature individual boundary markers, water tap-in points, and direct avenue frontage.
        </div>

      </div>

      <SectionDivider className="mt-20 max-w-7xl mx-auto px-4" />
    </section>
  );
}
