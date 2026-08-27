'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrubFor } from '@/lib/scrub';

gsap.registerPlugin(ScrollTrigger);

interface PixelDissolveProps {
  triggerRef: React.RefObject<HTMLElement | null>;
  color?: string;
}

interface PixelCell {
  el: HTMLDivElement;
  priority: number;
  row: number;
  col: number;
}

export default function PixelDissolve({ triggerRef, color = '#FFFFFF' }: PixelDissolveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    const triggerEl = triggerRef.current;
    if (!container || !grid || !triggerEl) return;

    let currentCols = 0;
    let currentRows = 0;

    const buildGrid = () => {
      const containerWidth = container.offsetWidth || window.innerWidth;
      const containerHeight = container.offsetHeight || window.innerHeight;
      const isMobile = window.innerWidth < 768;

      let cols: number;
      let rows: number;

      if (isMobile) {
        const targetSquareSize = 38;
        cols = Math.max(8, Math.round(containerWidth / targetSquareSize));
        const actualCellWidth = containerWidth / cols;
        rows = Math.max(10, Math.round(containerHeight / actualCellWidth));
      } else {
        cols = 30;
        rows = 18;
      }

      if (cols === currentCols && rows === currentRows && grid.children.length > 0) {
        return;
      }

      currentCols = cols;
      currentRows = rows;
      const totalCells = cols * rows;

      grid.innerHTML = '';
      grid.style.display = 'grid';
      grid.style.width = '100%';
      grid.style.height = isMobile ? 'calc(100% + 4px)' : '100%';
      grid.style.bottom = isMobile ? '-2px' : '0px';
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      grid.style.gap = '0px';

      const newCells: PixelCell[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.className = 'w-full h-full will-change-[opacity]';
          cell.style.backgroundColor = color;
          
          if (isMobile) {
            cell.style.outline = `1px solid ${color}`;
            cell.style.outlineOffset = '-0.2px';
            cell.style.transform = 'scale(1.02)';
          } else {
            cell.style.boxShadow = `0 0 0.5px ${color}`;
          }
          
          cell.style.opacity = '0';
          grid.appendChild(cell);

          const distanceFromBottom = rows - 1 - r;
          const priority = isMobile
            ? Math.pow(distanceFromBottom, 1.35) * 60 + Math.random() * 180 + Math.sin(c * 0.4) * 25
            : distanceFromBottom * 50 + Math.random() * 300 + Math.sin(c * 0.3) * 30;

          newCells.push({
            el: cell,
            priority,
            row: r,
            col: c,
          });
        }
      }

      newCells.sort((a, b) => a.priority - b.priority);

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      let lastVisibleCount = 0;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top',
        end: 'bottom top',
        scrub: scrubFor(1),
        onUpdate: (self) => {
          const visibleCount = Math.min(totalCells, Math.floor(totalCells * self.progress * 1.15));

          if (visibleCount !== lastVisibleCount) {
            const start = Math.min(visibleCount, lastVisibleCount);
            const end = Math.max(visibleCount, lastVisibleCount);
            const growing = visibleCount > lastVisibleCount;

            // A fast flick can jump `progress` a long way in a single frame.
            // Tweening every cell that crosses in that frame - potentially
            // hundreds - is what stutters. Only the leading edge needs the
            // fade flourish; cells further back can just snap. On a
            // normal-speed scroll this window is wider than the delta
            // anyway, so every cell still gets the tween as before.
            const ANIMATE_WINDOW = 24;
            const animateFrom = growing ? Math.max(start, end - ANIMATE_WINDOW) : start;
            const animateTo = growing ? end : Math.min(end, start + ANIMATE_WINDOW);

            for (let i = start; i < end; i++) {
              const cell = newCells[i];
              if (!cell) continue;
              const targetOpacity = i < visibleCount ? 1 : 0;
              if (i >= animateFrom && i < animateTo) {
                gsap.to(cell.el, {
                  opacity: targetOpacity,
                  duration: 0.35,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              } else {
                gsap.killTweensOf(cell.el);
                cell.el.style.opacity = String(targetOpacity);
              }
            }
            lastVisibleCount = visibleCount;
          }

          if (self.progress === 0) {
            newCells.forEach((c) => {
              c.el.style.opacity = '0';
            });
            lastVisibleCount = 0;
          } else if (self.progress >= 0.98) {
            newCells.forEach((c) => {
              c.el.style.opacity = '1';
            });
            lastVisibleCount = totalCells;
          }
        },
      });
    };

    buildGrid();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildGrid();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      grid.innerHTML = '';
    };
  }, [triggerRef, color]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden"
      aria-hidden="true"
    >
      <div className="grain-cv pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-multiply opacity-[0.22]">
        <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
          <svg className="w-full h-full">
            <filter id="pixelNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#pixelNoise)" />
          </svg>
        </div>
      </div>

      <div ref={gridRef} className="absolute inset-0 w-full h-full z-0" />
    </div>
  );
}
