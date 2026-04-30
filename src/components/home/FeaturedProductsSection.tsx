import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductMedia } from "@/components/ProductMedia";
import { PRODUCTS, PageKey } from "@/lib/site";

const FEATURED_IDS = ["slat-chain", "roller", "belt"] as const;

export const FeaturedProductsSection = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  const featured = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="py-24 bg-white">
      <div className="container">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-label text-[11px] text-primary">Our Range</span>
              <h2 className="font-display font-bold text-5xl md:text-6xl mt-3 text-ink">
                Our Conveyor Solutions
              </h2>
              <p className="text-ink-secondary mt-3 text-lg">Engineered for every application.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <button
                onClick={() => onNavigate("products")}
                className="product-card text-left bg-white border border-border w-full h-full p-6 flex flex-col"
              >
                <div className="aspect-[10/7] mb-6">
                  <ProductMedia product={p} />
                </div>
                <span className="font-label text-[10px] text-primary mb-2">{p.category}</span>
                <h3 className="font-display font-bold text-2xl text-ink mb-2">{p.name}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{p.short}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-primary font-label text-[11px]">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate("products")}
            className="font-label text-[11px] border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-4 inline-flex items-center gap-2 transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
