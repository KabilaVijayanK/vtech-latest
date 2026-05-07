import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ZoomIn, X } from "lucide-react";
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

/* ─────────────────────────────────────────────
   Inline styles (no extra CSS file needed)
───────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const S: Record<string, any> = {
  /* layout */
  page: {
    minHeight: "100vh",
    background: "#f7f6f3",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  main: { flex: 1, paddingTop: 60 },

  /* breadcrumb bar */
  breadBar: {
    background: "#fff",
    borderBottom: "1px solid #e8e5df",
    padding: "0.5rem 1.5rem",
  },

  /* inner container */
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" },

  /* back btn */
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "1px solid #e8e5df",
    borderRadius: 8,
    padding: "0.35rem 0.9rem",
    fontSize: "0.82rem",
    color: "#666",
    cursor: "pointer",
    fontFamily: "inherit",
    margin: "1rem 0",
  },

  /* ── HERO ── */
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    alignItems: "start",
    background: "#fff",
    border: "1px solid #e8e5df",
    borderRadius: 16,
    padding: "1rem",
    marginBottom: "0.75rem",
  },

  /* gallery */
  mainImgWrap: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: "transparent",
    cursor: "zoom-in",
    marginBottom: "0.5rem",
    display: "flex",
    marginTop: "4.5rem",
    alignItems: "flex-end",
    justifyContent: "center",
    maxHeight: "75vh",
  },
  mainImg: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    transition: "transform 0.4s ease",
    display: "block",
  },
  zoomBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e8e5df",
    borderRadius: 6,
    padding: "0.25rem 0.6rem",
    fontSize: "0.72rem",
    color: "#888",
    display: "flex",
    alignItems: "center",
    gap: 4,
    pointerEvents: "none",
  },
  thumbRow: { display: "flex", gap: "0.5rem" },
  thumb: (active) => ({
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    border: `2px solid ${active ? "#1a6b4a" : "transparent"}`,
    cursor: "pointer",
    background: "transparent",
    flexShrink: 0,
    transition: "border-color 0.15s",
  }),
  thumbImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  /* product info */
  catTag: {
    display: "inline-block",
    background: "#f0ebe2",
    color: "#7a6a52",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "0.3rem 0.85rem",
    borderRadius: 20,
    marginBottom: "1.1rem",
  },
  h1: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "2.2rem",
    lineHeight: 1.15,
    color: "#1a1a1a",
    marginBottom: "0.65rem",
    fontWeight: 400,
  },
  pshort: {
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: 1.75,
    marginBottom: "1.75rem",
  },

  /* quick features box */
  quickBox: {
    background: "#f7f6f3",
    borderRadius: 10,
    padding: "1.2rem",
    marginBottom: "1.75rem",
  },
  quickTitle: {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#999",
    marginBottom: "0.85rem",
    display: "block",
  },
  featItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: "0.55rem" },
  featDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "#e8f5ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  featText: { fontSize: "0.87rem", color: "#555", lineHeight: 1.5 },

  /* stock row */
  stockRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: "1.4rem" },
  stockDot: { width: 8, height: 8, borderRadius: "50%", background: "#2aad6a" },
  stockLabel: { fontSize: "0.82rem", color: "#1a7a4a", fontWeight: 500 },

  /* CTA buttons */
  ctaRow: { display: "flex", gap: "0.75rem" },
  btnPrimary: {
    flex: 1,
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "0.8rem 1.5rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },
  btnOutline: {
    flex: 1,
    background: "transparent",
    color: "#1a1a1a",
    border: "1.5px solid #e8e5df",
    borderRadius: 8,
    padding: "0.8rem 1.5rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },

  /* ── TABS ── */
  tabsWrap: {
    background: "#fff",
    border: "1px solid #e8e5df",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: "1.5rem",
  },
  tabHeader: {
    display: "flex",
    borderBottom: "1px solid #e8e5df",
    background: "#f7f6f3",
    padding: "0 1.5rem",
  },
  tabBtn: (active) => ({
    background: "none",
    border: "none",
    padding: "1rem 1.25rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: active ? "#1a1a1a" : "#999",
    cursor: "pointer",
    borderBottom: `2px solid ${active ? "#1a1a1a" : "transparent"}`,
    marginBottom: -1,
    fontFamily: "inherit",
    transition: "color 0.15s",
  }),
  tabContent: { padding: "2rem" },

  /* description */
  descText: { fontSize: "0.95rem", color: "#555", lineHeight: 1.8, maxWidth: 700, marginBottom: "1rem" },

  /* features grid */
  featGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" },
  featCard: {
    background: "#f7f6f3",
    borderRadius: 10,
    padding: "1rem 1.2rem",
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
  },
  featCardDot: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#e8f5ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  featCardText: { fontSize: "0.87rem", color: "#1a1a1a", lineHeight: 1.5 },

  /* specs */
  specTable: { width: "100%", borderCollapse: "collapse" },
  specTd1: {
    padding: "0.75rem 1rem 0.75rem 0",
    fontSize: "0.88rem",
    color: "#888",
    fontWeight: 500,
    width: "38%",
    borderBottom: "1px solid #f0ede8",
    verticalAlign: "top",
  },
  specTd2: {
    padding: "0.75rem 0",
    fontSize: "0.88rem",
    color: "#1a1a1a",
    borderBottom: "1px solid #f0ede8",
  },

  /* applications */
  appGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" },
  appCard: {
    background: "#f7f6f3",
    border: "1px solid #e8e5df",
    borderRadius: 10,
    padding: "0.9rem 1rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#555",
    fontWeight: 500,
    cursor: "default",
    transition: "border-color 0.15s, color 0.15s",
  },

  /* ── RELATED ── */
  sectionLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#aaa",
    display: "block",
    marginBottom: "0.9rem",
  },
  relatedGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" },
  relCard: {
    background: "#fff",
    border: "1px solid #e8e5df",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    transition: "box-shadow 0.2s, border-color 0.2s",
  },
  relImg: { aspectRatio: "1", overflow: "hidden", background: "transparent" },
  relImgEl: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", display: "block" },
  relBody: { padding: "0.85rem" },
  relCat: { fontSize: "0.7rem", color: "#1a6b4a", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 3 },
  relName: { fontSize: "0.875rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.35, marginBottom: 4 },
  relShort: { fontSize: "0.78rem", color: "#aaa", lineHeight: 1.5 },

  /* ── CTA BANNER ── */
  ctaBanner: {
    background: "#1a1a1a",
    color: "#fff",
    borderRadius: 16,
    padding: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  ctaBannerH: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.7rem",
    color: "#fff",
    fontWeight: 400,
    marginBottom: "0.4rem",
  },
  ctaBannerP: { fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", maxWidth: 460 },
  btnWhite: {
    background: "#fff",
    color: "#1a1a1a",
    border: "none",
    borderRadius: 8,
    padding: "0.75rem 1.5rem",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  btnGhostWhite: {
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: 8,
    padding: "0.75rem 1.5rem",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },

  /* ── ZOOM OVERLAY ── */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "zoom-out",
  },
  overlayImg: {
    maxWidth: "82vw",
    maxHeight: "82vh",
    objectFit: "contain",
    borderRadius: 12,
    display: "block",
  },
  overlayClose: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "rgba(255,255,255,0.12)",
    border: "none",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
  },

  /* not found */
  notFound: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontFamily: "inherit",
  },
};

