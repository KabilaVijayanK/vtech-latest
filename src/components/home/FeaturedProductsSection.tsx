"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, PageKey } from "@/lib/site";
import { ProductMedia } from "@/components/ProductMedia";

/* ─────────────────────────────────────────────────────────────
   Slide data
───────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    productId: "slat-chain",
    title: "slat-chain conveyors",
    tagline: "Heavy-load chain slat systems engineered for continuous industrial material movement.",
    accent: "#5EB4F4",
    accentDim: "rgba(94,180,244,0.12)",
    bg: "radial-gradient(ellipse at 50% 0%, #1a3a5c 0%, #0d1f35 50%, #060e1a 100%)",
    mist: "rgba(94,180,244,0.22)",
    lineColor: "rgba(140,195,240,0.15)",
    particles: [[120, 170, 225],[180, 215, 245],[90, 155, 210]] as [number,number,number][],
  },
  {
    productId: "roller",
    title: "roller conveyors",
    tagline: "Powered and gravity roller systems for smooth, accurate transport of cartons & pallets.",
    accent: "#F4A85E",
    accentDim: "rgba(244,168,94,0.12)",
    bg: "radial-gradient(ellipse at 50% 0%, #3d2a1a 0%, #261510 50%, #0f0805 100%)",
    mist: "rgba(230,165,80,0.22)",
    lineColor: "rgba(230,165,80,0.15)",
    particles: [[230, 165, 75],[205, 140, 55],[245, 185, 105]] as [number,number,number][],
  },
  {
    productId: "turntable",
    title: "turntable conveyors",
    tagline: "Rotating platforms for efficient material handling and processing.",
    accent: "#78D478",
    accentDim: "rgba(120,212,120,0.12)",
    bg: "radial-gradient(ellipse at 50% 0%, #162616 0%, #0c180c 50%, #050d05 100%)",
    mist: "rgba(100,185,100,0.22)",
    lineColor: "rgba(100,185,100,0.15)",
    particles: [[85, 185, 105],[105, 205, 125],[65, 165, 85]] as [number,number,number][],
  },
];

/* ─────────────────────────────────────────────────────────────
   Inject global keyframes once
───────────────────────────────────────────────────────────── */
function injectGlobalStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("fps-global-styles")) return;
  const s = document.createElement("style");
  s.id = "fps-global-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap');

    @keyframes fps-float {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      33%      { transform: translateY(-8px) rotate(0.4deg); }
      66%      { transform: translateY(4px) rotate(-0.3deg); }
    }
    @keyframes fps-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes fps-scan {
      0%   { transform: translateY(-100%); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateY(400%); opacity: 0; }
    }
    @keyframes fps-pulse-ring {
      0%   { transform: scale(1);   opacity: 0.7; }
      100% { transform: scale(1.6); opacity: 0;   }
    }
    @keyframes fps-badge-in {
      0%   { opacity: 0; transform: translateX(-12px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes fps-counter {
      0%   { transform: translateY(100%); opacity: 0; }
      100% { transform: translateY(0);    opacity: 1; }
    }
    @keyframes fps-line-draw {
      0%   { stroke-dashoffset: 600; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes fps-glow-pulse {
      0%,100% { opacity: 0.4; }
      50%      { opacity: 0.9; }
    }
    @keyframes fps-char-in {
      0%   { opacity: 0; transform: translateY(40px) rotateX(-90deg); }
      100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
    }
    .fps-btn-shine::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
      background-size: 200% 100%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .fps-btn-shine:hover::after {
      opacity: 1;
      animation: fps-shimmer 0.65s ease forwards;
    }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────────────────────
   Particle canvas
───────────────────────────────────────────────────────────── */
function Particles({ colors, active }: { colors: [number,number,number][]; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const pts = Array.from({ length: 130 }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        sz: Math.random() * 2.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.55 + 0.06),
        op: Math.random() * 0.7 + 0.15,
        ph: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.04 + 0.008,
        r: c[0], g: c[1], b: c[2],
        trail: [] as {x:number;y:number}[],
      };
    });

    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pts) {
        p.ph += p.ps;
        const a = p.op * (0.5 + 0.5 * Math.sin(p.ph));

        if (p.sz > 1.8 && p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (const t of p.trail) ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${a * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${a})`;
        ctx.fill();

        if (p.sz > 1.6) {
          const arm = p.sz * 4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - arm);
          ctx.lineTo(p.x, p.y + arm);
          ctx.moveTo(p.x - arm, p.y);
          ctx.lineTo(p.x + arm, p.y);
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${a * 0.28})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = cv.height + 10; p.x = Math.random() * cv.width; p.trail = []; }
        if (p.x < 0) p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 1,
        opacity: active ? 1 : 0.3,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated title — chars fly in with stagger
───────────────────────────────────────────────────────────── */
function AnimatedTitle({ text, visible, accent }: { text: string; visible: boolean; accent: string }) {
  const words = text.split(" ");
  let globalIdx = 0;
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: "clamp(3rem, 7vw, 5.5rem)",
      color: "#fff",
      textAlign: "center",
      letterSpacing: "0.12em",
      lineHeight: 1,
      margin: 0,
      perspective: "400px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0.28em",
    }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-flex", overflow: "hidden" }}>
          {word.split("").map((ch, ci) => {
            const idx = globalIdx++;
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(48px) rotateX(-80deg)",
                  // Reduced: duration 0.55s → 0.28s, per-char stagger 0.028s → 0.012s, initial delay 0.03s → 0s
                  transition: `opacity 0.28s cubic-bezier(0.22,1,0.36,1) ${idx * 0.012}s,
                               transform 0.28s cubic-bezier(0.22,1,0.36,1) ${idx * 0.012}s`,
                  color: wi === words.length - 1 ? accent : "#fff",
                  textShadow: wi === words.length - 1
                    ? `0 0 40px ${accent}99, 0 2px 48px rgba(0,0,0,0.8)`
                    : "0 2px 48px rgba(0,0,0,0.7)",
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated scan lines SVG decoration
───────────────────────────────────────────────────────────── */
function ScanDecor({ accent, visible }: { accent: string; visible: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
      overflow: "hidden",
      // Reduced: 1s → 0.3s, delay 0.5s → 0.1s
      opacity: visible ? 1 : 0, transition: "opacity 0.3s ease 0.1s",
    }}>
      {[
        { top: 28, left: 28, rotate: "0deg" },
        { top: 28, right: 28, rotate: "90deg" },
        { bottom: 28, right: 28, rotate: "180deg" },
        { bottom: 28, left: 28, rotate: "270deg" },
      ].map((pos, i) => (
        <svg
          key={i}
          width="36" height="36"
          style={{
            position: "absolute", ...pos,
            opacity: 0.35,
            transform: `rotate(${pos.rotate})`,
          }}
          viewBox="0 0 36 36"
        >
          <path d="M2 18 L2 2 L18 2" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ))}

      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: `linear-gradient(to right, transparent, ${accent}55, transparent)`,
        animation: "fps-scan 4s ease-in-out infinite",
        animationDelay: `${Math.random() * 2}s`,
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Slide index counter
───────────────────────────────────────────────────────────── */
function SlideCounter({ index, total, accent }: { index: number; total: number; accent: string }) {
  return (
    <div style={{
      position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)",
      zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === index ? 2 : 1,
            height: i === index ? 28 : 14,
            borderRadius: 2,
            background: i === index ? accent : "rgba(255,255,255,0.2)",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: i === index ? `0 0 10px ${accent}88` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Magnetic CTA button
───────────────────────────────────────────────────────────── */
function MagneticButton({
  onClick,
  visible,
  accent,
}: {
  onClick: () => void;
  visible: boolean;
  accent: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    setPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHov(false);
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {hov && (
        <div style={{
          position: "absolute", inset: -8,
          borderRadius: 4,
          border: `1px solid ${accent}55`,
          animation: "fps-pulse-ring 0.9s ease-out infinite",
          pointerEvents: "none",
        }} />
      )}
      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="fps-btn-shine"
        style={{
          position: "relative",
          fontFamily: "'Barlow', sans-serif",
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: hov ? "#fff" : "rgba(255,255,255,0.85)",
          background: hov ? `${accent}28` : "rgba(255,255,255,0.05)",
          border: `1px solid ${hov ? accent : "rgba(255,255,255,0.18)"}`,
          padding: "14px 48px", cursor: "pointer",
          backdropFilter: "blur(12px)",
          display: "inline-flex", alignItems: "center", gap: 10,
          overflow: "hidden",
          transform: visible
            ? `translateY(0) translate(${pos.x}px, ${pos.y}px)`
            : "translateY(18px)",
          opacity: visible ? 1 : 0,
          // Reduced: 0.5s → 0.25s, delay 0.5s → 0.2s
          transition: `
            opacity 0.25s ease 0.2s,
            transform ${hov ? "0.15s" : "0.25s"} ${hov ? "ease" : "cubic-bezier(0.22,1,0.36,1) 0.2s"},
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.2s ease
          `,
          boxShadow: hov ? `0 8px 40px ${accent}30, 0 0 0 1px ${accent}22` : "none",
        }}
      >
        View All Products
        <ArrowRight
          size={14}
          style={{
            transform: hov ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Banner with parallax + scroll progress
───────────────────────────────────────────────────────────── */
function Banner({
  slide,
  index,
  product,
  onNavigate,
}: {
  slide: typeof SLIDES[number];
  index: number;
  product: typeof PRODUCTS[number] | undefined;
  onNavigate: (p: PageKey) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);

  /* Intersection observer — reduced setTimeout delay 60ms → 20ms */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          setTimeout(() => setVisible(true), 20);
        } else {
          setVisible(false);
          setTimeout(() => setEntered(false), 300);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll-driven parallax + progress bar */
  useEffect(() => {
    const el = sectionRef.current;
    const img = imgRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const raw = (wh / 2 - (rect.top + rect.height / 2)) / (wh * 0.6);
      const ratio = Math.max(-1, Math.min(1, raw));
      setScrollRatio(ratio);

      if (img) {
        img.style.transform = `translateY(${ratio * -30}px) scale(${1 + Math.abs(ratio) * 0.04})`;
      }

      if (progressRef.current) {
        const progress = Math.max(0, Math.min(1, (wh - rect.top) / (rect.height + wh)));
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgOpacity = 1 - Math.abs(scrollRatio) * 0.4;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: slide.bg,
        padding: "5rem 0 6rem",
      }}
    >
      {/* Background noise texture layer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
        opacity: 0.6,
        mixBlendMode: "overlay",
      }} />

      {/* Radial accent glow */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%",
        transform: "translateX(-50%)",
        width: "70vw", height: "60vh",
        background: `radial-gradient(ellipse, ${slide.accent}18 0%, transparent 70%)`,
        zIndex: 0,
        animation: "fps-glow-pulse 4s ease-in-out infinite",
      }} />

      {/* Particles */}
      <Particles colors={slide.particles} active={entered} />

      {/* Scan decor */}
      <ScanDecor accent={slide.accent} visible={visible} />

      {/* Slide counter dots */}
      <SlideCounter index={index} total={SLIDES.length} accent={slide.accent} />

      {/* Bottom progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2, zIndex: 10,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${slide.accent}88, ${slide.accent})`,
            transformOrigin: "left center",
            transform: "scaleX(0)",
            transition: "transform 0.08s linear",
          }}
        />
      </div>

      {/* Ground mist */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "45%", zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to top, ${slide.mist} 0%, transparent 100%)`,
      }} />

      {/* Diagonal decorative line */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0" y1="100" x2="100" y2="0"
          stroke={slide.lineColor}
          strokeWidth="0.15"
          strokeDasharray="4 6"
        />
        <line
          x1="0" y1="80" x2="80" y2="0"
          stroke={slide.lineColor}
          strokeWidth="0.08"
        />
      </svg>

      {/* ── Main content ── */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%",
        padding: "0 24px",
        gap: "1.4rem",
      }}>

        {/* Eyebrow badge */}
        <div style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 10, fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: slide.accent,
          display: "flex", alignItems: "center", gap: 8,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
          // Reduced: 0.5s → 0.25s
          transition: "opacity 0.25s ease 0s, transform 0.25s ease 0s",
        }}>
          <span style={{
            width: 24, height: 1,
            background: slide.accent,
            display: "inline-block",
            opacity: 0.7,
          }} />
          featured product
          <span style={{
            width: 24, height: 1,
            background: slide.accent,
            display: "inline-block",
            opacity: 0.7,
          }} />
        </div>

        {/* Animated title */}
        <AnimatedTitle text={slide.title} visible={visible} accent={slide.accent} />

        {/* Product image with parallax div */}
        <div
          ref={imgRef}
          style={{
            width: "clamp(260px, 52vw, 640px)",
            aspectRatio: "16 / 9",
            opacity: visible ? imgOpacity : 0,
            // Reduced: 0.8s → 0.35s, delay 0.2s → 0.05s / 0.4s → 0.15s
            transition: visible
              ? "opacity 0.35s ease 0.05s"
              : "opacity 0.15s ease",
            willChange: "transform",
            filter: `drop-shadow(0 24px 60px ${slide.accent}30)`,
          }}
        >
          {product ? (
            <ProductMedia product={product} />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              border: `1px solid ${slide.accent}20`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.02)",
            }}>
              <span style={{
                color: slide.accent,
                fontFamily: "'Barlow', monospace",
                fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase",
                opacity: 0.5,
              }}>
                {slide.productId}
              </span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Barlow', 'Helvetica Neue', sans-serif",
          fontSize: "clamp(0.78rem, 1.5vw, 0.92rem)", fontWeight: 300,
          color: "rgba(255,255,255,0.7)", textAlign: "center",
          letterSpacing: "0.06em", margin: 0,
          maxWidth: 480,
          lineHeight: 1.7,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          // Reduced: 0.6s → 0.3s, delays 0.35s → 0.1s
          transition: "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
        }}>
          {slide.tagline}
        </p>

        {/* Magnetic CTA */}
        <div style={{ marginTop: "0.5rem" }}>
          <MagneticButton onClick={() => onNavigate("products")} visible={visible} accent={slide.accent} />
        </div>

        {/* Scroll hint — only for first slide */}
        {index === 0 && (
          <div style={{
            position: "absolute", bottom: 28,
            left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            opacity: visible ? 0.5 : 0,
            // Reduced: 0.6s → 0.3s, delay 0.9s → 0.3s
            transition: "opacity 0.3s ease 0.3s",
          }}>
            <span style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}>
              scroll
            </span>
            <div style={{
              width: 1, height: 36,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            }} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Export
───────────────────────────────────────────────────────────── */
export const FeaturedProductsSection = ({
  onNavigate,
}: {
  onNavigate: (p: PageKey) => void;
}) => {
  useEffect(() => { injectGlobalStyles(); }, []);

  return (
    <>
      {SLIDES.map((slide, i) => {
        const product = PRODUCTS.find((p) => p.id === slide.productId);
        return (
          <Banner
            key={slide.productId}
            slide={slide}
            index={i}
            product={product}
            onNavigate={onNavigate}
          />
        );
      })}
    </>
  );
};

export default FeaturedProductsSection;