import { siteConfig } from '../config/siteConfig';

// In-memory cache for decoded images
export const frameCache = {
  isMobile: false,
  desktopFrames: [],
  mobileFrames: [],
  isCriticalLoaded: false,
  allLoaded: false,
};

export const checkIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Preload hero sequence frames
 * @param {Function} onProgress - Callback with percentage (0 to 100)
 * @param {Function} onCriticalReady - Callback when first 20 frames are ready
 */
export const preloadHeroFrames = (onProgress, onCriticalReady) => {
  if (typeof window === 'undefined') return;

  const isMobile = checkIsMobile();
  frameCache.isMobile = isMobile;

  const totalFrames = isMobile ? siteConfig.heroFrames.mobileCount : siteConfig.heroFrames.desktopCount;
  const getPath = isMobile ? siteConfig.heroFrames.mobilePath : siteConfig.heroFrames.desktopPath;
  const criticalCount = Math.min(siteConfig.heroFrames.preloadCriticalCount, totalFrames);

  const targetArray = isMobile ? frameCache.mobileFrames : frameCache.desktopFrames;
  let loadedCritical = 0;
  let criticalReported = false;

  // Preload critical first
  const loadFrame = (index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getPath(index);
      img.onload = () => {
        targetArray[index - 1] = img;
        resolve(img);
      };
      img.onerror = () => {
        // Fallback placeholder or resolve anyway
        targetArray[index - 1] = null;
        resolve(null);
      };
    });
  };

  // Load first batch for preloader display
  const criticalPromises = [];
  for (let i = 1; i <= criticalCount; i++) {
    const p = loadFrame(i).then(() => {
      loadedCritical++;
      const percent = Math.round((loadedCritical / criticalCount) * 100);
      if (onProgress) onProgress(percent);
    });
    criticalPromises.push(p);
  }

  Promise.all(criticalPromises).then(() => {
    frameCache.isCriticalLoaded = true;
    if (onCriticalReady && !criticalReported) {
      criticalReported = true;
      onCriticalReady();
    }

    // Continue background loading remaining frames progressively
    let remainingIndex = criticalCount + 1;
    const loadNextRemaining = () => {
      if (remainingIndex <= totalFrames) {
        loadFrame(remainingIndex).then(() => {
          remainingIndex++;
          // Use requestIdleCallback or setTimeout to avoid thrashing CPU
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextRemaining, { timeout: 200 });
          } else {
            setTimeout(loadNextRemaining, 20);
          }
        });
      } else {
        frameCache.allLoaded = true;
      }
    };

    loadNextRemaining();
  });
};
