import { Reveal } from "@/components/Reveal";
import { INDUSTRIES, PageKey } from "@/lib/site";
import { PageHero } from "./AboutPage";
import { Cog, Wrench, ShieldCheck, Cpu, ClipboardCheck, Factory, Truck, Beaker, ShoppingBag, Layers, Hammer, Scissors, Pill } from "lucide-react";

const SERVICES = [
  { n: "01", title: "Custom Design & Engineering", text: "Bespoke conveyor design from scratch — sized to your throughput, footprint and product handling profile.", points: ["3D layout & GA drawings", "Drive & motor sizing", "Material selection", "FAT-ready documentation"], Icon: Cog },
  { n: "02", title: "Installation & Commissioning", text: "On-site setup and system integration handled by our own engineers — no third-party handoffs.", points: ["Site survey", "Mechanical install", "Electrical & PLC tie-in", "Trial & sign-off"], Icon: Wrench },
  { n: "03", title: "Maintenance & Support", text: "Preventive and corrective maintenance programs that keep your line moving and minimise downtime.", points: ["AMC contracts", "Spare parts kits", "Wear-component tracking", "24/7 breakdown support"], Icon: ShieldCheck },
  { n: "04", title: "System Integration", text: "PLC, sensor and automation integration to make your conveyor a smart, connected part of the line.", points: ["PLC programming", "VFD & encoders", "MES / SCADA tie-in", "Safety interlocks"], Icon: Cpu },
  { n: "05", title: "Consultation & Audit", text: "Conveyor efficiency audits and improvement plans for existing installations — ours or anyone else's.", points: ["Throughput analysis", "Energy audit", "Retrofit roadmap", "ROI modelling"], Icon: ClipboardCheck },
];

const STEPS = [
  "Requirement Analysis",
  "Custom Design",
  "In-House Manufacturing",
  "Quality Testing",
  "Installation",
  "After-Sales Support",
];

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Automotive: Cog,
  "Food & Beverage": Beaker,
  Pharmaceuticals: Pill,
  FMCG: ShoppingBag,
  Logistics: Truck,
  "E-Commerce": Layers,
  Textiles: Scissors,
  "Heavy Engineering": Hammer,
  Packaging: Factory,
};

export const ServicesPage = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => (
  <div className="page-fade">
    <PageHero
      title="OUR SERVICES"
      subtitle="Design, build, install, maintain — everything you need to run a reliable conveying line, under one roof."
      backgroundImage="/services.png"
    />

    <section className="py-24 bg-white">
      <div className="container grid md:grid-cols-2 gap-6">
        {SERVICES.slice(0, 4).map((s, i) => (
          <Reveal key={s.n} delay={(i % 2) * 120}>
            <ServiceCard {...s} />
          </Reveal>
        ))}
        <Reveal>
          <div className="md:col-span-2 max-w-2xl mx-auto w-full">
            <ServiceCard {...SERVICES[4]} />
          </div>
        </Reveal>
      </div>
    </section>

    {/* Process timeline */}
    <section className="py-24 bg-surface">
      <div className="container">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-label text-[11px] text-primary">Our Process</span>
            <h2 className="font-display font-bold text-4xl md:text-6xl mt-3 text-ink leading-[1.05]">
              From requirement to running line.
            </h2>
          </div>
        </Reveal>
        <ol className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 80}>
              <li className="relative bg-white border border-border p-5 h-full">
                <div className="font-display font-bold text-primary text-3xl">0{i + 1}</div>
                <div className="font-label text-[11px] text-ink mt-2">{step}</div>
                {i < STEPS.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/40" aria-hidden />
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    {/* Industries */}
    <section className="py-24 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label text-[11px] text-primary">Industries Served</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 text-ink">Where our conveyors run.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = INDUSTRY_ICONS[ind] ?? Factory;
            return (
              <Reveal key={ind} delay={(i % 3) * 80}>
                <div className="border border-border p-6 flex items-center gap-4 hover:border-primary hover:bg-surface transition-colors h-full">
                  <Icon className="w-7 h-7 text-primary shrink-0" />
                  <span className="font-display font-bold text-xl text-ink">{ind}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="text-center mt-14">
          <button
            onClick={() => onNavigate("contact")}
            className="font-label text-[11px] bg-primary text-primary-foreground hover:bg-primary-dark px-7 py-4 transition-colors"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  </div>
);

const ServiceCard = ({
  n,
  title,
  text,
  points,
  Icon,
}: {
  n: string;
  title: string;
  text: string;
  points: string[];
  Icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="bg-white border border-border p-8 lg:p-10 h-full hover:border-primary/40 transition-colors group">
    <div className="flex items-start justify-between gap-6 mb-4">
      <div className="font-display font-bold text-5xl text-primary">{n}</div>
      <Icon className="w-8 h-8 text-ink-muted group-hover:text-primary transition-colors" />
    </div>
    <h3 className="font-display font-bold text-2xl md:text-3xl text-ink leading-tight">{title}</h3>
    <p className="text-ink-secondary mt-3 leading-relaxed">{text}</p>
    <ul className="mt-5 space-y-2">
      {points.map((p) => (
        <li key={p} className="text-sm text-ink-secondary flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-primary mt-2 shrink-0" /> {p}
        </li>
      ))}
    </ul>
  </div>
);
