'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { num: '01', label: 'LINKEDIN', url: 'https://linkedin.com/in/rafhael-corsini-084392323' },
  { num: '02', label: 'GITHUB', url: 'https://github.com/rafhacorsini' },
  { num: '03', label: 'WHATSAPP', url: 'https://wa.me/5513981107358' },
  { num: '04', label: 'INSTAGRAM', url: 'https://instagram.com' },
];

const EMAIL_ADDRESS = 'rafhaelcorsini@gmail.com';
const WHATSAPP_URL = 'https://wa.me/5513981107358';
const CV_FILE = '/curriculo.html';

export default function Contact() {
  const { lenis } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);

  const manifestoHeaderRef = useRef<HTMLDivElement>(null);
  const manifestoHeaderLineRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const centerAccentRef = useRef<HTMLDivElement>(null);
  const tagLeftRef = useRef<HTMLDivElement>(null);
  const tagRightRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const stage2Ref = useRef<HTMLDivElement>(null);
  const zoomTextRef = useRef<HTMLDivElement>(null);
  const whiteCurtainRef = useRef<HTMLDivElement>(null);

  const contactWrapperRef = useRef<HTMLDivElement>(null);
  const contactHeaderRef = useRef<HTMLDivElement>(null);
  const contactMainRef = useRef<HTMLDivElement>(null);
  const contactDetailsRef = useRef<HTMLDivElement>(null);
  const contactFooterRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleScrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.5 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (manifestoHeaderRef.current) gsap.set(manifestoHeaderRef.current.children, { opacity: 0, y: -14 });
      if (manifestoHeaderLineRef.current) gsap.set(manifestoHeaderLineRef.current, { scaleX: 0, transformOrigin: 'left' });
      if (tagLeftRef.current) gsap.set(tagLeftRef.current, { opacity: 0, x: -15 });
      if (tagRightRef.current) gsap.set(tagRightRef.current, { opacity: 0, x: 15 });
      if (line1Ref.current) gsap.set(line1Ref.current, { opacity: 0, xPercent: -22 });
      if (line2Ref.current) gsap.set(line2Ref.current, { opacity: 0, xPercent: 22 });
      if (centerAccentRef.current) gsap.set(centerAccentRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'left' });
      if (bottomBarRef.current) gsap.set(bottomBarRef.current, { opacity: 0, y: 15 });
      if (stage2Ref.current) gsap.set(stage2Ref.current, { opacity: 0, scale: 0.9 });
      if (zoomTextRef.current) gsap.set(zoomTextRef.current, { scale: 0.25, opacity: 1, transformOrigin: 'center center' });
      if (whiteCurtainRef.current) gsap.set(whiteCurtainRef.current, { opacity: 0 });

      if (contactWrapperRef.current) gsap.set(contactWrapperRef.current, { opacity: 0, y: 25, pointerEvents: 'none' });

      if (prefersReducedMotion) {
        if (whiteCurtainRef.current) gsap.set(whiteCurtainRef.current, { opacity: 1 });
        if (contactWrapperRef.current) gsap.set(contactWrapperRef.current, { opacity: 1, y: 0, pointerEvents: 'auto' });
        return;
      }

      let scrollBuilt = false;
      const buildScrollChoreography = () => {
        if (scrollBuilt) return;
        scrollBuilt = true;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        if (line1Ref.current && line2Ref.current) {
          scrollTl
            .to(line1Ref.current, { xPercent: -60, opacity: 0, ease: 'power2.in', duration: 0.55 }, 0.5)
            .to(line2Ref.current, { xPercent: 60, opacity: 0, ease: 'power2.in', duration: 0.55 }, 0.5);
        }
        if (centerAccentRef.current) {
          scrollTl.to(centerAccentRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.5);
        }
        if (tagLeftRef.current && tagRightRef.current) {
          scrollTl.to([tagLeftRef.current, tagRightRef.current], { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.5);
        }
        if (stage1Ref.current) {
          scrollTl.to(stage1Ref.current, { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' }, 0.75);
        }

        if (stage2Ref.current) {
          scrollTl.to(stage2Ref.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 1.25);
        }
        if (manifestoHeaderRef.current && bottomBarRef.current) {
          scrollTl.to([manifestoHeaderRef.current, bottomBarRef.current], { opacity: 0, duration: 0.45, ease: 'power2.in' }, 1.35);
        }

        if (zoomTextRef.current) {
          scrollTl.to(zoomTextRef.current, { scale: 8.5, opacity: 0.95, ease: 'power2.in', duration: 1.1 }, 2.0);
        }
        if (whiteCurtainRef.current) {
          scrollTl.to(whiteCurtainRef.current, { opacity: 1, ease: 'power2.in', duration: 0.65 }, 2.5);
        }
        if (stage2Ref.current) {
          scrollTl.to(stage2Ref.current, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 2.9);
        }

        if (contactWrapperRef.current) {
          scrollTl.to(
            contactWrapperRef.current,
            {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: 0.8,
            },
            3.0
          );
        }

        ScrollTrigger.refresh();
      };

      const entrance = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
        onComplete: buildScrollChoreography,
      });

      if (manifestoHeaderRef.current) {
        entrance.to(manifestoHeaderRef.current.children, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
      }
      if (manifestoHeaderLineRef.current) {
        entrance.to(manifestoHeaderLineRef.current, { scaleX: 1, duration: 0.7, ease: 'expo.out' }, '-=0.3');
      }
      if (tagLeftRef.current) {
        entrance.to(tagLeftRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25');
      }
      if (tagRightRef.current) {
        entrance.to(tagRightRef.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<');
      }
      if (line1Ref.current) {
        entrance.to(line1Ref.current, { opacity: 1, xPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=0.15');
      }
      if (centerAccentRef.current) {
        entrance.to(centerAccentRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'expo.out' }, '-=0.4');
      }
      if (line2Ref.current) {
        entrance.to(line2Ref.current, { opacity: 1, xPercent: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45');
      }
      if (bottomBarRef.current) {
        entrance.to(bottomBarRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative z-30 w-full h-[380vh] bg-[#101515] text-[#e8f0ef] select-none"
    >
      <div id="manifesto" className="absolute top-0 left-0" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">

        <div className="absolute inset-0 w-full h-full flex flex-col justify-between px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12 pointer-events-none">
          <div className="grain-cv pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-overlay opacity-[0.25]">
            <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
              <svg className="w-full h-full">
                <filter id="manifestoNoiseClean">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#manifestoNoiseClean)" />
              </svg>
            </div>
          </div>

          <div className="texture-blueprint pointer-events-none absolute inset-0 z-0 opacity-40" />

          <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-500/30 select-none">+</div>
          <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-500/30 select-none">+</div>
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-500/30 select-none">+</div>
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-zinc-500/30 select-none">+</div>

          <div ref={manifestoHeaderRef} className="relative z-20 w-full flex items-center justify-between pb-6">
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-[#3d5651] leading-none tracking-tight">05</span>
              <div className="flex flex-col justify-center">
                <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-[#6f948a] uppercase [writing-mode:vertical-lr] rotate-180">/manifesto</span>
              </div>
            </div>
            <div ref={manifestoHeaderLineRef} className="flex-1 h-px bg-white/[0.08] mx-4 sm:mx-8 md:mx-10" />
            <div className="font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-[#bed1cb] uppercase shrink-0 font-medium">/STATEMENT</div>
          </div>

          <div ref={stage1Ref} className="relative z-20 w-full my-auto flex flex-col justify-center py-8 will-change-transform">
            <div className="w-full flex justify-between items-center mb-6 sm:mb-8 font-mono text-[8px] sm:text-[9px] tracking-[0.24em] uppercase text-[#6f948a]">
              <div ref={tagLeftRef} className="flex items-center gap-1.5 will-change-transform">
                <span className="text-zinc-600">[</span>
                <span className="text-[#bed1cb] font-medium">VISÃO // AUTORIA</span>
                <span className="text-zinc-600">]</span>
              </div>
              <div ref={tagRightRef} className="hidden sm:flex items-center gap-1.5 will-change-transform">
                <span className="text-zinc-600">[</span>
                <span className="text-zinc-400">DESIGN + ENGENHARIA</span>
                <span className="text-zinc-600">]</span>
              </div>
            </div>

            <div className="w-full flex flex-col items-start overflow-hidden py-2">
              <div ref={line1Ref} className="w-full will-change-transform">
                <h2 className="font-sans font-light text-[5.8vw] sm:text-[4.8vw] md:text-[4.2vw] lg:text-[3.6vw] leading-[1.05] tracking-[-0.04em] text-[#bed1cb]/75 uppercase whitespace-nowrap">
                  A MAIORIA DOS SITES <span className="font-normal text-white/90 ml-3 sm:ml-4">É ESQUECÍVEL.</span>
                </h2>
              </div>
              <div ref={centerAccentRef} className="w-full max-w-[580px] h-px bg-gradient-to-r from-transparent via-[#4ea895]/40 to-transparent my-4 sm:my-6 will-change-transform origin-left" />
              <div ref={line2Ref} className="w-full will-change-transform pl-[4vw] sm:pl-[8vw] md:pl-[12vw]">
                <h2 className="font-sans text-[5.8vw] sm:text-[4.8vw] md:text-[4.2vw] lg:text-[3.6vw] leading-[1.05] tracking-[-0.04em] uppercase whitespace-nowrap">
                  <span className="animate-shimmer-light font-extrabold">O SEU NÃO PRECISA SER.</span>
                </h2>
              </div>
            </div>
          </div>

          <div ref={stage2Ref} className="absolute inset-0 z-25 flex flex-col items-center justify-center pointer-events-none px-4 select-none will-change-transform">
            <div className="flex items-center gap-2 mb-4 font-mono text-[8.5px] sm:text-[10px] tracking-[0.3em] uppercase text-[#6f948a]">
              <span>[</span>
              <span className="text-white font-semibold">2026 // READY TO BUILD</span>
              <span>]</span>
            </div>
            <div ref={zoomTextRef} className="flex flex-col items-center justify-center text-center will-change-transform">
              <h2 className="font-sans font-extrabold text-[30vw] sm:text-[26vw] md:text-[22vw] lg:text-[19.2vw] leading-[0.95] tracking-[-0.05em] uppercase text-white drop-shadow-2xl whitespace-nowrap">
                O PRÓXIMO PASSO
              </h2>
              <h2 className="font-sans font-extrabold text-[32vw] sm:text-[28vw] md:text-[24vw] lg:text-[20.8vw] leading-[0.95] tracking-[-0.05em] uppercase whitespace-nowrap mt-1">
                <span className="animate-shimmer-light text-white">É SEU.</span>
              </h2>
            </div>
          </div>

          <div ref={bottomBarRef} className="relative z-20 w-full flex items-center justify-between font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.22em] uppercase text-zinc-400 border-t border-white/[0.08] pt-3 sm:pt-4">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">[</span>
              <span className="text-[#6f948a] font-medium">05 // MANIFESTO</span>
              <span className="text-zinc-600">]</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="hidden sm:inline">VAMOS CONVERSAR</span>
              <span className="text-[#4ea895] animate-pulse">↓</span>
            </div>
          </div>
        </div>

        <div
          ref={whiteCurtainRef}
          className="pointer-events-none absolute inset-0 z-40 bg-white will-change-[opacity]"
        />

        <div
          ref={contactWrapperRef}
          className="absolute inset-0 z-50 w-full h-full bg-[#FFFFFF] text-[#121818] px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-10 md:py-12 flex flex-col justify-between select-none overflow-hidden"
        >
          <div className="grain-cv pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-[0.22]">
            <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
              <svg className="w-full h-full">
                <filter id="contactBrandNewNoise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#contactBrandNewNoise)" />
              </svg>
            </div>
          </div>

          <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">+</div>
          <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">+</div>
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">+</div>
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">+</div>

          <div ref={contactHeaderRef} className="relative z-10 w-full flex items-center justify-between pb-4 sm:pb-6">
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-[#bed1cb] leading-none tracking-tight">
                06
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-wider text-[#6f948a] uppercase [writing-mode:vertical-lr] rotate-180">
                  /iniciar
                </span>
              </div>
            </div>
            <div className="flex-1 h-px bg-[#27534b]/12 mx-4 sm:mx-8 md:mx-10" />
            <div className="font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-[#35635a] uppercase shrink-0 font-medium">
              /CONTATO
            </div>
          </div>

          <div ref={contactMainRef} className="relative z-10 w-full my-auto flex flex-col justify-center py-2 sm:py-6">
            
            <div className="flex items-center gap-2 font-mono text-[8px] sm:text-[9px] tracking-[0.26em] text-[#6f948a] uppercase mb-4 sm:mb-6">
              <span className="text-zinc-300">[</span>
              <span className="text-[#27534b] font-semibold">NOVO PROJETO OU OPORTUNIDADE</span>
              <span className="text-zinc-300">]</span>
            </div>

            <div className="max-w-[960px]">
              <h2 className="font-sans font-light text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.8rem] tracking-tight leading-[0.98] text-[#10201c]">
                TEM UMA IDEIA? <br />
                <span className="font-extrabold text-[#27534b] animate-shimmer-sage">
                  VAMOS TORNÁ-LA REAL.
                </span>
              </h2>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-col items-start gap-4">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] text-[#6f948a] uppercase">
                INICIAR VIA E-MAIL
              </span>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="font-sans font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-[#10201c] hover:text-[#27534b] transition-colors border-b border-[#10201c]/20 hover:border-[#27534b] pb-0.5"
                >
                  {EMAIL_ADDRESS}
                </a>

                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                  <button
                    onClick={handleCopyEmail}
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full border border-[#27534b]/25 bg-white text-[#27534b] hover:bg-[#27534b] hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
                    aria-label="Copiar e-mail"
                  >
                    {copied ? '✓ COPIADO!' : 'COPIAR ↺'}
                  </button>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase px-4 py-1.5 rounded-full bg-[#27534b] text-white hover:bg-[#1a3832] transition-all cursor-pointer active:scale-95 shadow-xs whitespace-nowrap"
                  >
                    WHATSAPP DIRETO →
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={contactDetailsRef}
              className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-[#27534b]/12"
            >
              <div>
                <span className="block font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#6f948a]">
                  [ 01 // DISPONIBILIDADE ]
                </span>
                <p className="font-sans font-medium text-sm sm:text-[15px] text-[#10201c] mt-1.5">
                  Full-Time · PJ / CLT · Remoto
                </p>
                <span className="block font-mono text-[8.5px] text-[#6f948a] mt-0.5">
                  Disponível para contratação global
                </span>
              </div>

              <div>
                <span className="block font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#6f948a]">
                  [ 02 // RECURSOS ]
                </span>
                <a
                  href={CV_FILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-sans font-medium text-sm sm:text-[15px] text-[#27534b] hover:text-[#1a3832] mt-1.5 cursor-pointer"
                >
                  <span className="underline decoration-[#27534b]/40 underline-offset-4 group-hover:decoration-[#27534b]">
                    Ver / Baixar Currículo (CV)
                  </span>
                  <span className="group-hover:translate-y-0.5 transition-transform text-xs">↗</span>
                </a>
                <span className="block font-mono text-[8.5px] text-[#6f948a] mt-0.5">
                  Versão atualizada 2026
                </span>
              </div>

              <div>
                <span className="block font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#6f948a]">
                  [ 03 // LOCALIZAÇÃO ]
                </span>
                <p className="font-sans font-medium text-sm sm:text-[15px] text-[#10201c] mt-1.5">
                  Santos, SP — Brasil
                </p>
                <span className="block font-mono text-[8.5px] text-[#6f948a] mt-0.5">
                  Fuso: BRT (UTC−3) · 100% Remoto
                </span>
              </div>
            </div>

          </div>

          <div
            ref={contactFooterRef}
            className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#6f948a] border-t border-[#27534b]/12 pt-4 sm:pt-6"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.num}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-[#10201c] hover:text-[#27534b] transition-colors"
                >
                  <span className="text-[#6f948a]">{s.num}/</span>
                  <span className="underline decoration-transparent group-hover:decoration-[#27534b] underline-offset-4 transition-all">
                    {s.label}
                  </span>
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[8px]">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <span className="hidden md:inline text-zinc-400">
                © 2026 RAFHAEL CORSINI
              </span>

              <button
                onClick={handleScrollToTop}
                className="group flex items-center gap-1.5 text-[#27534b] font-semibold hover:text-[#1a3832] transition-colors cursor-pointer py-1 px-2 -mr-2"
              >
                <span>[ VOLTAR AO TOPO</span>
                <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                <span>]</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
