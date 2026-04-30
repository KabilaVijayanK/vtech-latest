import { Reveal } from "@/components/Reveal";
import { IconPrecision, IconShield, IconHandshake } from "@/components/Illustrations";

const PILLARS = [
  {
    Icon: IconPrecision,
    title: "Engineered Precision",
    text: "Custom-designed conveyors built with highest-quality components and innovative technologies.",
  },
  {
    Icon: IconShield,
    title: "Built To Last",
    text: "Every VTECH conveyor is designed for maximum uptime, easy maintenance, and long operational life.",
  },
  {
    Icon: IconHandshake,
    title: "Lifetime Partners",
    text: "First-time customers become lifetime partners. We understand your operation before we build your solution.",
  },
];

export const PillarsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <span className="font-label text-[11px] text-primary">Why VTECH</span>
            <h2 className="font-display font-bold text-5xl md:text-6xl mt-3 text-ink">
              Built on three uncompromising principles.
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="relative bg-white border border-border p-8 h-full group hover:border-primary/40 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                <div className="text-primary mb-6"><p.Icon /></div>
                <h3 className="font-display font-bold text-2xl text-ink mb-3">{p.title}</h3>
                <p className="text-ink-secondary leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
