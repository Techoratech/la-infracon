import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { isReducedMotion } from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function GrowthSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const multiplierRef = useRef(null);
  const surgeRef = useRef(null);
  const lastProgressRef = useRef(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [dotPos, setDotPos] = useState({ x: 80, y: 220 });
  const [progressVal, setProgressVal] = useState(0);

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 260;

  // Start (Year 0) to End (Year 4) smooth curve
  // Year 0 = (80, 220), Year 4 = (640, 40)
  const svgCurve = "M 80,220 C 240,210 380,120 640,40";
  const areaCurve = `${svgCurve} L 640,240 L 80,240 Z`;

  useEffect(() => {
    const el = sectionRef.current;
    const path = pathRef.current;
    if (!el || !path) return;

    if (isReducedMotion()) {
      setMultiplier(siteConfig.growth.endMultiplier);
      if (multiplierRef.current) multiplierRef.current.textContent = siteConfig.growth.endMultiplier.toFixed(2);
      setProgressVal(1);
      return;
    }

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const isMobile = window.innerWidth < 768;
    const pinDistance = isMobile ? '150%' : '200%';

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${pinDistance}`,
      pin: true,
      scrub: isMobile ? 0.3 : 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Scrub number from 1.00 to 3.64 using direct DOM manipulation for 60fps mobile speed
        const currentVal = siteConfig.growth.startMultiplier + (siteConfig.growth.endMultiplier - siteConfig.growth.startMultiplier) * p;
        if (multiplierRef.current) {
          multiplierRef.current.textContent = currentVal.toFixed(2);
        }
        if (surgeRef.current) {
          const surgePct = Math.round((currentVal - 1) * 100);
          surgeRef.current.textContent = `+${surgePct}% Net Appreciation`;
        }

        // Scrub line drawing
        const drawLength = pathLength * p;
        path.style.strokeDashoffset = `${pathLength - drawLength}`;

        // Get dot position at current length
        try {
          const pt = path.getPointAtLength(Math.max(0.1, drawLength));
          setDotPos({ x: pt.x, y: pt.y });
        } catch (e) {
          // fallback
          setDotPos({ x: 80 + 560 * p, y: 220 - 180 * p });
        }

        // Throttled state update for descriptive text to avoid thrashing mobile CPU
        if (Math.abs(p - lastProgressRef.current) > 0.05) {
          lastProgressRef.current = p;
          setProgressVal(p);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="growth"
      ref={sectionRef}
      className="relative z-20 -mt-[100vh] sm:-mt-[100svh] min-h-[100svh] bg-black text-white overflow-hidden flex flex-col justify-center py-16 sm:py-20 rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(0,0,0,0.85)] border-t border-sand/30"
    >
      {/* Luxury Pull-tab Indicator */}
      <div className="w-12 h-1 bg-sand/35 rounded-full mx-auto mb-4 sm:mb-6" />

      {/* Background ambient accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sand/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-sand/30 text-sand-light text-xs uppercase tracking-[0.2em] mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-sand" />
            <span>{siteConfig.growth.badge}</span>
          </div>

          <h2
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white transition-all duration-300"
            style={{
              transform: `scale(${0.96 + progressVal * 0.08})`,
              opacity: 0.75 + progressVal * 0.25,
            }}
          >
            <span className="text-sand-light">{siteConfig.growth.headline}</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-sand/80 leading-relaxed font-light">
            {siteConfig.growth.description}
          </p>
        </div>

        {/* Pinned Scrub Feature Card */}
        <div className="card-luxury-dark rounded-3xl p-6 sm:p-10 border border-sand/25 relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Giant Scrubbed Counter (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-sand/20 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs uppercase tracking-[0.25em] text-sand font-mono">
                Scrubbed Valuation
              </span>

              <div className="flex items-baseline gap-1 my-3 sm:my-4">
                <span
                  ref={multiplierRef}
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white font-mono"
                >
                  {multiplier.toFixed(2)}
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-sand">x</span>
              </div>

              <div className="inline-flex items-center gap-2 text-white bg-white/10 border border-sand/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium mb-4">
                <ArrowUpRight className="w-4 h-4 text-sand" />
                <span ref={surgeRef}>{siteConfig.growth.totalSurge} Net Appreciation</span>
              </div>

              <p className="text-xs sm:text-sm text-sand/80 leading-relaxed font-light">
                {progressVal < 0.2 ? (
                  <span>Initiating valuation at baseline <strong className="text-white">1.00x</strong>.</span>
                ) : progressVal >= 0.9 ? (
                  <span>Verified milestone reached: <strong className="text-white">3.64x</strong> valuation across 4 years.</span>
                ) : (
                  <span>Progressing across infrastructure expansions towards <strong className="text-white">3.64x</strong>.</span>
                )}
              </p>

              <div className="mt-6 pt-5 border-t border-sand/15 w-full flex items-center justify-between text-xs text-sand/70">
                <span>Timeline Period</span>
                <span className="text-white font-mono font-semibold">{siteConfig.growth.timelineYears}</span>
              </div>
            </div>

            {/* Right: SVG Line Chart with scrubbing tip dot (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3 text-xs text-sand">
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  Scroll to draw trajectory
                </span>
                <span className="font-mono text-[11px] bg-white/10 px-2.5 py-0.5 rounded text-white">
                  {Math.round(progressVal * 100)}% Drawn
                </span>
              </div>

              {/* Chart SVG */}
              <div className="w-full relative aspect-[16/7] bg-black/80 rounded-2xl p-2 sm:p-4 border border-sand/20 overflow-visible">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="growthAreaBeige" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CDBFA8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#CDBFA8" stopOpacity="0.0" />
                    </linearGradient>

                    <clipPath id="chartClip">
                      <rect x="0" y="0" width={80 + 560 * progressVal} height="260" />
                    </clipPath>
                  </defs>

                  {/* Horizontal Guideline Grids */}
                  <line x1="60" y1="40" x2="660" y2="40" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />
                  <line x1="60" y1="130" x2="660" y2="130" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />
                  <line x1="60" y1="220" x2="660" y2="220" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />

                  {/* Y-axis labels */}
                  <text x="50" y="44" fill="rgba(205,191,168,0.7)" fontSize="11" textAnchor="end" fontFamily="monospace">3.64x</text>
                  <text x="50" y="134" fill="rgba(205,191,168,0.5)" fontSize="11" textAnchor="end" fontFamily="monospace">2.30x</text>
                  <text x="50" y="224" fill="rgba(205,191,168,0.7)" fontSize="11" textAnchor="end" fontFamily="monospace">1.00x</text>

                  {/* Area fill masked to scroll progress */}
                  <path
                    d={areaCurve}
                    fill="url(#growthAreaBeige)"
                    clipPath="url(#chartClip)"
                  />

                  {/* Spline Path */}
                  <path
                    ref={pathRef}
                    d={svgCurve}
                    fill="none"
                    stroke="#FAF7F2"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Start Point (Year 0) */}
                  <circle cx="80" cy="220" r="5" fill="#0B0B0B" stroke="#CDBFA8" strokeWidth="2" />
                  <circle cx="80" cy="220" r="2.5" fill="#FFFFFF" />
                  <text x="80" y="246" fill="#CDBFA8" fontSize="11" textAnchor="middle" fontFamily="sans-serif">Year 0</text>

                  {/* End Point (Year 4) */}
                  <circle cx="640" cy="40" r="5" fill="#0B0B0B" stroke="#CDBFA8" strokeWidth="2" />
                  <circle cx="640" cy="40" r="2.5" fill="#FFFFFF" />
                  <text x="640" y="246" fill="#CDBFA8" fontSize="11" textAnchor="middle" fontFamily="sans-serif">Year 4</text>

                  {/* Moving Dot Following Line Tip */}
                  {progressVal > 0.02 && (
                    <g transform={`translate(${dotPos.x}, ${dotPos.y})`}>
                      <circle cx="0" cy="0" r="14" fill="rgba(255,255,255,0.18)" className="animate-ping" />
                      <circle cx="0" cy="0" r="7" fill="#0B0B0B" stroke="#FFFFFF" strokeWidth="2.5" />
                      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                      
                      {/* Floating value pill above tip */}
                      <rect x="-26" y="-30" width="52" height="20" rx="4" fill="#FFFFFF" />
                      <text x="0" y="-16" fill="#0B0B0B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {multiplier.toFixed(2)}x
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Verified Start & End Milestones */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 rounded-xl bg-white/5 border border-sand/20 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-sand">Start Valuation</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">{siteConfig.growth.startPoint.value} ({siteConfig.growth.startPoint.year})</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-sand/20 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-sand">Achieved Valuation</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">{siteConfig.growth.endPoint.value} ({siteConfig.growth.endPoint.year})</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-[11px] text-taupe mt-4 tracking-wide italic">
          {siteConfig.growth.disclaimer}
        </p>

      </div>
    </section>
  );
}
