import { ArrowRight, Cog, Wrench, ShieldCheck, Cpu, ClipboardCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageKey } from "@/lib/site";

const SERVICES = [
  { n: "01", title: "Custom Design", text: "Bespoke conveyor engineering from scratch.", Icon: Cog },
  { n: "02", title: "Installation", text: "On-site setup and commissioning.", Icon: Wrench },
  { n: "03", title: "Maintenance", text: "Preventive & breakdown support.", Icon: ShieldCheck },
  { n: "04", title: "Integration", text: "PLC, sensors and automation.", Icon: Cpu },
  { n: "05", title: "Consultation", text: "Audits and improvement plans.", Icon: ClipboardCheck },
];

export const ServicesPreviewSection = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  return (
    <section className="py-24 bg-surface-alt">
      <div className="container">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-label text-[11px] text-primary">What We Do</span>
              <h2 className="font-display font-bold text-5xl md:text-6xl mt-3 text-ink leading-[1.05]">
                End-to-end conveyor services.
              </h2>
              <p className="text-ink-secondary mt-3 text-lg max-w-xl">
                Design, build, install, integrate, and maintain — all under one roof.
              </p>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="font-label text-[11px] border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 inline-flex items-center gap-2 transition-colors self-start"
            >
              All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <button
                onClick={() => onNavigate("services")}
                className="product-card text-left bg-white border border-border w-full h-full p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-2xl text-primary">{s.n}</span>
                  <s.Icon className="w-5 h-5 text-ink-muted" />
                </div>
                <h3 className="font-display font-bold text-xl text-ink leading-tight">{s.title}</h3>
                <p className="text-ink-secondary text-sm mt-2 leading-relaxed">{s.text}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
