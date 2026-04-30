import { useInView, useCountUp } from "@/hooks/use-scroll";

const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Product Variants" },
  { value: 100, suffix: "%", label: "In-House Manufacturing" },
];

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const v = useCountUp(value, 1600, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-5xl md:text-6xl tracking-tight">
        {v}
        <span className="text-white/80">{suffix}</span>
      </div>
      <div className="font-label text-[11px] text-white/70 mt-2">{label}</div>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
      <div className="container relative grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
};
