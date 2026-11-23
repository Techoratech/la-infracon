import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function GrowthSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [count, setCount] = useState(1.0);
  const [activeDataIndex, setActiveDataIndex] = useState(4);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 2000;
    const target = siteConfig.growth.multiplier;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = 1.0 + (target - 1.0) * easedProgress;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView]);

  const points = siteConfig.growth.dataPoints;

  const chartPoints = [
    { x: 70, y: 210 },
    { x: 210, y: 165 },
    { x: 350, y: 120 },
    { x: 490, y: 75 },
    { x: 630, y: 30 },
  ];

  const svgPath = `M ${chartPoints[0].x},${chartPoints[0].y} ` +
    `C 130,195 160,180 ${chartPoints[1].x},${chartPoints[1].y} ` +
    `C 260,150 300,135 ${chartPoints[2].x},${chartPoints[2].y} ` +
    `C 400,105 440,90 ${chartPoints[3].x},${chartPoints[3].y} ` +
    `C 540,60 580,45 ${chartPoints[4].x},${chartPoints[4].y}`;

  const areaPath = `${svgPath} L 630,240 L 70,240 Z`;

  return (
    <section
      id="growth"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-black text-white overflow-hidden border-t border-b border-sand/20"
    >
      {/* Subtle warm beige ambient backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-sand/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-sand/30 text-sand-light text-xs uppercase tracking-[0.2em] mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-sand" />
            <span>{siteConfig.growth.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            <span className="text-sand-light">3.64x GROWTH</span> IN 4 YEARS
          </h2>

          <p className="mt-4 text-sm sm:text-base text-sand/80 leading-relaxed font-light">
            {siteConfig.growth.description}
          </p>
        </div>

        {/* Growth Stats Feature Card with Chart */}
        <div className="card-luxury-dark rounded-3xl p-6 sm:p-10 border border-sand/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Big Counter Display */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-sand/20 pb-8 lg:pb-0 lg:pr-8">
              <span className="text-xs uppercase tracking-[0.25em] text-sand font-mono">
                Historical Appreciation
              </span>

              <div className="flex items-baseline gap-1 my-3">
                <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                  {count.toFixed(2)}
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-sand">x</span>
              </div>

              <div className="inline-flex items-center gap-2 text-white bg-white/10 border border-sand/30 px-3.5 py-1 rounded-full text-xs font-mono font-medium mb-4">
                <ArrowUpRight className="w-4 h-4 text-sand" />
                <span>+264% Capital Surge</span>
              </div>

              <p className="text-xs sm:text-sm text-sand/80 leading-relaxed font-light">
                {points[activeDataIndex].year}: <span className="text-white font-medium">{points[activeDataIndex].label}</span> — Registered valuation at <strong className="text-white font-semibold">{points[activeDataIndex].formattedVal}</strong> ({points[activeDataIndex].rate}).
              </p>

              <div className="mt-6 pt-6 border-t border-sand/15 w-full flex items-center justify-between text-xs text-sand/70">
                <span>Growth Phase</span>
                <span className="text-white font-mono font-medium">{siteConfig.growth.timelineYears}</span>
              </div>
            </div>

            {/* Right Column: Interactive Line Chart */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-sand">
                  Value Multiplier Trajectory
                </span>
                <span className="text-[11px] font-mono text-sand/80 bg-white/5 px-2.5 py-1 rounded border border-sand/20">
                  Hover points to inspect
                </span>
              </div>

              {/* Chart SVG */}
              <div className="w-full relative aspect-[16/7] sm:aspect-[16/6] bg-black/70 rounded-2xl p-2 sm:p-4 border border-sand/15 overflow-visible">
                <svg
                  viewBox="0 0 700 260"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Beige Fill Gradient under line */}
                    <linearGradient id="growthBeigeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#CDBFA8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#CDBFA8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line x1="50" y1="30" x2="650" y2="30" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />
                  <line x1="50" y1="120" x2="650" y2="120" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />
                  <line x1="50" y1="210" x2="650" y2="210" stroke="rgba(205,191,168,0.15)" strokeDasharray="3 3" />

                  {/* Y-axis labels */}
                  <text x="40" y="34" fill="rgba(205,191,168,0.6)" fontSize="11" textAnchor="end" fontFamily="monospace">3.64x</text>
                  <text x="40" y="124" fill="rgba(205,191,168,0.6)" fontSize="11" textAnchor="end" fontFamily="monospace">2.25x</text>
                  <text x="40" y="214" fill="rgba(205,191,168,0.6)" fontSize="11" textAnchor="end" fontFamily="monospace">1.00x</text>

                  {/* Area Fill under the line */}
                  <motion.path
                    d={areaPath}
                    fill="url(#growthBeigeGradient)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />

                  {/* Ivory/White Spline Line */}
                  <motion.path
                    d={svgPath}
                    fill="none"
                    stroke="#FAF7F2"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  />

                  {/* Nodes */}
                  {chartPoints.map((pt, i) => {
                    const isSelected = activeDataIndex === i;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveDataIndex(i)}
                        onClick={() => setActiveDataIndex(i)}
                      >
                        {isSelected && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="12"
                            fill="rgba(255,255,255,0.15)"
                            className="animate-ping"
                          />
                        )}

                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "8" : "5"}
                          fill="#0B0B0B"
                          stroke={isSelected ? "#FFFFFF" : "#CDBFA8"}
                          strokeWidth="2"
                        />

                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "3.5" : "2"}
                          fill="#FFFFFF"
                        />

                        {/* Value Tag */}
                        <text
                          x={pt.x}
                          y={pt.y - 14}
                          fill={isSelected ? "#FFFFFF" : "#CDBFA8"}
                          fontSize={isSelected ? "12" : "11"}
                          fontWeight={isSelected ? "bold" : "normal"}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {points[i].formattedVal}
                        </text>

                        {/* Year Label */}
                        <text
                          x={pt.x}
                          y="252"
                          fill={isSelected ? "#FFFFFF" : "rgba(205,191,168,0.7)"}
                          fontSize="11"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {points[i].year}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Year Selectors */}
              <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-4">
                {points.map((p, idx) => (
                  <button
                    key={p.year}
                    onClick={() => setActiveDataIndex(idx)}
                    className={`py-2 px-1 rounded-xl text-center transition-all ${
                      activeDataIndex === idx
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'bg-white/5 border border-sand/20 text-sand hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider">{p.year}</div>
                    <div className="text-xs font-mono">{p.formattedVal}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Highlights Ribbon */}
          <div className="mt-8 pt-8 border-t border-sand/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {siteConfig.growth.highlights.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {item.title}
                </span>
                <span className="text-xs text-sand uppercase tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Editable Note */}
        <p className="text-center text-[11px] text-taupe mt-4 tracking-wide italic">
          {siteConfig.growth.disclaimer}
        </p>

      </div>
    </section>
  );
}
