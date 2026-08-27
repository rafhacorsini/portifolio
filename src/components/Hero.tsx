'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelDissolve from '@/components/PixelDissolve';
import { scrubFor } from '@/lib/scrub';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded?: boolean;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRandomGlitch(str: string) {
  return str
    .split('')
    .map((c) => (c === ' ' || c === '\n' ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
    .join('');
}

function GlitchDecode({
  text,
  isTriggered,
  duration = 900,
  delay = 0,
  className = '',
}: {
  text: string;
  isTriggered: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isTriggered) return;

    let frameId: number;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayText(getRandomGlitch(text));

    const timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const targetLen = text.length;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const resolvedCount = Math.floor(progress * targetLen);

        let result = '';
        for (let i = 0; i < targetLen; i++) {
          if (text[i] === ' ' || text[i] === '\n') {
            result += text[i];
          } else if (i < resolvedCount) {
            result += text[i];
          } else {
            const randIndex = Math.floor(Math.random() * GLITCH_CHARS.length);
            result += GLITCH_CHARS[randIndex];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        } else {
          setDisplayText(text);
        }
      };

      frameId = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isTriggered, text, duration, delay]);

  return (
    <span className={className} suppressHydrationWarning>
      {isTriggered ? displayText : text}
    </span>
  );
}

