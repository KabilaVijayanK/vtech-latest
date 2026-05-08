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
  description?: string;
  features: string[];
  specifications?: string[];
  applications?: string[];
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
    description: "We are counted amongst the prominent manufacturers of world-class hinged belt chip conveyors. These portable conveyors are carefully developed using quality materials in compliance with set quality standards. Our hinged belt chip conveyors do not require additional maintenance and are very easy to install and operate. Our collection is available in different specifications as per your requirements.",
    features: ["Low maintenance", "Easy installation", "Durable", "Custom sizes", "Heavy-duty construction", "Chip-resistant design"],
    specifications: [
      "Conveyor Chain Size: 1.5 to 6 Inch Available",
      "Conveyor Max. Width: 1500 mm",
      "Material: Carbon Steel / Stainless Steel"
    ],
    applications: ["Machining industries", "Press shops", "Chip handling", "Metal cutting operations"],
    image: "/products/hinge-conveyor.png",
  },
  {
  id: "inspection-table",
  name: "Inspection Table",
  category: "Specialty",
  short: "Ergonomic table for manual inspection and quality control processes.",
  features: ["Sturdy structure", "Operator friendly", "Customizable size", "Smooth surface"],
  image: "/products/inspection-table.png"
},
{
  id: "bin-elevator",
  name: "Bin Elevator",
  category: "Material Handling",
  short: "System for lifting and transporting bins vertically.",
  features: ["High load capacity", "Safe lifting", "Compact design", "Durable construction"],
  image: "/products/bin-elevator.png"
},
{
  id: "burr-sorter",
  name: "Burr Sorter",
  category: "Automated",
  short: "Machine used for separating burrs from finished components.",
  features: ["High precision", "Efficient sorting", "Low maintenance", "Continuous operation"],
  image: "/products/burr-sorter.png"
},
{
  id: "bin-moving-trolley",
  name: "Bin Moving Trolley",
  category: "Material Handling",
  short: "Trolley designed for easy movement of bins within facilities.",
  features: ["Heavy-duty wheels", "Easy maneuvering", "Robust frame", "User friendly"],
  image: "/products/bin-trolley.png"
},
{
  id: "tools-handling-trolley",
  name: "Tools Handling Trolley",
  category: "Material Handling",
  short: "Mobile trolley for organizing and transporting tools.",
  features: ["Multiple compartments", "Strong build", "Easy mobility", "Space efficient"],
  image: "/products/tools-trolley.png"
},
{
  id: "pvc-belt",
  name: "PVC Belt Conveyor",
  category: "Conveyors",
  short: "Lightweight conveyor for smooth material handling applications.",
  features: ["Flexible belt", "Low noise", "Energy efficient", "Easy maintenance"],
  image: "/products/pvc-belt.png"
},
{
  id: "metal-sorting-conveyor",
  name: "Conveyor System for Metal Sorting",
  category: "Automated",
  short: "Automated conveyor system designed for sorting metal components.",
  features: ["Accurate sorting", "High speed", "Sensor integration", "Durable design"],
  image: "/products/metal-sorting.png"
},
{
  id: "step-feeder",
  name: "Step Feeder",
  category: "Automated",
  short: "Feeding system for controlled and oriented part supply.",
  features: ["Gentle handling", "Low noise", "High efficiency", "Compact design"],
  image: "/products/step-feeder.png"
},
{
  id: "silent-roller-chain",
  name: "Silent Roller Chain Conveyor",
  category: "Conveyors",
  short: "Low-noise conveyor for smooth and quiet operations.",
  features: ["Silent operation", "High durability", "Smooth transfer", "Low vibration"],
  image: "/products/silent-roller.png"
},
{
  id: "vertical-lift-transfer",
  name: "Vertical Lifting and Transferring Unit",
  category: "Automated",
  short: "System for vertical movement and transfer of materials between levels.",
  features: ["Space saving", "Automated control", "High efficiency", "Safe operation"],
  image: "/products/vertical-lift.png"
},
  {
    id: "scraper-chip-conveyor",
    name: "Scraper Type Chip Conveyor",
    category: "Conveyors",
    short: "Scrap handling conveyor for press shops and automotive plants.",
    description: "High speed, high productivity presses need an equally efficient and reliable scrap disposal system in place to ensure uptime of these expensive machines. The heavy scrap generated during pressing operations needs to be continuously removed and disposed of in a 24x7 working environment. V Tech Conveyors offers scrap management systems that take up this challenge in press shops of the automotive industry. Our conveyors are so robust and reliable that many installations in the country are running for the past two decades without a breakdown.",
    features: ["24x7 operation", "Heavy scrap handling", "Long lifespan", "High reliability", "Robust construction", "Continuous operation"],
    specifications: [
      "frame:Heavy-duty welded frame",
      "Drive:High-capacity chain drive",
      "Size: Customizable length and width",
      "Steel :Carbon steel or stainless steel construction"
    ],
    applications: ["Press shops", "Stamping operations", "Automotive industry", "Metal scrap handling", "High-speed pressing"],
    image: "/products/scraper-chip-conveyor.png",
  },
  {
    id: "magnetic-chip-conveyor",
    name: "Magnetic Chip Conveyor",
    category: "Conveyors",
    short: "Ferrous chip handling with coolant recovery system.",
    description: "These conveyors are mainly used for small wet ferrous chips and help in recovering the costly fluids used for machining. When chips fall on the magnetic conveyor (stainless steel), which stands still while the conveyor runs below, magnets connected to the chain attract and carry chips to the trolley. Oil and coolant are recovered back to the tank, making this system highly efficient for machining operations.",
    features: ["Magnetic separation", "Coolant recovery", "Energy efficient", "Durable", "Stainless steel construction", "High filtration"],
    specifications: [
      "Material: Stainless Steel",
      "Pitch Width: 38.1mm",
      "Speed Motor: 1/4Hp (0.2kw)",
      "Flow rate of pump: 25-300 L/M"
    ],
    applications: ["Machining centers", "Grinding operations", "Coolant recovery", "Chip separation", "Metal working"],
    image: "/products/magnetic-chip-conveyor.png",
  },
  {
    id: "coolant-magnetic-separator",
    name: "Coolant Magnetic Separator",
    category: "Filtration Systems",
    short: "Removes ferrous particles from coolant.",
    description: "Magnetic Separator clarifies offer excellent means of filtering for ferrous particles. WherePurification is required and contaminates differ in form, size and composition, MagneticSeparator are recommended for Grinding, Honing, Transfer-lines and machining centre. It Also can be used for rolling mills for filtering coolant which helps to improve the surface finish of the sheets.",
    specifications: [
      "Shell Length: 1200mm",
      "Capacity: 10-20 t/h",
      "Power: 1.1 KW",
      "Weight: 1.5 t"
    ],
    applications: ["Machining centers", "Grinding operations", "Coolant purification", "Ferrous particle removal", "Surface finish improvement"],
    features: ["Improves surface finish", "High filtration", "Industrial use", "Robust design"],
    image: "/products/coolant-magnetic-separator.png",
  },
  {
    id: "gravity-roller",
    name: "Gravity Roller Conveyor",
    category: "Conveyors",
    short: "Manual conveyor for cartons and goods movement.",
    description: "We offer optimum quality Gravity Roller Conveyors. Roller conveyor is suitable for all types ofCartons, bags, salvers cargoes, conveying. It can transport single heavy thing, or can bear More impact load. It has big throughput, high speed, light operation, and let multi species of Shunt delivery from col limitation come true.",
    specifications: [
      "Roller diameter: 19~165.2mm",
      "Roller width: 50~2000mm",
    ],
    applications: ["Warehousing", "Distribution centers", "Manufacturing lines", "Packaging operations", "Material handling"],
    features: ["No power needed", "Simple structure", "High reliability", "Easy maintenance"],
    image: "/products/gravity-roller.png",
  },
  {
    id: "powered-roller",
    name: "Powered Roller Conveyor",
    category: "Automated",
    short: "Motorized conveyor for automation and logistics.",
    description: "Automation (Powered) roller conveyors are used for material handling and for any kind of Automation application. We are instrumental in developing high performing Chain Drive Roller Conveyor.These conveyors are designed for transport of boxed unit load with flat bottom in food Processing industry, chemical industry and pharmaceutical industry. Featuring assurance offer liable running and economic performance, the offered roller Conveyors are technologically advanced and can be used for both forward and reverseTransport. Developed from finest grade raw materials under strict super visions, these Conveyors can be ordered at the best price from us.",
    specifications: [
      "Length of Conveyor (As per requirement)",
      "Width of Working Surface",
      "Height of Conveyor 500 Formed Steel for Frame 120×30×3",
    ],
    applications: ["Automated manufacturing lines", "Logistics and distribution centers", "Packaging operations", "Material handling", "Food processing"],  
    features: ["Modularized design", "Impact resistant", "Beautiful appearance", "Maintenance free"],
    image: "/products/powered-roller.png",
  },
  {
    id: "ev-assembly-line",
    name: "Electric Vehicle Assembly Line Conveyor",
    category: "Special Purpose Machines",
    short: "Assembly conveyor for EV manufacturing lines.",
    description:"We are reckoned as prominent entity presenting innovative designs of Slat Chain Conveyor.Owing to its continuous moving surface, the offered conveyors become the best choice for Material handling at packaging lines. Featuring special attachment to develop the conveyors In L, C, and U type formation, the offered design comes with slats attached to the chain. We are procuring industry approved materials to manufacture the high performing conveyors,Which can be ordered in customized size and length specifications at a competitive price Electric Vehicle Assembly Line Slat Type Chain Conveyor are widely used to assemble Electric Scooters, electric Bikes to increase the plant productivity, Our Vehicle Assembly line conveyor",
    features: ["Heavy duty", "Custom layouts", "High productivity", "Long life"],
    image: "/products/ev-assembly.png",
  },
  {
    id: "belt-conveyor",
    name: "Belt Conveyor",
    category: "Conveyors",
    short: "Widely used conveyor for bulk material handling.",
    features: ["High efficiency", "Flexible", "Durable", "Low maintenance"],
    image: "/products/belt-conveyor.png",
  },
  {
    id: "skate-wheel",
    name: "Flexible Skate Wheel Conveyor",
    category: "Conveyors",
    short: "Portable conveyor for loading/unloading.",
    features: ["Adjustable height", "Portable", "Modular", "Easy maintenance"],
    image: "/products/skate-wheel.png",
  },
  {
    id: "flexible-powered",
    name: "Flexible Powered Conveyor",
    category: "Automated",
    short: "Motorized flexible conveyor for logistics.",
    features: ["Self tracking", "Start/stop control", "Compact", "Efficient"],
    image: "/products/flexible-powered.png",
  },
  {
    id: "truck-loader",
    name: "Truck Loader Conveyor",
    category: "Material Handling",
    short: "Conveyor for truck loading/unloading.",
    features: ["Heavy load", "UV resistant", "Corrosion resistant", "Durable"],
    image: "./products/truck-loader.png",
  },
  {
    id: "wire-mesh",
    name: "Wire Mesh Conveyor",
    category: "Conveyors",
    short: "Conveyor for high temperature and drying applications.",
    features: ["Heat resistant", "Chemical resistant", "Durable", "Air flow design"],
    image: "/products/mesh.png",
  },
  {
    id: "screw-conveyor",
    name: "Screw & Coil Conveyor",
    category: "Conveyors",
    short: "Powder material transport conveyor.",
    features: ["Uniform flow", "Custom size", "Wear resistant", "High precision"],
    image: "/products/screw-conveyor.png",
  },
  {
    id: "pallet-dispenser",
    name: "Pallet Dispenser",
    category: "Material Handling",
    short: "Automatic pallet stacking system.",
    features: ["Heavy duty", "Multi direction output", "Safe", "Low maintenance"],
    image: "/products/pallet-dispenser.png",
  },
  {
    id: "overhead-conveyor",
    name: "Overhead Conveyor (Four Wheel)",
    category: "Conveyors",
    short: "Overhead system for industrial movement.",
    features: ["Durable", "Smooth transport", "Custom layout", "Balanced load"],
    image: "/products/overhead-conveyor.png",
  },
  {
    id: "chain-belt-conveyor",
    name: "Chain Belt Conveyor",
    category: "Conveyors",
    short: "Heavy-duty conveyor for recycling and industrial use.",
    features: ["Heavy duty", "Flexible", "Modular frame", "Variable speed"],
    image: "/products/chain-belt-conveyor.png",
  },
  {
    id: "pallet-chain-conveyor",
    name: "Pallet Chain Conveyor",
    category: "Material Handling",
    short: "Handles heavy pallet transport.",
    features: ["High load capacity", "Impact resistant", "Smooth transport", "Durable"],
    image: "/products/pallet-chain-conveyor.png",
  },
  {
    id: "ball-transfer-table",
    name: "Ball Transfer Table",
    category: "Material Handling",
    short: "Manual rotation and positioning system.",
    features: ["Easy movement", "Multi-direction", "Flexible handling", "Industrial use"],
    image: "/products/ball-transfer.png",
  },
  {
    id: "modular-belt-conveyor",
    name: "Modular Belt Conveyor",
    category: "Conveyors",
    short: "Modular belt system for heavy applications.",
    features: ["Heat resistant", "Easy repair", "Strong", "Adjustable speed"],
    image: "/products/modular-belt-conveyor.png",
  },
  {
    id: "scissor-lift",
    name: "Hydraulic Scissor Lift",
    category: "Special Purpose Machines",
    short: "Hydraulic lifting platform.",
    description:"V Tech Conveyor scissor lifts are the ultimate in strength, convenience and reliability with full hydraulic Powered functions controlled by a push of a button. Available in lift capacities from 1,000 to 20,000 kg. And standard deck sizes ranging to 2400mm wide x 6000mm long. Standard features include safety toe, Fall protection, hinged bridge, handrails, barrier chains and a comprehensive warranty.",
    
    features: ["Superior structure for strength and durability "],
    image: "/products/hydraulic-lift.png",
  },
  {
    id: "oil-skimmer",
    name: "Oil Skimmer",
    category: "Oil Skimmers",
    short: "Separates oil from coolant.",
    features: ["Improves coolant life", "Efficient", "Industrial grade", "Low maintenance"],
    image: "/products/oil-skimmer.png",
  },
  {
    id: "strapping-machine",
    name: "Fully Automatic Strapping Machine",
    category: "Automated",
    short: "Packaging machine for strapping goods.",
    features: ["Auto feeding", "Safe voltage", "Easy operation", "Modular"],
    image: "/products/strapping-machine.png",
  },
  {
    id: "vertical-conveyor",
    name: "Vertical Chain Conveyor",
    category: "Conveyors",
    short: "Vertical transport conveyor for heavy goods.",
    features: ["High load capacity", "Vertical movement", "Custom speed", "Durable"],
    image: "/products/vertical-conveyor.png",
  },
  {
    id: "inverted-power-free",
    name: "Inverted Power & Free Conveyor",
    category: "Automated",
    short: "Advanced conveyor for accumulation and sorting.",
    features: ["Programmable", "High strength", "Flexible", "Efficient"],
    image: "/products/inverted-power-free.png",
  },
  {
    id: "spiral-conveyor",
    name: "Spiral Gravity Roller Conveyor",
    category: "Conveyors",
    short: "Compact conveyor for vertical transport.",
    description: "The compact spiral conveyor is a compact and versatile elevating solution. Compact Spiral conveyors can be Designed to carry product between floors and machines or over aisles. Designed with a uniform slope, the Compact Spiral conveyor ensures smooth operation without disturbing the product. With its ability to move Items from one point to another with minimal effort required on the part of the operator, compact Spiral Conveyors are ideal for use in many industries, including food service and manufacturing.",
    specifications: [
      "Roller Material: Steel",
      "Capacity: 50 Kg/Feet",
      "Belt Width: 600 mm",
      "Conveying Speed: 60 m/min",
      "Height: 15 Mt’s",
      "Phase: Three Phase",
      "Voltage: 420 V",
      "Frequency Range: 50-60Hz",
      "Country of Origin: Made in India",
      "Minimum Order Quantity: 15 Pieces"
    ],
    applications: ["Food processing", "Manufacturing lines", "Packaging operations", "Material handling", "Vertical transport"],
    features: ["Space saving", "Low cost", "Smooth operation", "Efficient"],
    image: "/products/spiral-conveyor.png",
  },
  {
    id: "centralized-chip",
    name: "Centralized Chip Conveyor System",
    category: "Conveyors",
    short: "PLC based scrap handling system.",
    features: ["Automated", "High capacity", "Continuous operation", "Customizable"],
    image: "/products/centralized-chip.png",
  },
  {
    id: "dws-system",
    name: "DWS System",
    category: "Automated",
    short: "Dimensioning, weighing and scanning system.",
    features: ["High accuracy", "Automation", "ERP integration", "Time saving"],
    image: "/products/dws-system.png",
  },
  {
    id: "sortation-system",
    name: "Sortation & Diversion System",
    category: "Automated",
    short: "Automated sorting and routing system.",
    features: ["High speed", "Accurate", "Low manpower", "Efficient"],
    image: "/products/sortation-system.png",
  },
  {
    id: "paper-band-filter",
    name: "Paper Band Cum Magnetic Filtration System",
    category: "Filtration Systems",
    short: "Coolant filtration system for industries.",
    features: ["High purification", "Handles all particles", "Efficient", "Compact"],
    image: "/products/paper-band-filter.png",
  },
  {
    id: "telescopic-cover",
    name: "Telescopic Covers",
    category: "Machine Protection",
    short: "Protects machine guideways.",
    description: "The highest procession is used to make the telescopic steel covers and especially adapted for Totally machine requirement. Telescopic covers are used in the industries to protect the Guide-ways of machine for any direction of motion. Generally we make the telescopic steel Cover as walk on various with horizontal motion. In Species cases where space is limited or Walking on is definitely impossible that the cover cannot be  made with sufficient space than A non-walk on type cover is provided for the machine.",
    specifications: [
      "Max speed: 100 metre/min",
      "Material: Nylon & Steel",
    ],
    applications: ["Machine tool protection", "Guideway protection", "Industrial machinery", "Space constrained applications"],
    features: ["High speed", "Durable", "Compact", "Custom design"],
    image: "/products/telescopic-cover.png",
  },
  {
    id: "bellow-cover",
    name: "Bellow Cover",
    category: "Machine Protection",
    short: "Flexible protection cover for machines.",
    features: ["Easy install", "Flexible", "Durable", "Multi-direction"],
    image: "/products/bellow-cover.png",
  },
  {
    id: "cable-drag-chain",
    name: "Cable Drag Chain",
    category: "Machine Protection",
    short: "Protects cables and hoses.",
    features: ["Smooth movement", "Durable", "Flexible", "Industrial use"],
    image: "/products/cable-drag-chain.png",
  },
  {
    id: "rollway-cover",
    name: "Rollway Cover",
    category: "Machine Protection",
    short: "Protects machine slides.",
    description: "Rollway covers are used to protect slide and guide ways of any kind of machine. The Rollway  Covers can be mounted in horizontal, vertical and for cross slide applications.",
    features: ["Compact", "High speed", "Durable", "Low maintenance"],
    image: "/products/rollway-cover.png",
  },
  {
    id: "apron-cover",
    name: "Apron Cover",
    category: "Machine Protection",
    short: "Heavy-duty machine protection cover.",
    features: ["Heat resistant", "Flexible", "Compact", "Durable"],
    image: "/products/apron-cover.png",
  },
  {
    id: "dust-collector",
    name: "Dust Collector",
    category: "Filtration Systems",
    short: "Industrial dust extraction system.",
    features: ["Cost effective", "High efficiency", "Pollution control", "Durable"],
    image: "/products/dust-collector.png",
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
