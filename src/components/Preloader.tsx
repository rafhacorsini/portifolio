'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
  columnColor?: string;
}

const CHARACTERS = '!<>-_\\/[]{}—=+*^?#_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TARGET_TEXT = 'RAFHAEL CORSINI';

export default function Preloader({ onComplete, columnColor = '#161d1d' }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const [displayText, setDisplayText] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const triggerExitSequence = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      setIsFinished(true);
      return;
    }

    if (onComplete) {
      onComplete();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
      },
    });

    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: 'power2.in',
      delay: 0.1,
    });

    tl.to(
      columnsRef.current,
      {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut',
        stagger: 0.09,
      },
      '-=0.1'
    );
  };

  useEffect(() => {
    let frameId: number;
    const duration = 1400; // ms
    const startTime = performance.now();

    const updateScramble = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / duration);
      const currentPercent = Math.floor(progressRatio * 100);
      setProgress(currentPercent);

      const targetLen = TARGET_TEXT.length;
      const resolvedCount = Math.floor(progressRatio * targetLen);

      let scrambled = '';
      for (let i = 0; i < targetLen; i++) {
        if (i < resolvedCount) {
          scrambled += TARGET_TEXT[i];
        } else if (TARGET_TEXT[i] === ' ') {
          scrambled += ' ';
        } else {
          const randIndex = Math.floor(Math.random() * CHARACTERS.length);
          scrambled += CHARACTERS[randIndex];
        }
      }

      setDisplayText(scrambled);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(updateScramble);
      } else {
        setDisplayText(TARGET_TEXT);
        setProgress(100);
        triggerExitSequence();
      }
    };

    frameId = requestAnimationFrame(updateScramble);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFinished) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex w-screen h-[100dvh] overflow-hidden select-none bg-transparent"
    >
      <div className="absolute inset-0 grid grid-cols-5 w-full h-full pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) columnsRef.current[i] = el;
            }}
            className="w-[101%] -ml-[0.5%] h-full will-change-transform"
            style={{ backgroundColor: columnColor }}
          />
        ))}
      </div>

      <div
        ref={textRef}
        className="relative z-10 m-auto flex flex-col items-center justify-center text-center px-4 w-full max-w-[90vw]"
      >
        <div className="overflow-hidden w-full flex justify-center">
          <h1 className="font-mono text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.24em] sm:tracking-[0.36em] font-medium text-white uppercase select-none whitespace-nowrap">
            {displayText || TARGET_TEXT}
          </h1>
        </div>

        <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-2.5 font-mono text-[8px] sm:text-[9.5px] tracking-[0.22em] sm:tracking-[0.28em] text-zinc-400 uppercase">
          <span className="text-zinc-500">[</span>
          <span className="text-zinc-300 font-normal">INITIALIZING</span>
          <span className="text-zinc-500">{'//'}</span>
          <span className="text-white font-medium min-w-[32px] sm:min-w-[36px] text-left">
            {progress.toString().padStart(2, '0')}%
          </span>
          <span className="text-zinc-500">]</span>
        </div>
      </div>
    </div>
  );
}
