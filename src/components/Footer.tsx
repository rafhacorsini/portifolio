'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: '01/ LINKEDIN', url: 'https://linkedin.com/in/rafhael-corsini-084392323' },
  { label: '02/ GITHUB', url: 'https://github.com/rafhacorsini' },
  { label: '03/ WHATSAPP', url: 'https://wa.me/5513981107358' },
  { label: '04/ INSTAGRAM', url: 'https://instagram.com' },
];

export default function Footer() {
  const { lenis } = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 20, opacity: 0.5 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="sticky bottom-0 z-10 w-full min-h-[520px] sm:min-h-[580px] md:h-screen md:max-h-[720px] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-10 md:py-12 select-none overflow-hidden text-[#e8f0ef]"
      style={{
        background:
          'radial-gradient(ellipse 85% 75% at 50% 45%, #627576 0%, #536465 50%, #3e4d4e 100%)',
      }}
    >
      <div className="grain-cv pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-overlay opacity-[0.35]">
        <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
          <svg className="w-full h-full">
            <filter id="footerNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#footerNoise)" />
          </svg>
        </div>
      </div>

      <div className="texture-blueprint pointer-events-none absolute inset-0 z-0 opacity-40" />

      <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-300/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-300/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-300/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-300/40 select-none">
        +
      </div>

      <div
        ref={headerRef}
        className="relative z-10 w-full flex items-center justify-between pb-6 border-b border-white/[0.08]"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <span className="font-sans font-light text-2xl sm:text-3xl text-zinc-300/80 leading-none tracking-tight">
            07
          </span>
          <div className="flex flex-col justify-center">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-zinc-300 uppercase [writing-mode:vertical-lr] rotate-180">
              /fim
            </span>
          </div>
        </div>
        <div className="flex-1 h-px bg-white/[0.08] mx-4 sm:mx-8 md:mx-10" />
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-zinc-300 uppercase shrink-0 font-medium">
          /CRÉDITOS
        </div>
      </div>

      <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10">
        <div className="flex items-center gap-2 font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-3 sm:mb-4">
          <span>[</span>
          <span className="text-white font-medium">DESIGN & CREATIVE ENGINEERING</span>
          <span>]</span>
        </div>

        <h2
          ref={titleRef}
          className="font-sans font-extrabold text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] lg:text-[6.8vw] leading-[0.9] tracking-[-0.04em] uppercase text-white drop-shadow-lg whitespace-nowrap will-change-transform"
        >
          RAFHAEL CORSINI
        </h2>

        <p className="font-mono text-[8px] sm:text-[9.5px] tracking-[0.24em] uppercase text-zinc-300/80 mt-4 max-w-[500px]">
          CRIATIVO & DESENVOLVEDOR FRONT-END · BRASIL
        </p>
      </div>

      <div
        ref={bottomRef}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-zinc-300 border-t border-white/[0.08] pt-5 sm:pt-6"
      >
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          {SOCIAL_LINKS.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <div data-parallax="0.15" className="hidden lg:block text-zinc-400">
          <span>SANTOS / SP · 23°57&apos;S 46°20&apos;W</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-400">© 2026</span>
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-1.5 text-white hover:text-zinc-200 transition-colors cursor-pointer py-1 px-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 active:scale-95"
          >
            <span>VOLTAR AO TOPO</span>
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
