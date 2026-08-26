'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: string;
  variant: 'graphite' | 'sage';
  num: string;
  title: string;
  tag: string;
  detailTitle: string;
  whatItDoes: string;
  whoItsFor: string;
  deliverables: string;
  glyph: React.ReactNode;
  icon3d?: string;
}

const gp = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const CARDS: ServiceCard[] = [
  {
    id: 's1',
    variant: 'graphite',
    num: '01',
    title: 'Desenvolvimento',
    tag: 'NEXT.JS · REACT · NODE · LLMS',
    detailTitle: 'Engenharia Full-stack & IA',
    whatItDoes: 'Construção de aplicações completas e escaláveis, integrando frontend moderno com agentes de IA, automações e APIs de alta performance.',
    whoItsFor: 'Startups, produtos digitais e empresas que precisam de código limpo, velocidade e inteligência artificial nativa.',
    deliverables: 'WEB APPS · APIS · AGENTES IA · BANCO DE DADOS',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path {...gp} d="M9 7 4 12l5 5M15 7l5 5-5 5" />
      </svg>
    ),
  },
  {
    id: 's2',
    variant: 'sage',
    num: '02',
    title: 'Web Design',
    tag: 'UI/UX · FIGMA · DESIGN SYSTEM',
    detailTitle: 'Design de Interface & Direção Visual',
    whatItDoes: 'Criação de linguagens visuais exclusivas, sistemas de design consistentes e interfaces focadas em usabilidade e autoridade de marca.',
    whoItsFor: 'Marcas e fundadores que desejam elevar a percepção de valor e criar uma presença digital memorável.',
    deliverables: 'UI/UX · DESIGN SYSTEM · PROTÓTIPOS FIGMA · ART DIRECTION',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect {...gp} x="4" y="4" width="16" height="16" rx="1.5" />
        <path {...gp} d="M4 9h16M9 9v11" />
      </svg>
    ),
  },
  {
    id: 's3',
    variant: 'graphite',
    num: '03',
    title: 'Motion / Interação',
    tag: 'GSAP · LENIS · THREE.JS · SHADERS',
    detailTitle: 'Motion & Engenharia Criativa',
    whatItDoes: 'Animações fluidas a 60fps, transições cinematográficas e interatividade WebGL que transformam páginas comuns em experiências vivas.',
    whoItsFor: 'Projetos que buscam destaque criativo, prêmios internacionais e engajamento acima da média.',
    deliverables: 'GSAP SCROLL · THREE.JS · WEBGL · MICRO-INTERAÇÕES',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path {...gp} d="M4 17C8 6 16 6 20 17" />
        <circle {...gp} cx="12" cy="9.4" r="1.6" />
      </svg>
    ),
  },
  {
    id: 's4',
    variant: 'sage',
    num: '04',
    title: 'Estratégia / SEO',
    tag: 'CORE VITALS · SEO · GROWTH',
    detailTitle: 'Performance & Otimização Técnica',
    whatItDoes: 'Otimização minuciosa para carregamento instantâneo, pontuação 100 no Core Web Vitals e indexação técnica máxima no Google.',
    whoItsFor: 'Negócios que buscam tráfego qualificado, melhor conversão e máxima velocidade em qualquer dispositivo.',
    deliverables: 'CORE VITALS 100/100 · SEO ON-PAGE · CRO · ANALYTICS',
    glyph: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <circle {...gp} cx="11" cy="11" r="6" />
        <path {...gp} d="m20 20-4-4" />
      </svg>
    ),
  },
];

const CARD_MEDIA =
  'https://res.cloudinary.com/dwmrunhxa/video/upload/q_auto:good,f_auto,w_600/v1787695773/4382-178617337_sqbb03.mp4';

const SAGE_GRADIENT =
  'radial-gradient(ellipse 90% 80% at 50% 38%, #9ab2b0 0%, #7f9795 52%, #68807e 100%)';
