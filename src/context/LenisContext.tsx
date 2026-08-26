'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Touch devices already have buttery, OS-accelerated momentum scrolling
    // running off the main thread. Lenis re-implements scroll in JS on top of
    // that — on older/weaker phones (this is the classic iOS Safari complaint)
    // that JS-driven scroll can't keep up with native and the whole page reads
    // as janky, everywhere, all the time, not tied to any one section. So on
    // coarse pointers we skip Lenis entirely and let the OS scroll natively;
    // ScrollTrigger works fine off native scroll on its own, no Lenis needed.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (!prefersReducedMotion && !isTouchDevice) {
      lenis = new Lenis({
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.25,
        infinite: false,
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLenisInstance(lenis);

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis!.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    let parallaxTriggers: ScrollTrigger[] = [];

    const setupParallaxElements = () => {
      parallaxTriggers.forEach((t) => t.kill());
      parallaxTriggers = [];

      const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax], [data-speed]');
      parallaxElements.forEach((el) => {
        const speedAttr = el.getAttribute('data-parallax') || el.getAttribute('data-speed') || '0.15';
        const speed = parseFloat(speedAttr);
        if (isNaN(speed)) return;

        const distance = speed * 120;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const y = (self.progress - 0.5) * distance * -1;
            gsap.set(el, { y, willChange: 'transform' });
          },
        });

        parallaxTriggers.push(trigger);
      });
    };

    setupParallaxElements();

    let refreshFrame = 0;
    const syncScrollHeight = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
        setupParallaxElements();
      });
    };

    const resizeObserver = new ResizeObserver(syncScrollHeight);
    resizeObserver.observe(document.body);
    window.addEventListener('load', syncScrollHeight);

    return () => {
      cancelAnimationFrame(refreshFrame);
      resizeObserver.disconnect();
      window.removeEventListener('load', syncScrollHeight);
      parallaxTriggers.forEach((t) => t.kill());
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
};
