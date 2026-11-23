import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config/siteConfig';
import { preloadHeroFrames } from '../../utils/frameLoader';

export default function Preloader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  useEffect(() => {
    let minTimePassed = false;
    let criticalLoaded = false;

    const timer = setTimeout(() => {
      minTimePassed = true;
      if (criticalLoaded) {
        finish();
      }
    }, 800);

    const finish = () => {
      setIsFinished(true);
      setTimeout(() => {
        setIsReadyToExit(true);
        if (onLoaded) onLoaded();
      }, 500);
    };

    preloadHeroFrames(
      (pct) => {
        setProgress(pct);
      },
      () => {
        criticalLoaded = true;
        if (minTimePassed) {
          finish();
        }
      }
    );

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      finish();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isReadyToExit && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ivory text-black select-none overflow-hidden"
        >
          {/* Subtle warm beige ambient backdrop */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-sand/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Logo in black */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-6"
            >
              <div className="h-16 sm:h-20 flex items-center justify-center">
                <img
                  src={siteConfig.brand.logoBlack}
                  alt={siteConfig.brand.name}
                  className="h-full w-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Brand Name & Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-black"
            >
              {siteConfig.brand.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-taupe mt-1 mb-8"
            >
              {siteConfig.brand.tagline}
            </motion.p>

            {/* Thin Black Progress Track & Line */}
            <div className="w-48 sm:w-56 h-[1.5px] bg-sand/30 rounded-full overflow-hidden relative mb-3">
              <motion.div
                className="h-full bg-black"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>

            {/* Black Percentage Counter */}
            <div className="flex items-center justify-between w-48 sm:w-56 text-[11px] font-mono text-black">
              <span className="tracking-widest uppercase text-taupe">Loading Experience</span>
              <span className="font-semibold">{progress}%</span>
            </div>
          </div>

          {/* Project Subtle Tag */}
          <div className="absolute bottom-8 text-[11px] uppercase tracking-[0.3em] text-taupe font-mono">
            {siteConfig.project.name} &bull; Plotted Living
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
