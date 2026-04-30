import { Reveal } from "@/components/Reveal";
import { COMPANY, PageKey } from "@/lib/site";
import { MapPin, Phone, Mail } from "lucide-react";
import { useInView, useCountUp } from "@/hooks/use-scroll";

export const PageHero = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <section className="relative bg-primary text-primary-foreground pt-36 pb-20 overflow-hidden">
    <div className="absolute inset-0 opacity-30 pattern-diag" aria-hidden />
    <div className="absolute inset-0 bg-blueprint opacity-10" aria-hidden />
    <div className="container relative">
      <Reveal>
        <span className="font-label text-[11px] text-white/70">V Tech Industries</span>
        <h1 className="font-display font-bold text-5xl md:text-7xl mt-3 leading-[0.95]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/80 text-lg">{subtitle}</p>}
      </Reveal>
    </div>
  </section>
);

const ProgressBar = ({ value, label }: { value: number; label: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const v = useCountUp(value, 1400, inView);
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-label text-[11px] text-ink">{label}</span>
        <span className="font-display font-bold text-2xl text-primary">{v}%</span>
      </div>
      <div className="h-1.5 bg-surface-alt overflow-hidden">
        <div
          className="h-full bg-primary transition-[width] duration-[1400ms]"
          style={{ width: inView ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
};

const Diagram = ({ variant }: { variant: 1 | 2 | 3 }) => {
  if (variant === 1)
    return (
      <svg viewBox="0 0 300 220" className="w-full h-full" aria-hidden>
        <rect x="10" y="60" width="280" height="100" fill="hsl(var(--primary-tint))" />
        <rect x="10" y="60" width="280" height="100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <line x1="40" y1="60" x2="40" y2="160" stroke="hsl(var(--primary))" strokeDasharray="4 4" />
        <line x1="260" y1="60" x2="260" y2="160" stroke="hsl(var(--primary))" strokeDasharray="4 4" />
        <text x="150" y="40" textAnchor="middle" fontFamily="Barlow" fontSize="10" letterSpacing="2" fill="hsl(var(--primary))">
          ON-TIME DELIVERY
        </text>
        <circle cx="150" cy="110" r="32" fill="white" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d="M138 110 L148 120 L164 102" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      </svg>
    );
  if (variant === 2)
    return (
      <svg viewBox="0 0 300 220" className="w-full h-full" aria-hidden>
        <g stroke="hsl(var(--primary))" strokeWidth="2" fill="none">
          <rect x="20" y="50" width="80" height="120" />
          <rect x="120" y="80" width="60" height="90" />
          <rect x="200" y="30" width="80" height="140" />
          <line x1="20" y1="170" x2="280" y2="170" stroke="hsl(var(--text-primary))" />
        </g>
        <g fill="hsl(var(--primary))">
          <rect x="20" y="140" width="80" height="30" />
          <rect x="120" y="140" width="60" height="30" />
          <rect x="200" y="100" width="80" height="70" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full" aria-hidden>
      <g stroke="hsl(var(--primary))" strokeWidth="2" fill="none">
        <circle cx="80" cy="110" r="50" />
        <circle cx="220" cy="110" r="50" />
        <circle cx="150" cy="110" r="30" fill="hsl(var(--primary))" />
      </g>
      <text x="150" y="116" textAnchor="middle" fontFamily="Barlow" fontWeight="700" fontSize="14" fill="white" letterSpacing="2">
        VTECH
      </text>
    </svg>
  );
};

export const AboutPage = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => (
  <div className="page-fade">
    <PageHero
      title="ABOUT V TECH INDUSTRIES"
      subtitle="A Chennai-based engineering company building custom conveyor systems that solve real industrial problems."
    />

    {/* Who we are */}
    <section className="py-24 bg-white">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20">
        <Reveal>
          <span className="font-label text-[11px] text-primary">Who We Are</span>
          <h2 className="font-display font-bold text-4xl md:text-6xl mt-4 leading-[1.05] text-ink">
            Engineering conveyor solutions that deliver uptime, efficiency, and partnership — since day one.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-5 text-ink-secondary leading-relaxed">
            <p>
              V TECH INDUSTRIES designs and builds custom conveyor systems for a broad range of applications
              and industries. From the very first conversation, our engineers focus on understanding your
              operation — your throughput, your products, your floor — before we recommend a single
              component.
            </p>
            <p>
              Two decades of hands-on experience and a fully in-house manufacturing setup let us deliver
              pre-engineered standard ranges and bespoke conveying systems with the same care. Every
              machine that leaves our floor is built to last and built to be maintained.
            </p>
            <p>
              The result: first-time customers become lifetime partners, and our installations keep running
              long after the warranty period ends.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Vision / Mission */}
    <section className="py-20 bg-surface">
      <div className="container grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-primary text-primary-foreground p-10 lg:p-12 h-full relative overflow-hidden">
            <div className="absolute inset-0 pattern-diag opacity-40" aria-hidden />
            <div className="relative">
              <span className="font-label text-[11px] text-white/70">Vision</span>
              <h3 className="font-display font-bold text-4xl md:text-5xl mt-3 leading-tight">
                To be the most trusted supplier and brand of industrial conveyors.
              </h3>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="bg-white border-2 border-primary p-10 lg:p-12 h-full">
            <span className="font-label text-[11px] text-primary">Mission</span>
            <p className="font-display text-2xl md:text-3xl mt-3 leading-tight text-ink">
              Without fail, VTECH solves our customer's industrial conveying challenges. Built to last — the
              experience transforms first-time customers into lifetime partners.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Commitment */}
    <section className="py-24 bg-white">
      <div className="container">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="font-label text-[11px] text-primary">Our Commitment</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-ink">Numbers we live by.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          <Reveal><ProgressBar value={98} label="On-Time Delivery" /></Reveal>
          <Reveal delay={120}><ProgressBar value={100} label="In-House Manufacturing" /></Reveal>
          <Reveal delay={240}><ProgressBar value={95} label="Customer Retention" /></Reveal>
        </div>
      </div>
    </section>

    {/* Why choose alternating */}
    <section className="py-24 bg-surface">
      <div className="container space-y-20">
        {[
          { v: 1 as const, label: "Delivery Excellence", title: "On-time, every time.", text: "From kickoff to commissioning, we map every milestone. In-house fabrication and assembly let us hit dates other suppliers quote but rarely meet." },
          { v: 2 as const, label: "Value & Performance", title: "Engineered for total cost of ownership.", text: "We optimise drive sizing, structural sections and wear components so you spend less on energy, spares and downtime over the life of the machine." },
          { v: 3 as const, label: "Engineering Expertise", title: "Two decades of conveying know-how.", text: "Slat chain, modular plastic, belt, roller, turntables, inclines — our team has deployed them across automotive, food, pharma, FMCG, logistics and heavy engineering." },
        ].map((row, i) => (
          <Reveal key={row.label}>
            <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <span className="font-label text-[11px] text-primary">{row.label}</span>
                <h3 className="font-display font-bold text-4xl md:text-5xl mt-3 text-ink leading-tight">{row.title}</h3>
                <p className="text-ink-secondary mt-4 leading-relaxed text-lg">{row.text}</p>
              </div>
              <div className="bg-white border border-border aspect-[3/2] p-6">
                <Diagram variant={row.v} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Company details */}
    <section className="py-20 bg-white">
      <div className="container">
        <Reveal>
          <div className="bg-surface border border-border p-8 md:p-12 grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <div className="font-label text-[10px] text-ink-muted">Address</div>
                <p className="text-ink mt-1">{COMPANY.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <div className="font-label text-[10px] text-ink-muted">Phone</div>
                {COMPANY.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-ink mt-1 hover:text-primary transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <div className="font-label text-[10px] text-ink-muted">Email</div>
                <a href={`mailto:${COMPANY.email}`} className="text-ink mt-1 block hover:text-primary transition-colors break-all">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("contact")}
              className="font-label text-[11px] bg-primary text-primary-foreground hover:bg-primary-dark px-7 py-4 transition-colors"
            >
              Talk To Our Engineers
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);
