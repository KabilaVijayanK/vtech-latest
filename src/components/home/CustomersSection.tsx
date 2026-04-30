"use client";

import { useEffect, useRef, useState } from "react";

const customers = [
  { name: "Apollo", sector: "Tyres & Rubber" },
  { name: "Ashok Leyland", sector: "Commercial Vehicles" },
  { name: "TVS", sector: "Automotive" },
  { name: "Hyundai", sector: "Automobile" },
  { name: "Royal Enfield", sector: "Motorcycles" },
  { name: "DHL", sector: "Logistics" },
  { name: "Tata", sector: "Conglomerate" },
  { name: "CEAT", sector: "Tyres" },
  { name: "Ford", sector: "Automotive" },
  { name: "MRF", sector: "Tyres & Rubber" },
  { name: "Yamaha", sector: "Automotive" },
  { name: "Schaeffler", sector: "Engineering" },
];

const stats = [
  { value: "12+", label: "Marquee Clients" },
  { value: "500+", label: "Projects Delivered" },
  { value: "Pan India", label: "Presence" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function CustomerCard({
  customer,
  index,
}: {
  customer: (typeof customers)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "160px",
        flexShrink: 0,
        padding: "1.25rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRight: "0.5px solid #d1d5db",
        borderBottom: "0.5px solid #d1d5db",
        overflow: "hidden",
        cursor: "default",
        backgroundColor: hovered ? "#f9fafb" : "#ffffff",
        transition: "background-color 0.15s",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "#111827",
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.2s ease",
        }}
      />

      {/* Index */}
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "#9ca3af",
          fontWeight: 400,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name */}
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "18px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          color: "#111827",
          lineHeight: 1.1,
        }}
      >
        {customer.name}
      </span>

      {/* Sector */}
      <span
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#6b7280",
          borderTop: "0.5px solid #e5e7eb",
          paddingTop: "8px",
          marginTop: "2px",
        }}
      >
        {customer.sector}
      </span>
    </div>
  );
}

export default function CustomersSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const doubled = [...customers, ...customers];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');

        @keyframes cs-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .cs-track {
          display: flex;
          width: max-content;
          animation: cs-scroll 30s linear infinite;
        }

        .cs-track:hover {
          animation-play-state: paused;
        }

        .cs-track-wrap::before,
        .cs-track-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .cs-track-wrap::before {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }

        .cs-track-wrap::after {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }
      `}</style>

      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "4rem 1.5rem",
          fontFamily: "'Barlow', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>

          {/* Header */}
          <div
            ref={headerRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "2px solid #111827",
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6b7280",
                  margin: "0 0 6px 0",
                }}
              >
                Trusted Partnerships
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: "#111827",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Our Customers
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: 1.6,
                maxWidth: "280px",
                textAlign: "right",
                margin: 0,
              }}
            >
              Major companies across India and beyond have placed their trust in
              the performance and quality of our conveyor systems.
            </p>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "0.5px solid #d1d5db",
              marginBottom: "2px",
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "1rem 1.25rem",
                  borderRight: i < stats.length - 1 ? "0.5px solid #d1d5db" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scrolling cards */}
          <div
            className="cs-track-wrap"
            style={{
              overflow: "hidden",
              borderLeft: "0.5px solid #d1d5db",
              borderTop: "0.5px solid #d1d5db",
              position: "relative",
            }}
          >
            <div className="cs-track">
              {doubled.map((c, i) => (
                <CustomerCard
                  key={`${c.name}-${i}`}
                  customer={c}
                  index={i % customers.length}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "0.5px solid #d1d5db",
              marginTop: "2px",
              paddingTop: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#d1d5db",
              }}
            >
              Est. record — conveyor systems
            </span>
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "14px",
                color: "#6b7280",
                textAlign: "right",
              }}
            >
              From automotive giants to global logistics leaders —{" "}
              <strong style={{ color: "#111827", fontWeight: 600 }}>
                built to move what matters.
              </strong>
            </span>
          </div>

        </div>
      </section>
    </>
  );
}