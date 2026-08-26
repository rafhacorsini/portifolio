'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    let currentMagneticEl: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      let targetX = e.clientX;
      let targetY = e.clientY;

      if (currentMagneticEl) {
        const rect = currentMagneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        targetX = centerX + deltaX;
        targetY = centerY + deltaY;

        gsap.to(currentMagneticEl, {
          x: deltaX * 0.45,
          y: deltaY * 0.45,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      setDotX(targetX);
      setDotY(targetY);
      setRingX(targetX);
      setRingY(targetY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest<HTMLElement>('[data-cursor="project"], [data-cursor-text]');
      if (projectTarget) {
        const text = projectTarget.getAttribute('data-cursor-text') || 'VIEW';
        setCursorText(text);
        setIsProject(true);
        setIsHovered(true);
        return;
      }

      const magneticTarget = target.closest<HTMLElement>('a, button, [data-magnetic="true"], [role="button"]');
      if (magneticTarget) {
        currentMagneticEl = magneticTarget;
        setIsHovered(true);
        setIsProject(false);
        setCursorText('');
        return;
      }

      setIsHovered(false);
      setIsProject(false);
      setCursorText('');
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (currentMagneticEl && target.closest('a, button, [data-magnetic="true"], [role="button"]') === currentMagneticEl) {
        gsap.to(currentMagneticEl, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto',
        });
        currentMagneticEl = null;
      }

      setIsHovered(false);
      setIsProject(false);
      setCursorText('');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (currentMagneticEl) {
        gsap.to(currentMagneticEl, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        currentMagneticEl = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-9999 overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 ease-out will-change-transform ${
          isProject
            ? 'w-0 h-0 opacity-0'
            : isHovered
            ? 'w-2 h-2 bg-[#27534b] scale-150'
            : 'w-1.5 h-1.5 bg-[#27534b]'
        }`}
      />

      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out will-change-transform ${
          isProject
            ? 'w-20 h-20 bg-[#27534b] text-white shadow-xl scale-100'
            : isHovered
            ? 'w-11 h-11 border border-[#27534b]/40 bg-[#27534b]/10 scale-100'
            : 'w-7 h-7 border border-[#27534b]/30 bg-transparent scale-100'
        }`}
      >
        {isProject && (
          <span
            ref={badgeTextRef}
            className="font-mono text-[9px] tracking-[0.24em] font-medium text-white uppercase select-none animate-pulse"
          >
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>
    </div>
  );
}
