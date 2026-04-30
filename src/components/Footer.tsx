import { COMPANY, NAV, PRODUCTS, PageKey } from "@/lib/site";
import { VLogo } from "./Brand";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = ({ onNavigate }: { onNavigate: (p: PageKey) => void }) => (
  <footer className="bg-[hsl(222_47%_6%)] text-white/80">
    <div className="container py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <VLogo className="h-8 w-8" />
          <div className="font-display font-bold text-xl text-white">
            V TECH<span className="text-primary"> INDUSTRIES</span>
          </div>
        </div>
        <p className="text-sm text-white/60 mb-4">{COMPANY.tagline}</p>
        <p className="text-sm text-white/50 leading-relaxed">{COMPANY.address}</p>
      </div>

      <div>
        <h4 className="font-label text-[11px] text-white mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {NAV.map((n) => (
            <li key={n.key}>
              <button onClick={() => onNavigate(n.key)} className="hover:text-primary transition-colors">
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-label text-[11px] text-white mb-4">Our Products</h4>
        <ul className="space-y-2 text-sm">
          {PRODUCTS.slice(0, 8).map((p) => (
            <li key={p.id}>
              <button onClick={() => onNavigate("products")} className="hover:text-primary transition-colors text-left">
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-label text-[11px] text-white mb-4">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              {COMPANY.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-primary transition-colors">
                  {p}
                </a>
              ))}
            </div>
          </li>
          <li className="flex gap-3">
            <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <a href={`mailto:${COMPANY.email}`} className="hover:text-primary transition-colors break-all">
              {COMPANY.email}
            </a>
          </li>
          <li className="flex gap-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span className="text-white/60">{COMPANY.address}</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container py-6 text-center text-xs text-white/50">
        © 2025 V Tech Industries. All rights reserved. Chennai, India.
      </div>
    </div>
  </footer>
);
