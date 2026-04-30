import { Reveal } from "@/components/Reveal";

const QUOTE =
  "Without fail, VTECH solves our customer's industrial conveying challenges. Built to last — the experience transforms first-time customers into lifetime partners.";
const ATTRIBUTION = "— V TECH INDUSTRIES Mission";

export const TestimonialSection = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container relative max-w-4xl mx-auto text-center">
        <span
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 font-display font-bold text-[16rem] leading-none select-none pointer-events-none"
          style={{ color: "hsl(var(--primary) / 0.08)" }}
        >
          “
        </span>
        <Reveal>
          <p className="relative font-display text-3xl md:text-5xl leading-tight text-ink">{QUOTE}</p>
          <p className="font-label text-[11px] text-primary mt-8">{ATTRIBUTION}</p>
        </Reveal>
      </div>
    </section>
  );
};
