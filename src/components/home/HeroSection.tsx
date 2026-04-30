import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageKey } from "@/lib/site";
import { useState, useEffect, useCallback, useRef } from "react";

const TICKER_ITEMS = [
  "Slat Chain Conveyors",
  "Roller Conveyors",
  "Belt Conveyors",
  "Modular Conveyors",
  "Cooling & Drying Conveyors",
  "Powerised Turn Table Conveyors",
  "Floor to Floor / Incline",
  "Idler Roller Conveyors",
  "Bag Closing Machine",
];

// ── Add / remove image paths here ──────────────────────────────────────────
const SLIDES = [
  { src: "/products/slat-chain.png",   alt: "Slat Chain Conveyor" },
  { src: "/products/roller.png",       alt: "Roller Conveyor" },
  { src: "/products/belt.png",         alt: "Belt Conveyor" },
  { src: "/products/modular.png",      alt: "Modular Conveyor" },
  { src: "/products/cooling.png",      alt: "Cooling & Drying Conveyor" },
];

const SLIDE_INTERVAL = 3500; // ms between auto-advances

// ── Slideshow component ─────────────────────────────────────────────────────
const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 420);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev");
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (hovered) return;
    timerRef.current = setTimeout(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, hovered, next]);

  const translateClass = animating
    ? direction === "next"
      ? "-translate-x-8 opacity-0"
      : "translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div
      className="relative w-full aspect-[6/5]"
      style={{ perspective: "900px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drop shadow beneath the image */}
      <div
        className="absolute bottom-[-12px] left-1/2 w-3/4 h-8 bg-black/15 blur-2xl rounded-full"
        style={{ transform: "translateX(-50%)" }}
      />

      {/* 3-D tilted wrapper */}
      <div
        className="absolute inset-0"
        style={{
          transform: hovered
            ? "rotateY(-6deg) rotateX(2deg) scale(1)"
            : "rotateY(-12deg) rotateX(4deg) scale(0.97)",
          transformStyle: "preserve-3d",
          filter: hovered
            ? "drop-shadow(6px 18px 36px rgba(0,0,0,0.28)) drop-shadow(2px 6px 12px rgba(0,0,0,0.16))"
            : "drop-shadow(4px 12px 24px rgba(0,0,0,0.22)) drop-shadow(1px 3px 8px rgba(0,0,0,0.12))",
          transition: "transform 0.5s ease, filter 0.5s ease",
        }}
      >
        {/* Slide image */}
        <img
          key={current}
          src={SLIDES[current].src}
          alt={SLIDES[current].alt}
          className={`w-full h-full object-contain transition-all duration-[420ms] ease-in-out ${translateClass}`}
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Slide label */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white text-[10px] font-label tracking-widest uppercase px-3 py-1 rounded-sm whitespace-nowrap"
        style={{ transition: "opacity 0.3s" }}
      >
        {SLIDES[current].alt}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white border border-black/10 text-ink shadow-sm transition-all opacity-0 group-hover:opacity-100 rounded-full"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/70 hover:bg-white border border-black/10 text-ink shadow-sm transition-all rounded-full"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            className="transition-all duration-300"
            style={{
              width: i === current ? 20 : 8,
              height: 4,
              borderRadius: 2,
              background: i === current ? "var(--color-primary, #e85d26)" : "rgba(0,0,0,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── HeroSection ─────────────────────────────────────────────────────────────
export const HeroSection = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  return (
    <section className="relative min-h-[60svh] flex flex-col bg-blueprint pt-20 pb-0">
      <div className="container flex-1 grid lg:grid-cols-5 gap-10 items-center">
        {/* Left copy */}
        <div className="lg:col-span-3">
          <Reveal>
            <span className="font-label text-[11px] text-primary inline-flex items-center gap-2">
              <span className="w-8 h-px bg-primary" /> Industrial Conveyor Systems · Chennai
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] mt-5 text-ink">
              SOLUTION PARTNER<br />
              <span className="text-primary">FOR YOUR PROCESS</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-ink-secondary leading-relaxed">
              Designing and building custom conveyor systems for a broad range of applications and
              industries — engineered to last.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("products")}
                className="font-label text-[11px] bg-primary text-primary-foreground hover:bg-primary-dark px-7 py-4 inline-flex items-center gap-2 transition-colors"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="font-label text-[11px] border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-4 transition-colors"
              >
                About Us
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right slideshow */}
        <Reveal delay={300} className="lg:col-span-2 pb-10">
          <Slideshow />
        </Reveal>
      </div>

      {/* Ticker */}
      <div className="bg-primary text-primary-foreground overflow-hidden mt-8">
        <div className="ticker-track flex gap-12 whitespace-nowrap py-4 font-label text-[12px]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t} <span className="text-white/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};