const GRAPHITE_GRADIENT =
  'linear-gradient(160deg, #222b2a 0%, #171e1e 55%, #101515 100%)';

const CARD_W = 250;
const CARD_H = 330;

const layout = () => {
  if (typeof window === 'undefined') {
    return { mobile: false, deckScale: 0.92, finalScale: 1.0, gap: 20 };
  }
  const mobile = window.innerWidth < 1024;
  return {
    mobile,
    deckScale: mobile ? 0.68 : 0.92,
    finalScale: mobile ? 0.72 : 1.0,
    gap: mobile ? 16 : 20,
  };
};

const deckPose = (i: number) => {
  const { mobile, deckScale } = layout();
  return {
    x: () => (i - 1.5) * (mobile ? 4 : 10),
    y: () => (i - 1.5) * (mobile ? 3 : 6),
    rotationZ: () => (i - 1.5) * (mobile ? 2.2 : 3.5),
    rotationY: () => (i - 1.5) * (mobile ? 3 : 5),
    scale: () => deckScale,
  };
};

const finalPose = (i: number) => ({
  x: () => {
    const { mobile, finalScale, gap } = layout();
    const w = CARD_W * finalScale;
    if (mobile) return ((i % 2) - 0.5) * (w + gap);
    return (i - 1.5) * (w + gap);
  },
  y: () => {
    const { mobile, finalScale, gap } = layout();
    const h = CARD_H * finalScale;
    if (mobile) return (Math.floor(i / 2) - 0.5) * (h + gap);
    return 0;
  },
  rotationZ: 0,
  rotationY: 0,
  scale: () => layout().finalScale,
});

