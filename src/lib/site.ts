export type PageKey = "home" | "about" | "products" | "services" | "contact";

export const NAV: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "products", label: "Products" },
  { key: "services", label: "Services" },
  { key: "contact", label: "Contact" },
];

export const COMPANY = {
  name: "V TECH INDUSTRIES",
  tagline: "Solution Partner for Your Process",
  address: "62/1, Mettuthangal, Thirumazhisai, Chennai - 600124",
  phones: ["+91 78459 22919", "+91 98408 90919"],
  email: "vignesh@vtechindustries.co.in",
  hours: "Mon–Sat, 9AM–6PM IST",
};

export type ProductCategory =
  | "Heavy Duty"
  | "Material Handling"
  | "Specialty"
  | "Automated"
  | "Conveyors"
  | "Filtration Systems"
  | "Special Purpose Machines"
  | "Oil Skimmers"
  | "Machine Protection";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  short: string;
  features: string[];
  /** Path to image under /public. If null, the SVG fallback is used. */
  image: string | null;
};

/**
 * To add a real photo for a product:
 *   1. Drop a file at  public/products/<id>.jpg  (e.g. public/products/slat-chain.jpg)
 *   2. Set  image: "/products/<id>.jpg"  on that product below.
 * If image is null, the SVG illustration fallback is used automatically.
 */
