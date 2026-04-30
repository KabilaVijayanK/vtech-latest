import { ArrowRight } from "lucide-react";
import { PageKey } from "@/lib/site";

export const CtaSection = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="container py-20 text-primary-foreground flex flex-col md:flex-row md:items-center justify-between gap-8 relative">
        <div>
          <h2 className="font-display font-bold text-4xl md:text-5xl">Ready to solve your conveying challenge?</h2>
          <p className="text-white/80 mt-3 text-lg">Talk to our engineers today.</p>
        </div>
        <button
          onClick={() => onNavigate("contact")}
          className="font-label text-[11px] bg-white text-primary hover:bg-white/90 px-8 py-4 inline-flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          Get In Touch <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
