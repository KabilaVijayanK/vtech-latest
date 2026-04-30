import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS, ProductCategory, PageKey } from "@/lib/site";
import { ProductMedia } from "@/components/ProductMedia";
import { PageHero } from "./AboutPage";

const FILTERS: ("All" | ProductCategory)[] = [
  "All",
  "Heavy Duty",
  "Material Handling",
  "Specialty",
  "Automated",
  "Conveyors",
  "Filtration Systems",
  "Special Purpose Machines",
  "Oil Skimmers",
  "Machine Protection",
];

export const ProductsPage = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="page-fade">
      <PageHero
        title="OUR PRODUCT RANGE"
        subtitle="Pre-engineered and custom conveyors for every industrial application."
      />

      <section className="py-10 bg-white border-b border-border  top-[50px] z-30 bg-white/95 backdrop-blur">
        <div className="container">
          <div className="flex flex-wrap gap-2 md:gap-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-label text-[11px] py-2 px-1 border-b-2 transition-colors ${
                  filter === f ? "text-primary border-primary" : "text-ink-secondary border-transparent hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 100}>
              <article className="product-card bg-white border border-border h-full p-6 flex flex-col">
                <span className="self-start font-label text-[10px] bg-primary-tint text-primary px-2.5 py-1">
                  {p.category}
                </span>
                <div className="aspect-[10/7] my-6">
                  <ProductMedia product={p} />
                </div>
                <h3 className="font-display font-bold text-xl text-ink leading-tight">{p.name}</h3>
                <p className="text-ink-secondary text-sm mt-2 leading-relaxed">{p.short}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {p.features.map((f) => (
                    <li key={f} className="text-[11px] text-ink-secondary border border-border px-2 py-1">
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate("contact")}
                  className="mt-6 font-label text-[11px] text-primary inline-flex items-center gap-2 self-start group/btn"
                >
                  Enquire Now <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-ink-muted py-12">No products in this category.</p>
        )}
      </section>
    </div>
  );
};
