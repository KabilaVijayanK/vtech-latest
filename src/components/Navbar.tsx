import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, COMPANY, PageKey } from "@/lib/site";
import { Wordmark } from "./Brand";

type Props = {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
};

export const Navbar = ({ current, onNavigate }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (p: PageKey) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-nav py-2"
            : "bg-white/100 py-4"
        }`}
      >
        <div className="container flex items-center justify-between gap-6">
          <button onClick={() => go("home")} className="flex items-center" aria-label="V Tech Industries home">
            <Wordmark />
          </button>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`nav-link font-label text-[12px] ${
                  current === n.key ? "text-primary active" : "text-ink-secondary hover:text-primary"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-ink-secondary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{COMPANY.phones[0]}</span>
            </a>
            <button
              onClick={() => go("contact")}
              className="font-label text-[11px] bg-primary text-primary-foreground hover:bg-primary-dark px-5 py-3 transition-colors"
            >
              Get Quote
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-primary text-primary-foreground transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container pt-28 pb-10 h-full flex flex-col">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV.map((n, i) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className="text-left font-display text-4xl font-bold py-3 border-b border-white/15"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transition: "all 0.5s var(--transition-smooth)",
                }}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-3 text-sm">
            <a href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {COMPANY.phones[0]}
            </a>
            <p className="text-white/80">{COMPANY.email}</p>
            <p className="text-white/70 text-xs">{COMPANY.address}</p>
          </div>
        </div>
      </div>
    </>
  );
};
