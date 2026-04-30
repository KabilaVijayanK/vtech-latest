"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type PageKey = string;

interface IndustriesSectionProps {
  onNavigate?: (p: PageKey) => void;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { name: "Automotive",       desc: "Precision lines for body & assembly" },
  { name: "Food & Beverage",  desc: "Hygienic-grade handling systems"     },
  { name: "Pharmaceuticals",  desc: "GMP-compliant cleanroom conveyors"   },
  { name: "FMCG",             desc: "High-speed sortation & distribution" },
  { name: "Logistics",        desc: "Automated parcel & pallet flow"      },
  { name: "E-Commerce",       desc: "Scalable fulfilment conveyors"       },
  { name: "Textiles",         desc: "Gentle fabric & roll handling"       },
  { name: "Heavy Engineering",desc: "Load-bearing industrial systems"     },
  { name: "Packaging",        desc: "End-of-line wrapping & palletising"  },
];

const STATS = [
  { value: "9+",   label: "Sectors Covered"    },
  { value: "25+",  label: "Years Experience"   },
  { value: "500+", label: "Projects Delivered" },
];

// ─── Reveal hook (IntersectionObserver) ──────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatStrip() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="grid grid-cols-3 border border-indigo-100 bg-indigo-100 gap-px mb-10"
    >
      {STATS.map(({ value, label }, i) => (
        <div
          key={label}
          className="bg-white flex flex-col items-center justify-center py-5 px-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
          }}
        >
          <span
            className="font-display text-3xl font-extrabold text-indigo-700 leading-none mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {value}
          </span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-medium">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function IndustryCard({
  name,
  desc,
  index,
  visible,
  onClick,
}: {
  name: string;
  desc: string;
  index: number;
  visible: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white overflow-hidden cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 55}ms, transform 0.55s ease ${index * 55}ms, background 0.2s`,
        background: hovered ? "#eef0ff" : "#ffffff",
      }}
    >
      {/* Top accent bar */}
      <span
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-700 to-indigo-400"
        style={{
          width: hovered ? "100%" : "0%",
          transition: "width 0.22s ease",
        }}
      />

      <div className="px-6 py-7">
        {/* Index */}
        <span
          className="block text-[10px] font-bold tracking-[0.18em] mb-2.5"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? "#6366f1" : "#c7c9df",
            transition: "color 0.2s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name */}
        <span
          className="block text-[13px] font-extrabold uppercase tracking-[0.07em] leading-snug mb-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: hovered ? "#3730a3" : "#1a1c2e",
            transition: "color 0.2s",
          }}
        >
          {name}
        </span>

        {/* Desc */}
        <span
          className="block text-[11px] leading-relaxed"
          style={{
            color: hovered ? "#4e46d9" : "#8487a5",
            transition: "color 0.2s",
          }}
        >
          {desc}
        </span>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="absolute bottom-4 right-4 w-4 h-4 text-indigo-600"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          transition: "opacity 0.2s, transform 0.2s",
        }}
      />

      {/* Dot (idle) */}
      <span
        className="absolute bottom-[18px] right-[18px] w-[5px] h-[5px] rounded-full bg-indigo-100"
        style={{
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export const IndustriesSection = ({ onNavigate }: IndustriesSectionProps) => {
  const header = useReveal();
  const grid   = useReveal();
  const cta    = useReveal();

  return (
    <>
      {/* Google Fonts — Syne */}
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');
      `}</style>

      <section  
        className="py-20 bg-[#f5f6fa]"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div
            ref={header.ref}
            className="text-center max-w-2xl mx-auto mb-12"
            style={{
              opacity: header.visible ? 1 : 0,
              transform: header.visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-9 h-px bg-indigo-700" />
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-indigo-700 font-semibold"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Industries
              </span>
              <span className="w-9 h-px bg-indigo-700" />
            </div>

            {/* Title */}
            <h2
              className="text-4xl md:text-[46px] font-extrabold uppercase leading-[1.03] tracking-tight text-[#1a1c2e] mb-4"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Industries We{" "}
              <span className="text-indigo-700">Serve</span>
            </h2>

            {/* Body */}
            <p className="text-[15px] text-slate-500 leading-relaxed max-w-md mx-auto mb-5">
              Custom conveyor solutions engineered for the unique demands of each sector.
            </p>

            {/* Rule */}
            <span className="block w-12 h-[3px] bg-gradient-to-r from-indigo-700 to-indigo-400 mx-auto" />
          </div>

          {/* ── Stats strip ─────────────────────────────────────────────── */}
          <StatStrip />

          {/* ── Grid ────────────────────────────────────────────────────── */}
          <div
            ref={grid.ref}
            className="grid grid-cols-2 sm:grid-cols-3 border border-indigo-100 bg-indigo-100 gap-px mb-10"
          >
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard
                key={ind.name}
                name={ind.name}
                desc={ind.desc}
                index={i}
                visible={grid.visible}
                onClick={() => onNavigate?.("contact")}
              />
            ))}
          </div>

          {/* ── CTA row ─────────────────────────────────────────────────── */}
          <div
            ref={cta.ref}
            className="flex flex-wrap justify-center gap-3"
            style={{
              opacity: cta.visible ? 1 : 0,
              transform: cta.visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
            }}
          >
            {/* Primary */}
            <button
              onClick={() => onNavigate?.("contact")}
              className="
                group text-[11px] font-semibold uppercase tracking-[0.14em]
                bg-indigo-700 text-white
                px-7 py-4 flex items-center gap-2
                hover:bg-indigo-800 active:scale-[0.98]
                transition-all duration-200
              "
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary */}
            <button
              onClick={() => onNavigate?.("products")}
              className="
                text-[11px] font-semibold uppercase tracking-[0.14em]
                border border-[#c2c6e0] text-[#1a1c2e]
                px-7 py-4
                hover:bg-[#1a1c2e] hover:text-white hover:border-[#1a1c2e]
                active:scale-[0.98]
                transition-all duration-200
              "
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              View Products
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default IndustriesSection;