/* ─── tiny check icon ─── */
const Check = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#1a6b4a" strokeWidth="2.5">
    <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" />
  </svg>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeThumb, setActiveThumb] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [hoveredRel, setHoveredRel] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  const product = PRODUCTS.find((p) => p.id === id);

  /* ── collect all images: product.image only ── */
  const allImages = product?.image ? [product.image] : [];
  /* deduplicate */
  const images = [...new Set(allImages)];

  const currentImage = images[activeThumb] || null;

  /* ── parse spec string "Label: Value" ── */
  const parseSpec = (spec) => {
    const idx = spec.indexOf(":");
    if (idx === -1) return { label: spec, value: "" };
    return { label: spec.slice(0, idx).trim(), value: spec.slice(idx + 1).trim() };
  };

  /* ── related products: same category, exclude self ── */
  const related = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const tabs = [
    product?.description && "description",
    product?.features?.length && "features",
    product?.specifications?.length && "specifications",
    product?.applications?.length && "applications",
  ].filter(Boolean);

  /* ── 404 ── */
  if (!product) {
    return (
      <div style={S.page}>
        <Navbar current="products" onNavigate={() => navigate("/")} />
        <div style={S.notFound}>
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
    <div style={S.page}>
      {/* ── Zoom Overlay ── */}
      {zoomed && (
        <div style={S.overlay} onClick={() => setZoomed(false)}>
          {currentImage ? (
            <img src={currentImage} alt={product.name} style={S.overlayImg} onClick={(e) => e.stopPropagation()} />
          ) : (
            <div style={{ color: "#fff", fontSize: "0.9rem" }}>No image available</div>
          )}
          <button style={S.overlayClose} onClick={() => setZoomed(false)}>
            <X size={18} />
          </button>
        </div>
      )}

      <Navbar current="products" onNavigate={(p) => navigate("/")} />

      <main style={S.main}>
        {/* ── Breadcrumb ── */}
        <div style={S.breadBar}>
          <div style={S.container}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {product.category && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{product.category}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div style={S.container}>
          {/* ── Back Button ── */}
          <button style={S.backBtn} onClick={() => navigate("/products")}>
            <ArrowLeft size={14} /> Back to Products
          </button>

          {/* ── HERO GRID ── */}
          <div style={S.heroGrid}>
            {/* LEFT: Gallery */}
            <div>
              {/* Main image */}
              <div
                style={S.mainImgWrap}
                onClick={() => currentImage && setZoomed(true)}
                onMouseEnter={(e) => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLImageElement;
                  if (img) img.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLImageElement;
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {currentImage ? (
                  <img src={currentImage} alt={product.name} style={S.mainImg} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ProductMedia product={product} className="w-full h-full" />
                  </div>
                )}
                {currentImage && (
                  <div style={S.zoomBadge}>
                    <ZoomIn size={11} /> Click to zoom
                  </div>
                )}
              </div>

              {/* Thumbnails — only show if 2+ images */}
              {images.length > 1 && (
                <div style={S.thumbRow}>
                  {images.map((src, i) => (
                    <div key={i} style={S.thumb(activeThumb === i)} onClick={() => setActiveThumb(i)}>
                      <img src={src} alt={`${product.name} view ${i + 1}`} style={S.thumbImg} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Info */}
            <div>
              {product.category && <span style={S.catTag}>{product.category}</span>}
              <h1 style={S.h1}>{product.name}</h1>
              {product.short && <p style={S.pshort}>{product.short}</p>}

              {/* Quick features (first 4) */}
              {product.features?.length > 0 && (
                <div style={S.quickBox}>
                  <span style={S.quickTitle}>Key Features</span>
                  {product.features.slice(0, 4).map((feat, i) => (
                    <div key={i} style={{ ...S.featItem, marginBottom: i < Math.min(3, product.features.length - 1) ? "0.55rem" : 0 }}>
                      <div style={S.featDot}><Check /></div>
                      <span style={S.featText}>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stock */}
              <div style={S.stockRow}>
                <div style={S.stockDot} />
                <span style={S.stockLabel}>In Stock — Ready to ship</span>
              </div>

              {/* CTA */}
              <div style={S.ctaRow}>
                <button style={S.btnPrimary}>Get Quote</button>
                <button style={S.btnOutline}>Enquire Now</button>
              </div>
            </div>
          </div>

          {/* ── TABS ── */}
          {tabs.length > 0 && (
            <div style={S.tabsWrap}>
              <div style={S.tabHeader}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    style={S.tabBtn(activeTab === tab)}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div style={S.tabContent}>
                {/* Description */}
                {activeTab === "description" && product.description && (
                  <p style={S.descText}>{product.description}</p>
                )}

                {/* Features */}
                {activeTab === "features" && product.features?.length > 0 && (
                  <div style={S.featGrid}>
                    {product.features.map((feat, i) => (
                      <div key={i} style={S.featCard}>
                        <div style={S.featCardDot}><Check /></div>
                        <p style={S.featCardText}>{feat}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specifications */}
                {activeTab === "specifications" && product.specifications?.length > 0 && (
                  <table style={S.specTable}>
                    <tbody>
                      {product.specifications.map((spec, i) => {
                        const { label, value } = parseSpec(spec);
                        return (
                          <tr key={i} style={i === product.specifications.length - 1 ? { borderBottom: "none" } : {}}>
                            <td style={{ ...S.specTd1, ...(i === product.specifications.length - 1 ? { borderBottom: "none" } : {}) }}>{label}</td>
                            <td style={{ ...S.specTd2, ...(i === product.specifications.length - 1 ? { borderBottom: "none" } : {}) }}>{value || label}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {/* Applications */}
                {activeTab === "applications" && product.applications?.length > 0 && (
                  <div style={S.appGrid}>
                    {product.applications.map((app, i) => (
                      <div key={i} style={S.appCard}>{app}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── RELATED PRODUCTS ── */}
          {related.length > 0 && (
            <>
              <span style={S.sectionLabel}>Related Products</span>
              <div style={S.relatedGrid}>
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    style={{
                      ...S.relCard,
                      boxShadow: hoveredRel === rel.id ? "0 4px 20px rgba(0,0,0,0.09)" : "none",
                      borderColor: hoveredRel === rel.id ? "#c8c4bc" : "#e8e5df",
                    }}
                    onClick={() => navigate(`/product/${rel.id}`)}
                    onMouseEnter={() => setHoveredRel(rel.id)}
                    onMouseLeave={() => setHoveredRel(null)}
                  >
                    <div style={S.relImg}>
                      {rel.image ? (
                        <img
                          src={rel.image}
                          alt={rel.name}
                          style={{
                            ...S.relImgEl,
                            transform: hoveredRel === rel.id ? "scale(1.07)" : "scale(1)",
                          }}
                        />
                      ) : (
                        <ProductMedia product={rel} className="w-full h-full" />
                      )}
                    </div>
                    <div style={S.relBody}>
                      {rel.category && <div style={S.relCat}>{rel.category}</div>}
                      <div style={S.relName}>{rel.name}</div>
                      {rel.short && <p style={S.relShort}>{rel.short}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── CTA BANNER ── */}
          <div style={S.ctaBanner}>
            <div>
              <h2 style={S.ctaBannerH}>Interested in this product?</h2>
              <p style={S.ctaBannerP}>
                Contact our team for a detailed quote, custom specifications, or a product demonstration at your facility.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap" }}>
              <button style={S.btnWhite}>Get Quote</button>
              <button style={S.btnGhostWhite}>Contact Sales</button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={(p) => navigate("/")} />
    </div>
  );
};