import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ZoomIn, X, ChevronRight, Package, Star, Truck, Shield, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductMedia } from "@/components/ProductMedia";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* ─── Responsive breakpoints via CSS custom props ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; }

  .pd-page { --gap: 1.5rem; }

  /* Hero grid */
  .pd-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  /* Related grid */
  .pd-related-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  /* Features grid */
  .pd-feat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  /* Apps grid */
  .pd-app-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  /* Tablet */
  @media (max-width: 900px) {
    .pd-hero-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .pd-related-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-feat-grid {
      grid-template-columns: 1fr;
    }
    .pd-app-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .pd-cta-banner {
      flex-direction: column !important;
      text-align: center;
    }
    .pd-cta-banner-btns {
      justify-content: center;
    }
  }

  /* Mobile */
  @media (max-width: 580px) {
    .pd-related-grid {
      grid-template-columns: 1fr 1fr;
    }
    .pd-app-grid {
      grid-template-columns: 1fr 1fr;
    }
    .pd-cta-row {
      flex-direction: column !important;
    }
    .pd-cta-row button {
      flex: none !important;
      width: 100%;
    }
    .pd-tab-header {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .pd-tab-header::-webkit-scrollbar { display: none; }
    .pd-hero-info h1 {
      font-size: 1.65rem !important;
    }
    .pd-trust-row {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  @media (max-width: 380px) {
    .pd-related-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pd-fadein { animation: fadeUp 0.45s ease both; }
  .pd-fadein-d1 { animation-delay: 0.05s; }
  .pd-fadein-d2 { animation-delay: 0.12s; }
  .pd-fadein-d3 { animation-delay: 0.2s; }

  /* Hover effects */
  .pd-rel-card:hover .pd-rel-img-el {
    transform: scale(1.07) !important;
  }
  .pd-rel-card:hover {
    border-color: #c8c4bc !important;
    box-shadow: 0 6px 24px rgba(0,0,0,0.08) !important;
  }
  .pd-thumb:hover {
    border-color: #1a6b4a !important;
  }
  .pd-btn-primary:hover { background: #2a2a2a !important; }
  .pd-btn-outline:hover { border-color: #999 !important; }
`;

/* ─── Check icon ─── */
const Check = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#1a6b4a" strokeWidth="2.5">
    <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" />
  </svg>
);

/* ─── Trust badges ─── */
const trustItems = [
  { icon: <Truck size={15} color="#1a6b4a" />, label: "Fast Dispatch" },
  { icon: <Shield size={15} color="#1a6b4a" />, label: "Quality Assured" },
  { icon: <Package size={15} color="#1a6b4a" />, label: "Safe Packaging" },
  { icon: <Star size={15} color="#1a6b4a" />, label: "ISO Certified" },
];

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeThumb, setActiveThumb] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setActiveThumb(0);
  }, [id]);

  const product = PRODUCTS.find((p) => p.id === id);
  const images = product?.image ? [product.image] : [];
  const currentImage = images[activeThumb] || null;

  const parseSpec = (spec: string) => {
    const idx = spec.indexOf(":");
    if (idx === -1) return { label: spec, value: "" };
    return { label: spec.slice(0, idx).trim(), value: spec.slice(idx + 1).trim() };
  };

  const related = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const tabs = [
    product?.description && "description",
    product?.features?.length && "features",
    product?.specifications?.length && "specifications",
    product?.applications?.length && "applications",
  ].filter(Boolean) as string[];

  /* ── 404 ── */
  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#f7f6f3", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar current="products" onNavigate={() => navigate("/")} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a1a" }}>Product Not Found</h1>
          <p style={{ color: "#888" }}>The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} style={{ marginTop: 16 }}>
            <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back to Home
          </Button>
        </div>
        <Footer onNavigate={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="pd-page" style={{ minHeight: "100vh", background: "#f7f6f3", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{globalStyles}</style>

      {/* ── Zoom Overlay ── */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: "1rem" }}
        >
          {currentImage
            ? <img src={currentImage} alt={product.name} onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 12 }} />
            : <div style={{ color: "#fff" }}>No image</div>
          }
          <button onClick={() => setZoomed(false)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
            <X size={20} />
          </button>
        </div>
      )}

      <Navbar current="products" onNavigate={() => navigate("/")} />

      <main style={{ flex: 1, paddingTop: 60 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e5df", padding: "0.55rem 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <Breadcrumb>
              <BreadcrumbList style={{ flexWrap: "wrap", gap: "0.25rem" }}>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate("/")} style={{ cursor: "pointer", fontSize: "0.8rem" }}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight size={13} /></BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate("/products")} style={{ cursor: "pointer", fontSize: "0.8rem" }}>Products</BreadcrumbLink>
                </BreadcrumbItem>
                {product.category && (
                  <>
                    <BreadcrumbSeparator><ChevronRight size={13} /></BreadcrumbSeparator>
                    <BreadcrumbItem><BreadcrumbPage style={{ fontSize: "0.8rem" }}>{product.category}</BreadcrumbPage></BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator><ChevronRight size={13} /></BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage style={{ fontSize: "0.8rem", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Back btn ── */}
          <button
            onClick={() => navigate("/products")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #e8e5df", borderRadius: 8, padding: "0.35rem 0.9rem", fontSize: "0.8rem", color: "#666", cursor: "pointer", fontFamily: "inherit", margin: "1.1rem 0 1rem" }}
          >
            <ArrowLeft size={13} /> Back to Products
          </button>

          {/* ════════════════════════════
              HERO GRID
          ════════════════════════════ */}
          <div
            className="pd-hero-grid pd-fadein"
            style={{ background: "#fff", border: "1px solid #e8e5df", borderRadius: 20, padding: "1.5rem", marginBottom: "1rem" }}
          >
            {/* LEFT: Gallery */}
            <div>
              {/* Main image */}
              <div
                onClick={() => currentImage && setZoomed(true)}
                style={{
                  position: "relative", borderRadius: 14, overflow: "hidden", background: "#ffffff",
                  cursor: currentImage ? "zoom-in" : "default",
                  aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "0.75rem", border: "1px solid #ffffff",
                }}
                onMouseEnter={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLImageElement;
                  if (img) img.style.transform = "scale(1.045)";
                }}
                onMouseLeave={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLImageElement;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {currentImage
                  ? <img src={currentImage} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.4s ease", display: "block" }} />
                  : <ProductMedia product={product} className="w-full h-full" />
                }
                {currentImage && (
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(255,255,255,0.92)", border: "1px solid #e8e5df", borderRadius: 6, padding: "0.25rem 0.6rem", fontSize: "0.7rem", color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
                    <ZoomIn size={11} /> Zoom
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="pd-thumb"
                      onClick={() => setActiveThumb(i)}
                      style={{ width: 62, height: 62, borderRadius: 9, overflow: "hidden", border: `2px solid ${activeThumb === i ? "#1a6b4a" : "#e8e5df"}`, cursor: "pointer", transition: "border-color 0.15s", flexShrink: 0 }}
                    >
                      <img src={src} alt={`view ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Info */}
            <div className="pd-hero-info pd-fadein pd-fadein-d1" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Category tag */}
              {product.category && (
                <span style={{ display: "inline-block", background: "#f0ebe2", color: "#7a6a52", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "0.3rem 0.85rem", borderRadius: 20, marginBottom: "1rem", alignSelf: "flex-start" }}>
                  {product.category}
                </span>
              )}

              <h1 style={{ fontFamily: "'Barlow', sans-serif", fontSize: "2.15rem", lineHeight: 1.12, color: "#1a1a1a", marginBottom: "0.75rem", fontWeight: 800 }}>
                {product.name}
              </h1>

              {product.short && (
                <p style={{ fontSize: "0.93rem", color: "#666", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  {product.short}
                </p>
              )}

              {/* Divider */}
              <div style={{ height: 1, background: "#f0ede8", marginBottom: "1.5rem" }} />

              {/* Key features */}
              {product.features?.length > 0 && (
                <div style={{ background: "#fafaf8", border: "1px solid #eee9e0", borderRadius: 12, padding: "1.1rem 1.2rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#b5a898", display: "block", marginBottom: "0.9rem" }}>
                    Key Highlights
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem 1rem" }}>
                    {product.features.slice(0, 6).map((feat, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                        <div style={{ width: 17, height: 17, borderRadius: "50%", background: "#e8f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Check />
                        </div>
                        <span style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.5 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: "1.5rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2aad6a", boxShadow: "0 0 0 3px rgba(42,173,106,0.18)" }} />
                <span style={{ fontSize: "0.82rem", color: "#1a7a4a", fontWeight: 600 }}>In Stock — Ready to ship</span>
              </div>

              {/* CTA buttons */}
              <div className="pd-cta-row" style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <button
                  className="pd-btn-primary"
                  style={{ flex: 1, background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem 1.25rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                >
                  <Phone size={14} /> Get a Quote
                </button>
                <button
                  className="pd-btn-outline"
                  style={{ flex: 1, background: "transparent", color: "#1a1a1a", border: "1.5px solid #e0dbd4", borderRadius: 10, padding: "0.85rem 1.25rem", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                >
                  <Mail size={14} /> Enquire Now
                </button>
              </div>

              {/* Trust row */}
              <div
                className="pd-trust-row"
                style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}
              >
                {trustItems.map((t, i) => (
                  <div key={i} style={{ background: "#f7f6f3", borderRadius: 9, padding: "0.6rem 0.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, border: "1px solid #eee9e0" }}>
                    {t.icon}
                    <span style={{ fontSize: "0.68rem", color: "#888", fontWeight: 500, textAlign: "center", lineHeight: 1.3 }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════
              TABS
          ════════════════════════════ */}
          {tabs.length > 0 && (
            <div className="pd-fadein pd-fadein-d2" style={{ background: "#fff", border: "1px solid #e8e5df", borderRadius: 16, overflow: "hidden", marginBottom: "1rem" }}>
              <div className="pd-tab-header" style={{ display: "flex", borderBottom: "1px solid #e8e5df", background: "#fafaf8", padding: "0 1rem" }}>
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: "none", border: "none", padding: "0.95rem 1.1rem", fontSize: "0.84rem", fontWeight: 600,
                      color: activeTab === tab ? "#1a1a1a" : "#aaa", cursor: "pointer",
                      borderBottom: `2.5px solid ${activeTab === tab ? "#1a1a1a" : "transparent"}`,
                      marginBottom: -1, fontFamily: "inherit", whiteSpace: "nowrap", transition: "color 0.15s",
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ padding: "1.75rem 2rem" }}>
                {/* Description */}
                {activeTab === "description" && product.description && (
                  <p style={{ fontSize: "0.94rem", color: "#555", lineHeight: 1.85, maxWidth: 720 }}>
                    {product.description}
                  </p>
                )}

                {/* Features */}
                {activeTab === "features" && product.features?.length > 0 && (
                  <div className="pd-feat-grid">
                    {product.features.map((feat, i) => (
                      <div key={i} style={{ background: "#f7f6f3", borderRadius: 10, padding: "1rem 1.2rem", display: "flex", gap: "0.75rem", alignItems: "flex-start", border: "1px solid #eee9e0" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#e8f5ee", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Check />
                        </div>
                        <p style={{ fontSize: "0.86rem", color: "#1a1a1a", lineHeight: 1.55, margin: 0 }}>{feat}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specifications */}
                {activeTab === "specifications" && product.specifications?.length > 0 && (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {product.specifications.map((spec, i) => {
                        const { label, value } = parseSpec(spec);
                        const isLast = i === product.specifications.length - 1;
                        return (
                          <tr key={i} style={{ background: i % 2 === 0 ? "#fafaf8" : "transparent" }}>
                            <td style={{ padding: "0.8rem 1rem", fontSize: "0.86rem", color: "#888", fontWeight: 600, width: "35%", borderBottom: isLast ? "none" : "1px solid #f0ede8", borderRadius: "8px 0 0 8px" }}>{label}</td>
                            <td style={{ padding: "0.8rem 1rem 0.8rem 0", fontSize: "0.86rem", color: "#1a1a1a", borderBottom: isLast ? "none" : "1px solid #f0ede8" }}>{value || label}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {/* Applications */}
                {activeTab === "applications" && product.applications?.length > 0 && (
                  <div className="pd-app-grid">
                    {product.applications.map((app, i) => (
                      <div key={i} style={{ background: "#f7f6f3", border: "1px solid #eee9e0", borderRadius: 10, padding: "0.9rem 1rem", textAlign: "center", fontSize: "0.84rem", color: "#555", fontWeight: 500 }}>
                        {app}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════════════════════════
              RELATED PRODUCTS
          ════════════════════════════ */}
          {related.length > 0 && (
            <div className="pd-fadein pd-fadein-d3">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#b5a898" }}>
                  Related Products
                </span>
                <button
                  onClick={() => navigate("/products")}
                  style={{ background: "none", border: "none", color: "#1a6b4a", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 3 }}
                >
                  View all <ChevronRight size={13} />
                </button>
              </div>
              <div className="pd-related-grid">
                {related.map(rel => (
                  <div
                    key={rel.id}
                    className="pd-rel-card"
                    onClick={() => navigate(`/product/${rel.id}`)}
                    style={{ background: "#fff", border: "1px solid #e8e5df", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s, border-color 0.2s" }}
                  >
                    <div style={{ aspectRatio: "1", overflow: "hidden", background: "#f7f6f3" }}>
                      {rel.image
                        ? <img src={rel.image} alt={rel.name} className="pd-rel-img-el" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", display: "block" }} />
                        : <ProductMedia product={rel} className="w-full h-full" />
                      }
                    </div>
                    <div style={{ padding: "0.85rem" }}>
                      {rel.category && <div style={{ fontSize: "0.68rem", color: "#1a6b4a", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>{rel.category}</div>}
                      <div style={{ fontSize: "0.87rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.35, marginBottom: 4 }}>{rel.name}</div>
                      {rel.short && <p style={{ fontSize: "0.77rem", color: "#b5a898", lineHeight: 1.45, margin: 0 }}>{rel.short}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════
              CTA BANNER
          ════════════════════════════ */}
          <div
            className="pd-cta-banner"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              borderRadius: 18,
              padding: "2.25rem 2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circle */}
            <div style={{ position: "absolute", right: -60, top: -60, width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: -20, top: -20, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.65rem", color: "#fff", fontWeight: 800, marginBottom: "0.4rem" }}>
                Interested in this product?
              </h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: 0 }}>
                Contact our team for a detailed quote, custom specs, or a product demo at your facility.
              </p>
            </div>

            <div className="pd-cta-banner-btns" style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap", position: "relative" }}>
              <button style={{ background: "#fff", color: "#1a1a1a", border: "none", borderRadius: 10, padding: "0.75rem 1.5rem", fontSize: "0.87rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Get Quote
              </button>
              <button style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "0.75rem 1.5rem", fontSize: "0.87rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Contact Sales
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={() => navigate("/")} />
    </div>
  );
};