export const PRODUCTS: Product[] = [
  {
    id: "slat-chain",
    name: "Slat Chain Conveyors",
    category: "Heavy Duty",
    short: "Heavy-load chain slat systems engineered for continuous industrial material movement.",
    features: ["Heavy load", "Low noise", "Stainless options", "Custom widths"],
    image: "/products/slat-chain.png",
  },
  {
    id: "roller",
    name: "Roller Conveyors",
    category: "Material Handling",
    short: "Powered and gravity roller systems for smooth, accurate transport of cartons & pallets.",
    features: ["Powered / Gravity", "Modular sections", "MS / SS rollers", "High throughput"],
    image: "/products/roller.png",
  },
  {
    id: "belt",
    name: "Belt Conveyors",
    category: "Material Handling",
    short: "Flat and inclined belt systems for continuous material flow across long runs.",
    features: ["Flat / Incline", "PVC & PU belts", "Variable speed", "Side guards"],
    image: "/products/belt.png",
  },
  {
    id: "modular",
    name: "Modular Conveyors",
    category: "Specialty",
    short: "Flexible modular plastic belt conveyors for curved paths and washdown lines.",
    features: ["Curved layouts", "Washdown ready", "Food grade", "Sectional belt"],
    image: "/products/modular.png",
  },
  {
    id: "turntable",
    name: "Powerised Turn Table Conveyors",
    category: "Automated",
    short: "90° / 180° rotation tables for seamless line direction changes and routing.",
    features: ["90° / 180°", "Servo drive", "PLC ready", "Smooth indexing"],
    image: "/products/turntable.png",
  },
  {
    id: "cooling",
    name: "Cooling & Drying Conveyors",
    category: "Specialty",
    short: "Temperature-controlled conveying for food, pharma and post-process drying.",
    features: ["Forced air", "SS construction", "Hygienic design", "Variable zones"],
    image: "/products/cooling.png",
  },
  {
    id: "incline",
    name: "Floor to Floor / Incline Conveyors",
    category: "Heavy Duty",
    short: "Vertical elevation conveyors that move product reliably between floor levels.",
    features: ["Up to 12m lift", "Cleated belt", "Anti-slip", "Compact footprint"],
    image: "/products/incline.png",
  },
  {
    id: "idler",
    name: "Idler Roller Conveyors",
    category: "Material Handling",
    short: "Gravity-fed idler roller systems for passive, low-maintenance product transport.",
    features: ["Zero power", "Quiet rollers", "Long life", "Easy install"],
    image: "/products/idler.png",
  },
  {
    id: "bag-closing",
    name: "Bag Closing Machine with Conveyor",
    category: "Automated",
    short: "Integrated bag sealing and conveying system for packaging and FMCG lines.",
    features: ["Inline stitch", "Adjustable height", "PLC interlock", "FMCG ready"],
    image: "/products/bagclose.png",
  },
  {
    id: "hinge-conveyor",
    name: "Hinged Belt Chip Conveyor",
    category: "Conveyors",
    short: "Heavy-duty chip handling conveyor for machining industries.",
    features: ["Low maintenance", "Easy installation", "Durable", "Custom sizes"],
    image: "/products/hinge-conveyor.jpg",
  },
  {
    id: "scraper-chip-conveyor",
    name: "Scraper Type Chip Conveyor",
    category: "Conveyors",
    short: "Scrap handling conveyor for press shops and automotive plants.",
    features: ["24x7 operation", "Heavy scrap handling", "Long lifespan", "High reliability"],
    image: "/products/scraper-chip-conveyor.jpg",
  },
  {
    id: "magnetic-chip-conveyor",
    name: "Magnetic Chip Conveyor",
    category: "Conveyors",
    short: "Ferrous chip handling with coolant recovery system.",
    features: ["Magnetic separation", "Coolant recovery", "Energy efficient", "Durable"],
    image: null,
  },
  {
    id: "coolant-magnetic-separator",
    name: "Coolant Magnetic Separator",
    category: "Filtration Systems",
    short: "Removes ferrous particles from coolant.",
    features: ["Improves surface finish", "High filtration", "Industrial use", "Robust design"],
    image: null,
  },
  {
    id: "gravity-roller",
    name: "Gravity Roller Conveyor",
    category: "Conveyors",
    short: "Manual conveyor for cartons and goods movement.",
    features: ["No power needed", "Simple structure", "High reliability", "Easy maintenance"],
    image: null,
  },
  {
    id: "powered-roller",
    name: "Powered Roller Conveyor",
    category: "Automated",
    short: "Motorized conveyor for automation and logistics.",
    features: ["Forward/reverse", "Impact resistant", "Modular", "Low maintenance"],
    image: null,
  },
  {
    id: "ev-assembly-line",
    name: "Electric Vehicle Assembly Line Conveyor",
    category: "Special Purpose Machines",
    short: "Assembly conveyor for EV manufacturing lines.",
    features: ["Heavy duty", "Custom layouts", "High productivity", "Long life"],
    image: null,
  },
  {
    id: "belt-conveyor",
    name: "Belt Conveyor",
    category: "Conveyors",
    short: "Widely used conveyor for bulk material handling.",
    features: ["High efficiency", "Flexible", "Durable", "Low maintenance"],
    image: null,
  },
  {
    id: "skate-wheel",
    name: "Flexible Skate Wheel Conveyor",
    category: "Conveyors",
    short: "Portable conveyor for loading/unloading.",
    features: ["Adjustable height", "Portable", "Modular", "Easy maintenance"],
    image: null,
  },
  {
    id: "flexible-powered",
    name: "Flexible Powered Conveyor",
    category: "Automated",
    short: "Motorized flexible conveyor for logistics.",
    features: ["Self tracking", "Start/stop control", "Compact", "Efficient"],
    image: null,
  },
  {
    id: "truck-loader",
    name: "Truck Loader Conveyor",
    category: "Material Handling",
    short: "Conveyor for truck loading/unloading.",
    features: ["Heavy load", "UV resistant", "Corrosion resistant", "Durable"],
    image: null,
  },
  {
    id: "wire-mesh",
    name: "Wire Mesh Conveyor",
    category: "Conveyors",
    short: "Conveyor for high temperature and drying applications.",
    features: ["Heat resistant", "Chemical resistant", "Durable", "Air flow design"],
    image: null,
  },
  {
    id: "screw-conveyor",
    name: "Screw & Coil Conveyor",
    category: "Conveyors",
    short: "Powder material transport conveyor.",
    features: ["Uniform flow", "Custom size", "Wear resistant", "High precision"],
    image: null,
  },
  {
    id: "pallet-dispenser",
    name: "Pallet Dispenser",
    category: "Material Handling",
    short: "Automatic pallet stacking system.",
    features: ["Heavy duty", "Multi direction output", "Safe", "Low maintenance"],
    image: null,
  },
  {
    id: "overhead-conveyor",
    name: "Overhead Conveyor (Four Wheel)",
    category: "Conveyors",
    short: "Overhead system for industrial movement.",
    features: ["Durable", "Smooth transport", "Custom layout", "Balanced load"],
    image: null,
  },
  {
    id: "chain-belt-conveyor",
    name: "Chain Belt Conveyor",
    category: "Conveyors",
    short: "Heavy-duty conveyor for recycling and industrial use.",
    features: ["Heavy duty", "Flexible", "Modular frame", "Variable speed"],
    image: null,
  },
  {
    id: "pallet-chain-conveyor",
    name: "Pallet Chain Conveyor",
    category: "Material Handling",
    short: "Handles heavy pallet transport.",
    features: ["High load capacity", "Impact resistant", "Smooth transport", "Durable"],
    image: null,
  },
  {
    id: "ball-transfer-table",
    name: "Ball Transfer Table",
    category: "Material Handling",
    short: "Manual rotation and positioning system.",
    features: ["Easy movement", "Multi-direction", "Flexible handling", "Industrial use"],
    image: null,
  },
  {
    id: "modular-belt-conveyor",
    name: "Modular Belt Conveyor",
    category: "Conveyors",
    short: "Modular belt system for heavy applications.",
    features: ["Heat resistant", "Easy repair", "Strong", "Adjustable speed"],
    image: null,
  },
  {
    id: "scissor-lift",
    name: "Hydraulic Scissor Lift",
    category: "Special Purpose Machines",
    short: "Hydraulic lifting platform.",
    features: ["High capacity", "Safe", "Smooth operation", "Durable"],
    image: null,
  },
  {
    id: "oil-skimmer",
    name: "Oil Skimmer",
    category: "Oil Skimmers",
    short: "Separates oil from coolant.",
    features: ["Improves coolant life", "Efficient", "Industrial grade", "Low maintenance"],
    image: null,
  },
  {
    id: "strapping-machine",
    name: "Fully Automatic Strapping Machine",
    category: "Automated",
    short: "Packaging machine for strapping goods.",
    features: ["Auto feeding", "Safe voltage", "Easy operation", "Modular"],
    image: null,
  },
  {
    id: "vertical-conveyor",
    name: "Vertical Chain Conveyor",
    category: "Conveyors",
    short: "Vertical transport conveyor for heavy goods.",
    features: ["High load capacity", "Vertical movement", "Custom speed", "Durable"],
    image: null,
  },
  {
    id: "inverted-power-free",
    name: "Inverted Power & Free Conveyor",
    category: "Automated",
    short: "Advanced conveyor for accumulation and sorting.",
    features: ["Programmable", "High strength", "Flexible", "Efficient"],
    image: null,
  },
  {
    id: "spiral-conveyor",
    name: "Spiral Gravity Roller Conveyor",
    category: "Conveyors",
    short: "Compact conveyor for vertical transport.",
    features: ["Space saving", "Low cost", "Smooth operation", "Efficient"],
    image: null,
  },
  {
    id: "centralized-chip",
    name: "Centralized Chip Conveyor System",
    category: "Conveyors",
    short: "PLC based scrap handling system.",
    features: ["Automated", "High capacity", "Continuous operation", "Customizable"],
    image: null,
  },
  {
    id: "dws-system",
    name: "DWS System",
    category: "Automated",
    short: "Dimensioning, weighing and scanning system.",
    features: ["High accuracy", "Automation", "ERP integration", "Time saving"],
    image: null,
  },
  {
    id: "sortation-system",
    name: "Sortation & Diversion System",
    category: "Automated",
    short: "Automated sorting and routing system.",
    features: ["High speed", "Accurate", "Low manpower", "Efficient"],
    image: null,
  },
  {
    id: "paper-band-filter",
    name: "Paper Band Cum Magnetic Filtration System",
    category: "Filtration Systems",
    short: "Coolant filtration system for industries.",
    features: ["High purification", "Handles all particles", "Efficient", "Compact"],
    image: null,
  },
  {
    id: "telescopic-cover",
    name: "Telescopic Covers",
    category: "Machine Protection",
    short: "Protects machine guideways.",
    features: ["High speed", "Durable", "Compact", "Custom design"],
    image: null,
  },
  {
    id: "bellow-cover",
    name: "Bellow Cover",
    category: "Machine Protection",
    short: "Flexible protection cover for machines.",
    features: ["Easy install", "Flexible", "Durable", "Multi-direction"],
    image: null,
  },
  {
    id: "cable-drag-chain",
    name: "Cable Drag Chain",
    category: "Machine Protection",
    short: "Protects cables and hoses.",
    features: ["Smooth movement", "Durable", "Flexible", "Industrial use"],
    image: null,
  },
  {
    id: "rollway-cover",
    name: "Rollway Cover",
    category: "Machine Protection",
    short: "Protects machine slides.",
    features: ["Compact", "High speed", "Durable", "Low maintenance"],
    image: null,
  },
  {
    id: "apron-cover",
    name: "Apron Cover",
    category: "Machine Protection",
    short: "Heavy-duty machine protection cover.",
    features: ["Heat resistant", "Flexible", "Compact", "Durable"],
    image: null,
  },
  {
    id: "dust-collector",
    name: "Dust Collector",
    category: "Filtration Systems",
    short: "Industrial dust extraction system.",
    features: ["Cost effective", "High efficiency", "Pollution control", "Durable"],
    image: null,
  },
];

export const INDUSTRIES = [
  "Automotive",
  "Food & Beverage",
  "Pharmaceuticals",
  "FMCG",
  "Logistics",
  "E-Commerce",
  "Textiles",
  "Heavy Engineering",
  "Packaging",
];
