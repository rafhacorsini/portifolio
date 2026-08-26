'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: 'words' | 'chars';
  triggerStart?: string;
  once?: boolean;
}

export default function TextReveal({
  text,
  as: Component = 'div',
  className = '',
  wordClassName = '',
  delay = 0,
  duration = 0.85,
  stagger = 0.04,
  type = 'words',
  triggerStart = 'top 85%',
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      itemsRef.current.forEach((el) => {
        if (el) gsap.set(el, { yPercent: 0, opacity: 1 });
      });
      return;
    }

    const validItems = itemsRef.current.filter(Boolean);
    if (validItems.length === 0) return;

    gsap.set(validItems, { yPercent: 120, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(validItems, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [delay, duration, stagger, triggerStart, once]);

  // eslint-disable-next-line react-hooks/refs
  itemsRef.current = [];

  const renderContent = () => {
    if (type === 'chars') {
      const words = text.split(' ');
      let charIndex = 0;

      return words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] align-top">
          {word.split('').map((char) => {
            const currentIdx = charIndex++;
            return (
              <span key={currentIdx} className="inline-block overflow-hidden align-top">
                <span
                  ref={(el) => {
                    if (el) itemsRef.current[currentIdx] = el;
                  }}
                  className={`inline-block will-change-transform ${wordClassName}`}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ));
    }

    const words = text.split(' ');
    return words.map((word, idx) => (
      <span key={idx} className="inline-block overflow-hidden mr-[0.28em] align-top">
        <span
          ref={(el) => {
            if (el) itemsRef.current[idx] = el;
          }}
          className={`inline-block will-change-transform ${wordClassName}`}
        >
          {word}
        </span>
      </span>
    ));
  };

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: `select-none ${className}`,
    },
    renderContent()
  );
}
