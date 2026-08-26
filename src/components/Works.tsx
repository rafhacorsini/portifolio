'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  year: string;
  image: string | null;
}

const BACKGROUND_VIDEO =
  'https://res.cloudinary.com/dwmrunhxa/video/upload/q_auto:low,f_auto,w_1280/v1787083045/d9021ce6-4f44-4ab7-b791-6e8090cbdaaa_pffps1.mp4';

const PROJECTS: ProjectItem[] = [
  {
    id: 'casa-77',
    number: '01',
    title: 'Casa 77',
    tag: 'REAL ESTATE / ART DIRECTION',
    year: '2026',
    image:
      'https://res.cloudinary.com/dwmrunhxa/image/upload/v1787667776/ChatGPT_Image_25_de_ago._de_2026_11_22_41_w3rex0.png',
  },
  {
    id: 'good',
    number: '02',
    title: 'Good.',
    tag: 'BRAND IDENTITY / FOOD SERVICE',
    year: '2026',
    image:
      'https://res.cloudinary.com/dwmrunhxa/image/upload/v1787667875/ChatGPT_Image_25_de_ago._de_2026_11_23_23_dpuw6v.png',
  },
  {
    id: 'denta',
    number: '03',
    title: 'Denta',
    tag: 'HEALTHCARE / WEB DESIGN',
    year: '2025',
    image:
      'https://res.cloudinary.com/dwmrunhxa/image/upload/v1787668047/ChatGPT_Image_25_de_ago._de_2026_11_27_12_cgaxh8.png',
  },
  {
    id: 'vytal',
    number: '04',
    title: 'Vytal',
    tag: 'PRODUCT / E-COMMERCE',
    year: '2025',
    image:
      'https://res.cloudinary.com/dwmrunhxa/image/upload/v1787668050/ChatGPT_Image_25_de_ago._de_2026_11_25_23_soickl.png',
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wipeLineRef = useRef<HTMLDivElement>(null);
  const wipeCometRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const indexLabelRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rowLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const previewX = useRef<((val: number) => void) | null>(null);
  const previewY = useRef<((val: number) => void) | null>(null);

  useEffect(() => {
    if (!previewRef.current) return;

    previewX.current = gsap.quickTo(previewRef.current, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    });
    previewY.current = gsap.quickTo(previewRef.current, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    previewX.current?.(e.clientX);
    previewY.current?.(e.clientY);
  }, []);

  const handleRowEnter = useCallback((index: number) => {
    setActiveIndex(index);

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, []);

  const handleRowLeave = useCallback(() => {
    setActiveIndex(null);

    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      bgVideoRef.current?.pause();
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (wipeLineRef.current) {
        gsap.fromTo(
          wipeLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 72%',
              scrub: 0.4,
            },
          }
        );

        gsap.fromTo(
          wipeLineRef.current,
          { opacity: 0.85 },
          {
            opacity: 0.14,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              end: 'top 35%',
              scrub: 0.4,
            },
          }
        );
      }

      if (wipeCometRef.current) {
        gsap.fromTo(
          wipeCometRef.current,
          { left: '0%' },
          {
            left: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 72%',
              scrub: 0.4,
            },
          }
        );

        gsap.fromTo(
          wipeCometRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 68%',
              scrub: 0.4,
            },
          }
        );
      }

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { yPercent: 9 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      if (headerRef.current) {
        tl.from(headerRef.current.children, {
          y: -14,
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

      if (indexLabelRef.current) {
        tl.from(
          indexLabelRef.current,
          { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );
      }

      const rowTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 45%',
          toggleActions: 'play none none none',
        },
      });

      rowLinesRef.current.forEach((line, index) => {
        if (!line) return;

        rowTl.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.85, ease: 'expo.out' },
          index * 0.14
        );
      });

      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        rowTl.fromTo(
          row,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          index * 0.14 + 0.12
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trabalhos"
      onMouseMove={handleMouseMove}
      className="relative z-20 w-full min-h-screen bg-[#121818] text-[#e8f0ef] px-6 sm:px-10 md:px-16 lg:px-20 pt-10 sm:pt-14 md:pt-16 pb-24 sm:pb-32 flex flex-col select-none overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden isolate opacity-[0.085]"
        aria-hidden="true"
      >
        <video
          ref={bgVideoRef}
          src={BACKGROUND_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] sm:object-center grayscale contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-[#27534b] mix-blend-color" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 48%, transparent 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden mix-blend-overlay opacity-[0.3]"
        aria-hidden="true"
      >
        <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
          <svg className="w-full h-full">
            <filter id="worksNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#worksNoise)" />
          </svg>
        </div>
      </div>

      <div
        ref={wipeLineRef}
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-[#e8f0ef] z-40 will-change-transform"
        aria-hidden="true"
      >
        <div
          ref={wipeCometRef}
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_2px_rgba(255,255,255,0.55)] will-change-transform"
        />
      </div>

      <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#e8f0ef]/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#e8f0ef]/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#e8f0ef]/20 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#e8f0ef]/20 select-none">
        +
      </div>

      <div className="hidden lg:block pointer-events-none absolute top-1/2 right-4 xl:right-6 -translate-y-1/2 z-[3] select-none">
        <span className="block font-mono text-[9px] tracking-[0.32em] uppercase text-[#6f948a]/25 [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
          Menos, mas melhor
        </span>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-[280px] lg:w-[320px] aspect-[4/3] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90 will-change-transform"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 overflow-hidden bg-[#182121] border border-white/[0.12] shadow-2xl transition-opacity duration-300 ${
              activeIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="320px"
                className="object-cover object-center"
              />
            ) : (
              <>
                <div className="texture-blueprint absolute inset-0 opacity-70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-sans font-light text-5xl text-white/15 leading-none tracking-tight">
                    {project.number}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25">
                    [ imagem ]
                  </span>
                </div>
              </>
            )}

            <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-overlay opacity-[0.35]">
              <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
                <svg className="w-full h-full">
                  <rect width="100%" height="100%" filter="url(#worksNoise)" />
                </svg>
              </div>
            </div>

            <div className="absolute top-2.5 left-3 font-mono text-[8px] tracking-[0.22em] uppercase text-white/45">
              {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </div>

            <div className="absolute bottom-2.5 right-3 font-mono text-[8px] tracking-[0.22em] uppercase text-white/45">
              {project.year}
            </div>
          </div>
        ))}
      </div>

      <div ref={stageRef} className="relative z-10 flex flex-1 flex-col will-change-transform">
        <div ref={headerRef} className="w-full flex items-center justify-between pb-8 sm:pb-10">
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-[#3d5651] leading-none tracking-tight select-none">
              03
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-wider text-[#6f948a] uppercase [writing-mode:vertical-lr] rotate-180 select-none">
                /índice
              </span>
            </div>
          </div>

          <div ref={headerLineRef} className="flex-1 h-px bg-white/[0.08] mx-4 sm:mx-8 md:mx-10" />

          <div className="font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-[#bed1cb] uppercase select-none shrink-0 font-medium">
            /TRABALHOS
          </div>
        </div>

        <div
          ref={indexLabelRef}
          className="flex items-center justify-between gap-4 font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase select-none mb-6 sm:mb-8 will-change-transform"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">[</span>
            <span className="text-[#bed1cb] font-medium whitespace-nowrap">SELECTED WORK // 2025—2026</span>
            <span className="text-zinc-600">]</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[#6f948a]/50 shrink-0">
            <span className="text-zinc-600">[</span>
            <span className="whitespace-nowrap">{String(PROJECTS.length).padStart(2, '0')} CASES</span>
            <span className="text-zinc-600">]</span>
          </div>
        </div>

        <div
          className="w-full flex flex-col my-auto"
          onMouseLeave={handleRowLeave}
        >
          {PROJECTS.map((project, index) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && !isActive;

            return (
              <div key={project.id} className="relative w-full">
                <div
                  ref={(el) => {
                    if (el) rowLinesRef.current[index] = el;
                  }}
                  className={`h-px w-full will-change-transform transition-colors duration-500 ${
                    isActive ? 'bg-white/30' : 'bg-white/[0.09]'
                  }`}
                />

                <div
                  className={`transition-opacity duration-500 ${
                    isDimmed ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                <div
                  ref={(el) => {
                    if (el) rowsRef.current[index] = el;
                  }}
                  onMouseEnter={() => handleRowEnter(index)}
                  data-cursor="project"
                  data-cursor-text="VIEW"
                  className="group relative w-full flex items-baseline gap-4 sm:gap-6 md:gap-10 cursor-pointer py-4 sm:py-6 md:py-7 will-change-transform"
                >
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] tracking-[0.2em] shrink-0 transition-colors duration-500 ${
                      isActive ? 'text-[#bed1cb]' : 'text-[#3d5651]'
                    }`}
                  >
                    {project.number}
                  </span>

                  <h3
                    className={`flex-1 min-w-0 font-sans font-light leading-[1.05] tracking-[-0.04em] text-[1.4rem] sm:text-[1.75rem] md:text-[2.1rem] lg:text-[2.4rem] xl:text-[2.7rem] transition-all duration-500 ease-out ${
                      isActive
                        ? 'text-white translate-x-2 sm:translate-x-4'
                        : 'text-[#e8f0ef]/70 translate-x-0'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <span
                    className={`hidden lg:block shrink-0 max-w-[240px] text-right font-mono text-[8.5px] tracking-[0.2em] uppercase leading-[1.6] transition-colors duration-500 ${
                      isActive ? 'text-[#bed1cb]' : 'text-[#6f948a]/60'
                    }`}
                  >
                    {project.tag}
                  </span>

                  <span
                    className={`shrink-0 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? 'text-[#bed1cb]' : 'text-[#3d5651]'
                    }`}
                  >
                    {project.year}
                  </span>
                </div>

                <div className="lg:hidden -mt-3 sm:-mt-5 pb-6 sm:pb-8 pl-8 sm:pl-11 font-mono text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-[#6f948a]/70">
                  {project.tag}
                </div>
                </div>
              </div>
            );
          })}

          <div
            ref={(el) => {
              if (el) rowLinesRef.current[PROJECTS.length] = el;
            }}
            className="h-px w-full bg-white/[0.09] will-change-transform"
          />

          <div className="flex items-center justify-between gap-4 pt-4 sm:pt-5 font-mono text-[7.5px] sm:text-[8px] tracking-[0.22em] uppercase text-[#4a6a63]/70 select-none">
            <span className="whitespace-nowrap">[ FIM DO ÍNDICE ]</span>
            <span className="whitespace-nowrap">SANTOS, BR — 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
