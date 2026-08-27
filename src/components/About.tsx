'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ClaudeIcon,
  OpenAIIcon,
  NextjsIcon,
  ReactIcon,
  TypescriptIcon,
  TailwindIcon,
  GsapIcon,
  ThreejsIcon,
  FigmaIcon,
  CursorIcon,
} from './TechIcons';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { name: 'CLAUDE CODE', icon: ClaudeIcon, isAI: true },
  { name: 'OPENAI / LLMS', icon: OpenAIIcon, isAI: true },
  { name: 'CURSOR AI', icon: CursorIcon, isAI: true },
  { name: 'AI AGENTS & MCP', icon: Sparkles, isAI: true, iconColor: '#9333EA' },
  { name: 'NEXT.JS', icon: NextjsIcon },
  { name: 'REACT', icon: ReactIcon },
  { name: 'TYPESCRIPT', icon: TypescriptIcon },
  { name: 'GSAP / LENIS', icon: GsapIcon },
  { name: 'TAILWIND CSS', icon: TailwindIcon },
  { name: 'THREE.JS / WEBGL', icon: ThreejsIcon },
  { name: 'FIGMA', icon: FigmaIcon },
];

export default function About() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<HTMLSpanElement[]>([]);
  const subParagraphRef = useRef<HTMLParagraphElement>(null);
  const metadataGridRef = useRef<HTMLDivElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);
  const verticalDividerRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const glassBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      if (headerRef.current) {
        tl.from(headerRef.current.children, {
          y: -15,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      if (headerLineRef.current) {
        tl.fromTo(
          headerLineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.9, ease: 'expo.out' },
          '-=0.5'
        );
      }

      const validTitleLines = titleLinesRef.current.filter(Boolean);
      if (validTitleLines.length > 0) {
        tl.from(
          validTitleLines,
          {
            y: 40,
            opacity: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      if (subParagraphRef.current) {
        tl.from(
          subParagraphRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.7'
        );
      }

      if (metadataGridRef.current) {
        tl.from(
          metadataGridRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.65'
        );
      }

      if (marqueeWrapperRef.current) {
        tl.from(
          marqueeWrapperRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      if (verticalDividerRef.current) {
        tl.fromTo(
          verticalDividerRef.current,
          { scaleY: 0, transformOrigin: 'top', opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.95, ease: 'expo.out' },
          '-=0.8'
        );
      }

      if (photoCardRef.current) {
        tl.from(
          photoCardRef.current,
          {
            scale: 0.92,
            y: 35,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.85'
        );
      }

      if (glassBadgeRef.current) {
        tl.from(
          glassBadgeRef.current,
          {
            y: 20,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        const liftTargets = section.querySelectorAll('.about-curtain-lift');

        if (liftTargets.length) {
          gsap.to(liftTargets, {
            y: () => -window.innerHeight * 0.14,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative w-full min-h-screen bg-[#FFFFFF] text-[#121818] px-6 sm:px-10 md:px-16 lg:px-20 pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 flex flex-col justify-between select-none z-10 overflow-hidden -mt-[1px] md:mt-0"
    >
        <div className="grain-cv pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-[0.22]">
          <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
            <svg className="w-full h-full">
              <filter id="aboutNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#aboutNoise)" />
            </svg>
          </div>
        </div>

      <div ref={headerRef} className="about-curtain-lift relative z-10 w-full flex items-center justify-between pb-8 sm:pb-10 will-change-transform">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-[#bed1cb] leading-none tracking-tight select-none">
            02
          </span>
          <div className="flex flex-col justify-center">
            <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-wider text-[#6f948a] uppercase [writing-mode:vertical-lr] rotate-180 select-none">
              {t('introLabel')}
            </span>
          </div>
        </div>

        <div ref={headerLineRef} className="flex-1 h-px bg-[#27534b]/12 mx-4 sm:mx-8 md:mx-10" />

        <div className="font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-[#35635a] uppercase select-none shrink-0 font-medium">
          {t('sectionLabel')}
        </div>
      </div>

      <div className="about-curtain-lift relative z-10 w-full flex-1 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-8 lg:gap-12 my-auto pt-6 sm:pt-8 pl-0 sm:pl-6 md:pl-12 lg:pl-16 will-change-transform">
        <div className="w-full lg:max-w-[760px] xl:max-w-[820px] flex flex-col justify-center">
          <h2 className="font-sans font-light text-[1.3rem] sm:text-xl md:text-[1.9rem] lg:text-[2.15rem] leading-[1.12] sm:leading-[1.08] tracking-[-0.055em] sm:tracking-[-0.06em] text-[#27534b] max-w-[540px]">
            <span
              ref={(el) => { if (el) titleLinesRef.current[0] = el; }}
              className="block pl-4 sm:pl-8 md:pl-14 sm:whitespace-nowrap will-change-transform text-[#27534b]/80 font-light"
            >
              {t('title.line1')}
            </span>
            <span
              ref={(el) => { if (el) titleLinesRef.current[1] = el; }}
              className="block sm:whitespace-nowrap will-change-transform text-[#27534b]/80 font-light"
            >
              {t('title.line2')}
            </span>
            <span
              ref={(el) => { if (el) titleLinesRef.current[2] = el; }}
              className="block sm:whitespace-nowrap will-change-transform"
            >
              <span className="animate-shimmer-sage font-extrabold">
                {t('title.line3')}
              </span>
            </span>
            <span
              ref={(el) => { if (el) titleLinesRef.current[3] = el; }}
              className="block sm:whitespace-nowrap will-change-transform"
            >
              <span className="animate-shimmer-sage font-extrabold">
                {t('title.line4a')}
              </span>{' '}
              <span className="text-[#27534b]/80 font-light">
                {t('title.line4b')}
              </span>
            </span>
          </h2>

          <p
            ref={subParagraphRef}
            className="mt-4 sm:mt-5 font-mono text-[11px] sm:text-[11.5px] md:text-[12px] leading-[1.48] tracking-[-0.025em] text-[#5b8278] max-w-[340px] sm:max-w-[390px] md:max-w-[430px] will-change-transform"
          >
            {t('paragraph')}
          </p>

          <div
            ref={metadataGridRef}
            data-parallax="0.12"
            className="mt-10 sm:mt-12 grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-7 max-w-[460px]"
          >
            <div>
              <span className="block font-mono font-semibold text-[11px] sm:text-xs text-[#27534b] uppercase tracking-wider">
                {t('meta.fieldLabel')}
              </span>
              <span className="block font-mono text-[11px] sm:text-xs text-[#6f948a] mt-0.5">
                {t('meta.fieldValue')}
              </span>
            </div>

            <div>
              <span className="block font-mono font-semibold text-[11px] sm:text-xs text-[#27534b] uppercase tracking-wider">
                {t('meta.approachLabel')}
              </span>
              <span className="block font-mono text-[11px] sm:text-xs text-[#6f948a] mt-0.5">
                {t('meta.approachValue')}
              </span>
            </div>

            <div>
              <span className="block font-mono font-semibold text-[11px] sm:text-xs text-[#27534b] uppercase tracking-wider">
                {t('meta.locationLabel')}
              </span>
              <span className="block font-mono text-[11px] sm:text-xs text-[#6f948a] mt-0.5">
                {t('meta.locationValue')}
              </span>
            </div>

            <div>
              <span className="block font-mono font-semibold text-[11px] sm:text-xs text-[#27534b] uppercase tracking-wider">
                {t('meta.focusLabel')}
              </span>
              <span className="block font-mono text-[11px] sm:text-xs text-[#6f948a] mt-0.5">
                {t('meta.focusValue')}
              </span>
            </div>
          </div>

          <div ref={marqueeWrapperRef} className="mt-8 sm:mt-10 w-full max-w-[520px] overflow-hidden will-change-transform">
            <div className="flex items-center gap-1.5 mb-2.5 font-mono text-[8px] sm:text-[8.5px] tracking-[0.24em] text-[#6f948a] uppercase select-none">
              <span>[</span>
              <span className="text-[#27534b] font-semibold">TECH_STACK & AI_TOOLS</span>
              <span>]</span>
            </div>

            <div
              className="relative w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              }}
            >
              <div className="animate-marquee-infinite flex items-center gap-2 py-1.5">
                {TECH_STACK.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={`primary-${idx}`}
                      className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-[#27534b]/15 bg-white/70 text-[#1a3530] whitespace-nowrap select-none hover:border-[#27534b]/35 hover:bg-white transition-all shadow-xs flex items-center gap-1.5 backdrop-blur-xs"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.iconColor }} />
                      <span>{item.name}</span>
                      {item.isAI && (
                        <span className="text-[7px] font-sans font-bold px-1 py-0.2 rounded bg-[#27534b]/10 text-[#27534b]">
                          AI
                        </span>
                      )}
                    </span>
                  );
                })}

                {TECH_STACK.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={`duplicate-${idx}`}
                      aria-hidden="true"
                      className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-[#27534b]/15 bg-white/70 text-[#1a3530] whitespace-nowrap select-none hover:border-[#27534b]/35 hover:bg-white transition-all shadow-xs flex items-center gap-1.5 backdrop-blur-xs"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.iconColor }} />
                      <span>{item.name}</span>
                      {item.isAI && (
                        <span className="text-[7px] font-sans font-bold px-1 py-0.2 rounded bg-[#27534b]/10 text-[#27534b]">
                          AI
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div ref={verticalDividerRef} className="hidden md:block w-px bg-[#27534b]/20 h-[360px] md:h-[400px] my-auto mx-4 lg:mx-8 shrink-0 select-none will-change-transform" />

        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end shrink-0">
          <div ref={photoCardRef} data-parallax="-0.08" className="relative w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] aspect-[3/4] rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] overflow-hidden shadow-xl border border-black/[0.04] will-change-transform">
            <Image
              src="https://res.cloudinary.com/dwmrunhxa/image/upload/v1787611419/ChatGPT_Image_24_de_ago._de_2026_19_43_24_ny68rh.png"
              alt="Rafhael Corsini"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-center"
              priority
            />

            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

            <div
              ref={glassBadgeRef}
              className="absolute bottom-3 inset-x-2.5 sm:bottom-3.5 sm:inset-x-3 z-20 grid grid-cols-3 gap-1 text-center select-none will-change-transform"
            >
              <div className="flex flex-col items-center justify-end">
                <span className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-tight leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  +05
                </span>
                <span className="font-mono text-[7px] sm:text-[7.5px] leading-tight text-white/80 uppercase mt-1 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {t('photoBadge.yearsExp')}
                </span>
              </div>

              <div className="flex flex-col items-center justify-end border-x border-white/20 px-0.5">
                <span className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-tight leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  100%
                </span>
                <span className="font-mono text-[7px] sm:text-[7.5px] leading-tight text-white/80 uppercase mt-1 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {t('photoBadge.details')}
                </span>
              </div>

              <div className="flex flex-col items-center justify-end">
                <span className="font-sans font-bold text-sm sm:text-[15px] text-white tracking-tight leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  01
                </span>
                <span className="font-mono text-[7px] sm:text-[7.5px] leading-tight text-white/80 uppercase mt-1 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Design+Code
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