const TECH_TAGS = ['FRONTEND', 'BACKEND', 'WEBGL', 'GSAP', 'FIGMA', 'IA / LLM'];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const techColRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [flippedId, setFlippedId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      if (prefersReducedMotion) {
        cards.forEach((card, i) => {
          gsap.set(card, {
            ...finalPose(i),
            xPercent: -50,
            yPercent: -50,
            transformPerspective: 1200,
          });
        });
        return;
      }

      cards.forEach((card, i) => {
        gsap.set(card, {
          ...deckPose(i),
          xPercent: -50,
          yPercent: -50,
          transformPerspective: 1200,
        });
      });

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      entranceTl.from(cards, {
        scale: 0.72,
        y: '+=45',
        opacity: 0,
        duration: 1.0,
        stagger: 0.09,
        ease: 'power3.out',
      });

      if (headerRef.current) {
        entranceTl.from(
          headerRef.current.children,
          {
            y: -16,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.45'
        );
      }

      if (headerLineRef.current) {
        entranceTl.fromTo(
          headerLineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.85, ease: 'expo.out' },
          '-=0.5'
        );
      }

      if (microRef.current) {
        entranceTl.from(
          microRef.current.querySelectorAll('[data-micro]'),
          {
            opacity: 0,
            y: 15,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.55'
        );
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          {
            ...deckPose(i),
            xPercent: -50,
            yPercent: -50,
          },
          {
            ...finalPose(i),
            xPercent: -50,
            yPercent: -50,
            ease: 'power2.out',
            duration: 1,
            immediateRender: false,
          },
          i * 0.12
        );
      });

      if (techColRef.current) {
        gsap.fromTo(
          techColRef.current,
          { yPercent: 6 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
          }
        );
      }
      if (runnerRef.current) {
        gsap.fromTo(
          runnerRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative z-30 w-full h-[300vh] bg-[#FFFFFF] text-[#121818] select-none"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden mix-blend-multiply opacity-[0.22]">
          <div className="animate-grain absolute -top-[50%] -left-[50%] w-[200%] h-[200%]">
            <svg className="w-full h-full">
              <filter id="servicesNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#servicesNoise)" />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none absolute top-3 sm:top-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">
          +
        </div>
        <div className="pointer-events-none absolute top-3 sm:top-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">
          +
        </div>
        <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-3 sm:left-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">
          +
        </div>
        <div className="pointer-events-none absolute bottom-3 sm:bottom-5 right-3 sm:right-6 z-30 font-mono text-[10px] sm:text-[11px] text-[#27534b]/20 select-none">
          +
        </div>

        <div
          ref={headerRef}
          className="absolute top-7 sm:top-10 md:top-14 inset-x-6 sm:inset-x-10 md:inset-x-16 lg:inset-x-20 z-20 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl text-[#bed1cb] leading-none tracking-tight">
              04
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-wider text-[#6f948a] uppercase [writing-mode:vertical-lr] rotate-180">
                /capacidades
              </span>
            </div>
          </div>
          <div ref={headerLineRef} className="flex-1 h-px bg-[#27534b]/12 mx-4 sm:mx-8 md:mx-10" />
          <div className="font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-[#35635a] uppercase shrink-0 font-medium">
            /SERVIÇOS
          </div>
        </div>

        <div ref={microRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div
            data-micro
            className="absolute top-[6.5rem] sm:top-[7.8rem] md:top-[9rem] lg:top-[10rem] left-6 sm:left-10 md:left-16 lg:left-20 flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase"
          >
            <span className="text-zinc-400">[</span>
            <span className="text-[#27534b] font-medium">CAPACIDADES TÉCNICAS // 04 PILARES</span>
            <span className="text-zinc-400">]</span>
          </div>

          <div
            ref={techColRef}
            data-micro
            className="hidden lg:flex absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 flex-col gap-2.5 will-change-transform"
          >
            <div className="font-mono text-[7.5px] tracking-[0.25em] text-[#27534b]/60 uppercase mb-1">
              [ STACK ]
            </div>
            {TECH_TAGS.map((t) => (
              <span key={t} className="font-mono text-[8.5px] tracking-[0.2em] text-[#6f948a]/65 uppercase">
                <span className="text-[#bed1cb] mr-1.5">{'//'}</span>
                {t}
              </span>
            ))}
          </div>

          <div
            ref={runnerRef}
            data-micro
            className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 will-change-transform"
          >
            <span className="block font-mono text-[8.5px] tracking-[0.32em] uppercase text-[#6f948a]/50 [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
              DESIGN · CÓDIGO · MOTION · IA
            </span>
          </div>

          <div
            data-micro
            className="absolute bottom-6 sm:bottom-9 md:bottom-12 inset-x-6 sm:inset-x-10 md:inset-x-16 lg:inset-x-20 flex items-center justify-between font-mono text-[7.5px] sm:text-[8px] tracking-[0.22em] uppercase text-[#4a6a63]/80 border-t border-[#27534b]/10 pt-3 sm:pt-4"
          >
            <div className="flex items-center">
              <span>[ DISPONÍVEL PARA PROJETOS SELECIONADOS ]</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-zinc-400">{'//'}</span>
              <span className="text-[#27534b] font-medium">EST. 2026</span>
              <span className="text-zinc-400">{'//'}</span>
              <span>CRAFT & CODE</span>
            </div>
          </div>
        </div>

        {CARDS.map((card, index) => {
          const dark = card.variant === 'graphite';
          const ink = dark ? 'text-white' : 'text-[#10201c]';
          const inkSoft = dark ? 'text-white/75' : 'text-[#10201c]/80';
          const isFlipped = flippedId === card.id;

          return (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => setFlippedId((prev) => (prev === card.id ? null : card.id))}
              className="group absolute left-1/2 top-1/2 w-[250px] h-[330px] cursor-pointer will-change-transform [perspective:1000px]"
              style={{
                zIndex: 10 - index,
              }}
            >
              <div
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-out rounded-2xl ${
                  isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
                }`}
              >
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [WebkitBackfaceVisibility:hidden] border border-black/10 antialiased"
                  style={{
                    background: dark ? GRAPHITE_GRADIENT : SAGE_GRADIENT,
                  }}
                >
                  <div className="absolute top-4.5 inset-x-5 flex items-center justify-between z-20">
                    <span className={`font-mono text-[7.5px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border backdrop-blur-xs ${
                      dark ? 'border-white/15 bg-white/10 text-white/80' : 'border-black/10 bg-black/10 text-[#10201c]'
                    }`}>
                      DETALHES ↺
                    </span>
                    <span className={`font-mono text-[13px] font-medium tracking-[0.2em] ${inkSoft}`}>
                      {card.num}
                    </span>
                  </div>

                  <div
                    className={`absolute top-[44%] -translate-y-1/2 inset-x-2.5 h-[142px] rounded-xl overflow-hidden isolate ${
                      dark ? 'ring-1 ring-white/15' : 'ring-1 ring-[#10201c]/12'
                    }`}
                  >
                    <video
                      src={CARD_MEDIA}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#27534b] mix-blend-color opacity-85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {card.icon3d ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={card.icon3d}
                          alt=""
                          className="w-16 h-16 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
                        />
                      ) : (
                        <div className="w-8 h-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500 ease-out">
                          {card.glyph}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-4.5 inset-x-5">
                    <h3 className={`font-sans font-light text-[20px] sm:text-[21px] leading-tight tracking-[-0.03em] ${ink}`}>
                      {card.title}
                    </h3>
                    <p className={`font-mono text-[8px] sm:text-[8.5px] tracking-[0.16em] uppercase mt-1.5 ${inkSoft}`}>
                      {card.tag}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] [WebkitBackfaceVisibility:hidden] [transform:rotateY(180deg)] p-5 flex flex-col justify-between select-none antialiased ${
                    dark ? 'border border-white/15' : 'border border-[#27534b]/20'
                  }`}
                  style={{
                    background: dark ? GRAPHITE_GRADIENT : SAGE_GRADIENT,
                  }}
                >
                  <div className={`flex items-center justify-between border-b pb-2 ${dark ? 'border-white/10' : 'border-[#10201c]/10'}`}>
                    <span className={`font-mono text-[8px] tracking-[0.2em] uppercase font-semibold ${dark ? 'text-white/90' : 'text-[#10201c]'}`}>
                      [ 0{index + 1} {'//'} ESCOPO ]
                    </span>
                    <span className={`font-mono text-[8px] tracking-[0.16em] uppercase ${inkSoft}`}>
                      {card.title}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 my-auto">
                    <div>
                      <h4 className={`font-sans font-normal text-[14px] leading-tight tracking-tight ${ink}`}>
                        {card.detailTitle}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className={`font-mono text-[7px] tracking-[0.22em] uppercase font-semibold ${dark ? 'text-[#a3c9c1]' : 'text-[#27534b]'}`}>
                        O QUE FAZ:
                      </span>
                      <p className={`font-mono text-[8.5px] leading-[1.48] tracking-normal ${inkSoft}`}>
                        {card.whatItDoes}
                      </p>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className={`font-mono text-[7px] tracking-[0.22em] uppercase font-semibold ${dark ? 'text-[#a3c9c1]' : 'text-[#27534b]'}`}>
                        PARA QUEM É:
                      </span>
                      <p className={`font-mono text-[8.5px] leading-[1.48] tracking-normal ${inkSoft}`}>
                        {card.whoItsFor}
                      </p>
                    </div>
                  </div>

                  <div className={`border-t pt-2 flex flex-col gap-0.5 ${dark ? 'border-white/10' : 'border-[#10201c]/10'}`}>
                    <span className={`font-mono text-[6.5px] tracking-[0.22em] uppercase ${dark ? 'text-white/50' : 'text-[#10201c]/50'}`}>
                      ENTREGÁVEIS:
                    </span>
                    <span className={`font-mono text-[7px] tracking-[0.14em] uppercase ${ink} truncate`}>
                      {card.deliverables}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
