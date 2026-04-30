import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PageKey } from "@/lib/site";

const HIGHLIGHTS = [
  { k: "20+", v: "Years Experience" },
  { k: "100%", v: "In-House Build" },
  { k: "9", v: "Product Lines" },
];

export const AboutPreviewSection = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  return (
    <section className="py-24 bg-surface">
      <div className="container grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5">
          <span className="font-label text-[11px] text-primary">About VTECH</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 leading-[1.05] text-ink">
            Two decades of conveying expertise — engineered in Chennai.
          </h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <p className="text-ink-secondary leading-relaxed text-lg">
            V TECH INDUSTRIES designs and builds custom conveyor systems for a broad range of applications
            and industries. We start by understanding your operation — your throughput, your products, your
            floor — before recommending a single component.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((s) => (
              <div key={s.v} className="border-l-2 border-primary pl-4">
                <div className="font-display font-bold text-3xl text-ink">{s.k}</div>
                <div className="font-label text-[10px] text-ink-muted mt-1">{s.v}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("about")}
            className="mt-8 font-label text-[11px] text-primary inline-flex items-center gap-2 group/btn"
          >
            Learn More About Us <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};