export default function Hero({ isLoaded = true }: HeroProps) {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const leftBioRef = useRef<HTMLDivElement>(null);
  const rightBioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [timeString, setTimeString] = useState<string>('--:--');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headerRef.current,
            leftBioRef.current,
            rightBioRef.current,
            imageRef.current,
            marqueeRef.current,
            subtitleRef.current,
            statusRef.current,
            glowRef.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }
        );
        return;
      }

      gsap.set(headerRef.current?.children ? Array.from(headerRef.current.children) : [], {
        opacity: 0,
        y: -14,
      });
      gsap.set(leftBioRef.current, {
        opacity: 0,
        x: -20,
      });
      gsap.set(rightBioRef.current, {
        opacity: 0,
        x: 20,
      });
      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.9,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.05,
        y: 40,
      });
      gsap.set(marqueeRef.current, {
        opacity: 0,
        y: 50,
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 15,
      });
      gsap.set(statusRef.current, {
        opacity: 0,
        y: 15,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.6,
      })
        .to(
          glowRef.current,
          {
            opacity: 0.85,
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
          },
          '<0.1'
        )
        .to(
          marqueeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
          },
          '-=1.2'
        )
        .to(
          headerRef.current?.children ? Array.from(headerRef.current.children) : [],
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
          },
          '-=1.0'
        )
        .to(
          [leftBioRef.current, rightBioRef.current],
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            stagger: 0.1,
          },
          '-=0.8'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.7'
        )
        .to(
          statusRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          '-=0.6'
        );

      const marqueeInner = marqueeRef.current?.querySelector('.marquee-track');
      if (marqueeInner) {
        gsap.to(marqueeInner, {
          xPercent: -50,
          repeat: -1,
          duration: 35,
          ease: 'none',
        });
      }

      if (containerRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubFor(1),
          },
        });

        gsap.to(glowRef.current, {
          yPercent: 10,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubFor(1),
          },
        });

        gsap.to(marqueeRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: scrubFor(1),
          },
        });

        gsap.to([leftBioRef.current, rightBioRef.current], {
          opacity: 0,
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '25% top',
            scrub: true,
          },
        });

        gsap.to(statusRef.current, {
          opacity: 0,
          y: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '20% top',
            scrub: true,
          },
        });

        gsap.to(headerRef.current, {
          opacity: 0.2,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '30% top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 75% at 50% 45%, #627576 0%, #536465 50%, #465556 100%)',
      }}
    >
      <div className="grain-cv pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-overlay opacity-[0.38]">
        <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
          <svg className="w-full h-full">
            <filter id="heroNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroNoise)" />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-40 font-mono text-[10px] sm:text-[11px] text-zinc-400/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-40 font-mono text-[10px] sm:text-[11px] text-zinc-400/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-40 font-mono text-[10px] sm:text-[11px] text-zinc-400/40 select-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-40 font-mono text-[10px] sm:text-[11px] text-zinc-400/40 select-none">
        +
      </div>

      <header
        ref={headerRef}
        className="relative z-40 w-full px-5 sm:px-8 md:px-14 lg:px-16 pt-5 sm:pt-7 md:pt-9"
      >
        <div className="hidden md:grid md:grid-cols-5 items-center text-[10.5px] lg:text-[11px] font-mono tracking-[0.24em] font-normal uppercase">
          <div className="group text-left transition-colors duration-300 cursor-pointer">
            <span className="text-zinc-400 mr-1.5 transition-colors group-hover:text-zinc-300">01/</span>
            <span className="text-white font-medium">{t('nav.home')}</span>
          </div>

          <div className="group text-center transition-colors duration-300 cursor-pointer">
            <span className="text-zinc-400 mr-1.5 transition-colors group-hover:text-zinc-300">02/</span>
            <span className="text-zinc-200 group-hover:text-white transition-colors">{t('nav.about')}</span>
          </div>

          <div className="group text-center transition-colors duration-300 cursor-pointer">
            <span className="text-zinc-400 mr-1.5 transition-colors group-hover:text-zinc-300">03/</span>
            <span className="text-zinc-200 group-hover:text-white transition-colors">{t('nav.work')}</span>
          </div>

          <div className="group text-center transition-colors duration-300 cursor-pointer">
            <span className="text-zinc-400 mr-1.5 transition-colors group-hover:text-zinc-300">04/</span>
            <span className="text-zinc-200 group-hover:text-white transition-colors">{t('nav.services')}</span>
          </div>

          <div className="group text-right transition-colors duration-300 cursor-pointer">
            <span className="text-zinc-400">[</span>
            <span className="text-white font-medium mx-1 group-hover:text-zinc-200 transition-colors">{t('nav.contact')}</span>
            <span className="text-zinc-400">]</span>
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center text-[10px] font-mono tracking-[0.24em] font-normal uppercase">
          <div className="group text-left">
            <span className="text-zinc-400 mr-1.5">01/</span>
            <span className="text-white font-medium">{t('nav.home')}</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors cursor-pointer py-1 px-2 active:opacity-70"
            aria-label={t('menu.openAria')}
          >
            <span className="text-zinc-400">[</span>
            <span className="font-medium text-[10px]">MENU</span>
            <span className="flex flex-col gap-1 w-3.5 items-end justify-center">
              <span className="w-3.5 h-[1.5px] bg-white" />
              <span className="w-2.5 h-[1.5px] bg-zinc-300" />
            </span>
            <span className="text-zinc-400">]</span>
          </button>
        </div>

        <div className="w-full h-px bg-white/[0.08] mt-3.5 sm:mt-5 md:mt-6" />
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-[#121818]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 select-none">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.24em] uppercase text-zinc-400 border-b border-white/[0.08] pb-4">
            <span>{t('menu.navigation')}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white font-medium cursor-pointer py-1 px-2 active:scale-95 transition-all"
            >
              {t('menu.close')}
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto font-mono text-lg sm:text-xl tracking-[0.28em] uppercase">
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer group flex items-center gap-3 text-white font-medium"
            >
              <span className="text-zinc-400 text-xs">01/</span>
              <span className="border-b border-white pb-0.5">{t('nav.home')}</span>
            </div>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer group flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="text-zinc-500 text-xs">02/</span>
              <span>{t('nav.about')}</span>
            </div>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer group flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="text-zinc-500 text-xs">03/</span>
              <span>{t('nav.work')}</span>
            </div>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer group flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="text-zinc-500 text-xs">04/</span>
              <span>{t('nav.services')}</span>
            </div>
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer group flex items-center gap-2 text-white font-medium mt-4 pt-4 border-t border-white/[0.08]"
            >
              <span className="text-zinc-500">[</span>
              <span>{t('nav.contact')}</span>
              <span className="text-zinc-500">]</span>
            </div>
          </nav>

          <div className="flex justify-between items-center text-[8.5px] font-mono tracking-[0.24em] uppercase text-zinc-400 border-t border-white/[0.08] pt-4">
            <span>[ {timeString} BRT ]</span>
            <span className="text-zinc-300">AVAILABLE FOR WORK</span>
          </div>
        </div>
      )}

      <div
        ref={leftBioRef}
        className="absolute top-[20vh] sm:top-[22vh] md:top-auto md:bottom-[33vh] lg:bottom-[36vh] left-4 sm:left-8 md:left-12 lg:left-16 z-35 max-w-[155px] sm:max-w-[210px] md:max-w-[320px] lg:max-w-[360px] pointer-events-none"
      >
        <div className="flex items-center gap-1 font-mono text-[7.5px] sm:text-[9px] md:text-[9.5px] font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1 sm:mb-2">
          <span className="text-zinc-500">[</span>
          <span className="text-white font-semibold">
            <GlitchDecode text="CREATIVE DEVELOPER" isTriggered={isLoaded} delay={200} duration={600} />
          </span>
          <span className="text-zinc-500">]</span>
        </div>
        <p className="font-mono text-[8px] sm:text-[9.5px] md:text-[10px] lg:text-[11px] uppercase leading-[1.6] md:leading-[1.65] text-zinc-200/90 tracking-wider">
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioLeft.tag')} isTriggered={isLoaded} delay={300} duration={500} />
          </span>{' '}
          <GlitchDecode text={t('bioLeft.connector')} isTriggered={isLoaded} delay={400} duration={450} />{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioLeft.artDirection')} isTriggered={isLoaded} delay={480} duration={400} />
          </span>
          ,{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioLeft.interactionDesign')} isTriggered={isLoaded} delay={540} duration={450} />
          </span>
          ,{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioLeft.motion')} isTriggered={isLoaded} delay={600} duration={400} />
          </span>{' '}
          e{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioLeft.softwareEngineering')} isTriggered={isLoaded} delay={660} duration={500} />
          </span>
        </p>
      </div>

      <div
        ref={rightBioRef}
        className="absolute top-[34vh] sm:top-[36vh] md:top-[26vh] lg:top-[28vh] right-4 sm:right-8 md:right-12 lg:right-16 z-35 max-w-[155px] sm:max-w-[210px] md:max-w-[320px] lg:max-w-[360px] text-right pointer-events-none"
      >
        <div className="flex items-center justify-end gap-1 font-mono text-[7.5px] sm:text-[9px] md:text-[9.5px] font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1 sm:mb-2">
          <span className="text-zinc-500">[</span>
          <span className="text-white font-semibold">
            <GlitchDecode text="DESIGN" isTriggered={isLoaded} delay={250} duration={400} />
          </span>
          <span className="text-zinc-500">/</span>
          <span className="text-white font-semibold">
            <GlitchDecode text="MOTION" isTriggered={isLoaded} delay={300} duration={400} />
          </span>
          <span className="text-zinc-500">/</span>
          <span className="text-white font-semibold">
            <GlitchDecode text="CODE" isTriggered={isLoaded} delay={350} duration={400} />
          </span>
          <span className="text-zinc-500">]</span>
        </div>
        <p className="font-mono text-[8px] sm:text-[9.5px] md:text-[10px] lg:text-[11px] uppercase leading-[1.6] md:leading-[1.65] text-zinc-200/90 tracking-wider">
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioRight.visualDirection')} isTriggered={isLoaded} delay={450} duration={450} />
          </span>{' '}
          <GlitchDecode text={t('bioRight.prototyping')} isTriggered={isLoaded} delay={520} duration={450} />{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioRight.interaction')} isTriggered={isLoaded} delay={580} duration={400} />
          </span>{' '}
          e{' '}
          <span className="text-white font-semibold">
            <GlitchDecode text={t('bioRight.creativeDevelopment')} isTriggered={isLoaded} delay={640} duration={500} />
          </span>{' '}
          <GlitchDecode text={t('bioRight.unified')} isTriggered={isLoaded} delay={720} duration={550} />
        </p>
        <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] font-mono tracking-widest text-zinc-400">
          <span className="text-white font-semibold">*</span>{'//'}
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="absolute inset-x-0 bottom-[4.5vh] sm:bottom-[5vh] md:bottom-[6vh] z-10 pointer-events-none whitespace-nowrap overflow-hidden flex items-center"
      >
        <div className="marquee-track flex items-center shrink-0 will-change-transform">
          <span className="font-syne font-extrabold text-[16vw] sm:text-[16.5vw] md:text-[18vw] leading-none tracking-tighter text-[#d4e2e0]/90 uppercase pr-12 sm:pr-24 drop-shadow-sm select-none">
            RAFHAEL CORSINI
          </span>
          <span className="font-syne font-extrabold text-[16vw] sm:text-[16.5vw] md:text-[18vw] leading-none tracking-tighter text-[#d4e2e0]/90 uppercase pr-12 sm:pr-24 drop-shadow-sm select-none">
            RAFHAEL CORSINI
          </span>
          <span className="font-syne font-extrabold text-[16vw] sm:text-[16.5vw] md:text-[18vw] leading-none tracking-tighter text-[#d4e2e0]/90 uppercase pr-12 sm:pr-24 drop-shadow-sm select-none">
            RAFHAEL CORSINI
          </span>
          <span className="font-syne font-extrabold text-[16vw] sm:text-[16.5vw] md:text-[18vw] leading-none tracking-tighter text-[#d4e2e0]/90 uppercase pr-12 sm:pr-24 drop-shadow-sm select-none">
            RAFHAEL CORSINI
          </span>
        </div>
      </div>

      <div
        ref={glowRef}
        className="absolute inset-0 z-15 flex justify-center items-center pointer-events-none"
      >
        <div
          className="w-[360px] sm:w-[480px] md:w-[680px] lg:w-[780px] h-[360px] sm:h-[480px] md:h-[680px] lg:h-[780px] rounded-full blur-[65px] sm:blur-[90px] md:blur-[140px] will-change-transform opacity-85 translate-y-[18vh] sm:translate-y-[12vh] md:-translate-y-[8vh]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(190, 212, 210, 0.48) 0%, rgba(145, 172, 170, 0.22) 45%, transparent 70%)',
          }}
        />
      </div>

      <div
        ref={imageRef}
        className="absolute inset-x-0 bottom-0 z-20 flex justify-center items-end pointer-events-none h-[96vh] sm:h-[98vh] md:h-[88vh] lg:h-[92vh] max-h-[1600px] md:max-h-[1100px] lg:max-h-[1200px]"
      >
        <div className="relative w-full h-full max-w-[1350px] md:max-w-[1000px] lg:max-w-[1100px] flex justify-center items-end scale-[1.60] sm:scale-[1.62] md:scale-100 lg:scale-[1.04] origin-bottom">
          <Image
            src="https://res.cloudinary.com/dwmrunhxa/image/upload/v1787599503/0_mtpfka.png"
            alt="Rafhael Corsini"
            width={1200}
            height={1400}
            priority
            className="object-contain object-bottom w-auto h-full max-h-full drop-shadow-2xl will-change-transform"
          />
        </div>
      </div>

      <div
        ref={subtitleRef}
        className="absolute top-[10vh] sm:top-[11.5vh] md:top-auto md:bottom-28 lg:bottom-32 inset-x-0 z-35 flex flex-col justify-center items-center pointer-events-none gap-0.5"
      >
        <h2 className="block md:hidden font-syne font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase text-white mb-0.5 select-none">
          <GlitchDecode text="RAFHAEL CORSINI" isTriggered={isLoaded} delay={150} duration={650} />
        </h2>
        <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] font-mono tracking-[0.28em] sm:tracking-[0.32em] uppercase select-none">
          <span className="text-white font-semibold">
            <GlitchDecode text="CREATIVE" isTriggered={isLoaded} delay={250} duration={500} />
          </span>{' '}
          <span className="text-zinc-200 font-normal">
            <GlitchDecode text="DEVELOPER" isTriggered={isLoaded} delay={350} duration={550} />
          </span>
        </p>
        <p className="text-[8px] sm:text-[9px] md:text-[9.5px] font-mono tracking-[0.22em] sm:tracking-[0.26em] uppercase select-none text-zinc-300">
          <span>PORTFOLIO</span> <span className="text-zinc-400">{'//'}</span>{' '}
          <span className="text-white font-medium">
            <GlitchDecode text="2026" isTriggered={isLoaded} delay={450} duration={400} />
          </span>
        </p>
      </div>

      <div className="flex absolute bottom-3 sm:bottom-6 md:bottom-9 left-4 sm:left-8 md:left-14 lg:left-16 z-35 items-center gap-2 font-mono text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-[0.22em] sm:tracking-[0.26em] uppercase pointer-events-none text-zinc-400">
        <span>
          <span className="text-zinc-500">[</span> <span className="text-zinc-300 font-normal">001 // SEC_HERO</span> <span className="text-zinc-500">]</span>
        </span>
      </div>

      <div
        ref={statusRef}
        className="flex absolute bottom-3 sm:bottom-6 md:bottom-9 right-4 sm:right-8 md:right-14 lg:right-16 z-35 items-center gap-1.5 sm:gap-2 font-mono text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-[0.22em] sm:tracking-[0.26em] uppercase pointer-events-none text-zinc-400"
      >
        <span>
          <span className="text-zinc-500">[</span> <span className="text-zinc-200 font-medium">{timeString}</span> <span className="text-zinc-400">BRT</span> <span className="text-zinc-500">]</span>
        </span>
        <span className="hidden sm:inline text-zinc-500">{'//'}</span>
        <span className="hidden sm:inline text-zinc-300 font-normal">AVAILABLE FOR WORK</span>
      </div>

      <PixelDissolve triggerRef={containerRef} color="#FFFFFF" />
    </section>
  );
}
