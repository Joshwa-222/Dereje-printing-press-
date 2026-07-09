import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { createServer as createViteServer } from "vite";
import { Service, PortfolioItem, ContactMessage } from "./src/types";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dereje_printing_press_secret_key_2026";

// Path to store dynamic data
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data
const DEFAULT_SERVICES: Service[] = [
  {
    id: "s1",
    name: "Large Format Banner Printing",
    slug: "large-format-banners",
    description: "High-resolution, vivid indoor and outdoor banners, trade show backdrops, billboard graphics, and heavy-duty vinyl rollups built to withstand external elements.",
    category: "Outdoor Advertising",
    price: "From $15/sqm",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "s2",
    name: "Luxury Embossed Business Cards",
    slug: "luxury-business-cards",
    description: "Premium weight cards with soft-touch matte finish, custom spot-UV gloss accents, gold/silver foil stamping, and debossed styling to make a legendary first impression.",
    category: "Corporate Stationery",
    price: "From $45/100pcs",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "s3",
    name: "Corporate Brand Book & Brochure Printing",
    slug: "brand-books-and-brochures",
    description: "Incredible full-color catalogs, reports, corporate portfolios, custom-bound booklets, and tri-fold brochures printed on premium silk or gloss-finished archival paper.",
    category: "Publication & Editorial",
    price: "From $2.50/pc",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "s4",
    name: "3D Acrylic Signage & Lightboxes",
    slug: "signage-and-lightboxes",
    description: "Custom precision-molded 3D acrylic signs, brand-matched backlit LED lightboxes, and elegant brushed metallic laser-cut lettering for beautiful storefront advertising.",
    category: "Branding & Signage",
    price: "Custom Quote",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f12a9881?auto=format&fit=crop&w=800&q=80",
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "s5",
    name: "Custom Product Packaging & Boxes",
    slug: "product-packaging-boxes",
    description: "Engineered die-cut product cartons, thick corrugated custom shipping boxes, luxury cosmetic sleeves, and branded paper bags tailored for secure and gorgeous retail display.",
    category: "Packaging & Merchandising",
    price: "From $0.80/box",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "s6",
    name: "Branded Promotional Merchandise",
    slug: "branded-merchandising",
    description: "High-quality precision screen-printed corporate t-shirts, caps, embroidered uniforms, custom-engraved thermal bottles, metallic pens, and tech accessories.",
    category: "Packaging & Merchandising",
    price: "From $3.50/pc",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    featured: false,
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "EcoPack Cosmetics Box Line",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    category: "Packaging",
    description: "Biodegradable craft cardstock series with gold-foil stamped accents and elegant minimal typography for an upscale skincare product collection.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p2",
    title: "Apex Fitness Grand Launch Banner",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    category: "Outdoor Signage",
    description: "15-meter massive weather-resistant high-tension mesh vinyl building wrap for storefront visibility during gym franchise grand inauguration.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p3",
    title: "Elite Partners Corporate Welcome kit",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
    category: "Stationery",
    description: "Custom-made luxury gift boxes containing debossed leather notebooks, metal-plated black ink pens, and custom engraved insulated mugs.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p4",
    title: "Horizon Real Estate Booklet & Brochure",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80",
    category: "Publications",
    description: "Square-bound 48-page panoramic architectural showcase utilizing ultra-heavy matte paper and high-fidelity offset spot silver pigments.",
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: "m1",
    name: "Sara Solomon (Apex Tech)",
    email: "sara@apextech.com",
    phone: "+251 911 234 567",
    message: "Hello Dereje, we need a pricing quote for printing 500 premium booklets, 10 rollup display banners, and 50 custom-branded cotton polo shirts for our upcoming annual tech expo. Could you please send us your details and timeline? Thank you!",
    createdAt: new Date().toISOString()
  }
];

// Load Database Helper
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const data = {
      services: DEFAULT_SERVICES,
      portfolio: DEFAULT_PORTFOLIO,
      messages: DEFAULT_MESSAGES
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading database file, resetting to defaults", error);
    return {
      services: DEFAULT_SERVICES,
      portfolio: DEFAULT_PORTFOLIO,
      messages: DEFAULT_MESSAGES
    };
  }
}

// Write Database Helper
function writeDB(data: { services: Service[]; portfolio: PortfolioItem[]; messages: ContactMessage[] }) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to database file", error);
  }
}

// Global Middlewares
app.use(express.json({ limit: "50mb" })); // Increase limit for local base64 images

// Admin login credentials (Hash is stored/checked cleanly)
const ADMIN_USERNAME = "dereje";
const ADMIN_PASSWORD_HASH = bcryptjs.hashSync("dereje4334", 10);

// Admin Auth Middleware
const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied. Private admin credentials required." });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    if (decoded.username !== ADMIN_USERNAME) {
      res.status(403).json({ error: "Unauthorized access permissions mismatch." });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid, expired, or corrupted admin session token." });
  }
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Authenticate Admin Session
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required parameters." });
    return;
  }

  if (username === ADMIN_USERNAME && bcryptjs.compareSync(password, ADMIN_PASSWORD_HASH)) {
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: "administrator" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      success: true,
      token,
      user: { username: ADMIN_USERNAME, role: "administrator" }
    });
  } else {
    res.status(401).json({ error: "Invalid username or password credentials." });
  }
});

// GET all services (Public)
app.get("/api/services", (req, res) => {
  const db = readDB();
  res.json(db.services);
});

// GET single service (Public)
app.get("/api/services/:id", (req, res) => {
  const db = readDB();
  const service = db.services.find((s: Service) => s.id === req.params.id || s.slug === req.params.id);
  if (!service) {
    res.status(404).json({ error: "Service artifact not found." });
  } else {
    res.json(service);
  }
});

// POST create service (Protected Admin)
app.post("/api/services", authenticateAdmin, (req, res) => {
  const { name, slug, description, category, price, image, featured } = req.body;
  if (!name || !description || !category || !price) {
    res.status(400).json({ error: "Incomplete fields. Required: name, description, category, price." });
    return;
  }

  const db = readDB();
  const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const newService: Service = {
    id: "s_" + Date.now(),
    name,
    slug: generatedSlug,
    description,
    category,
    price,
    image: image || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    featured: featured || false,
    createdAt: new Date().toISOString()
  };

  db.services.push(newService);
  writeDB(db);
  res.status(201).json(newService);
});

// PUT update service (Protected Admin)
app.put("/api/services/:id", authenticateAdmin, (req, res) => {
  const db = readDB();
  const idx = db.services.findIndex((s: Service) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Service not found." });
    return;
  }

  const { name, slug, description, category, price, image, featured } = req.body;
  const original = db.services[idx];

  db.services[idx] = {
    ...original,
    name: name !== undefined ? name : original.name,
    slug: slug !== undefined ? slug : original.slug,
    description: description !== undefined ? description : original.description,
    category: category !== undefined ? category : original.category,
    price: price !== undefined ? price : original.price,
    image: image !== undefined ? image : original.image,
    featured: featured !== undefined ? featured : original.featured,
  };

  writeDB(db);
  res.json(db.services[idx]);
});

// DELETE service (Protected Admin)
app.get("/api/services-delete/:id", authenticateAdmin, (req, res) => {
  // Safe alternate route mapping in case of firewall / reverse proxy custom constraints
  const db = readDB();
  const newServices = db.services.filter((s: Service) => s.id !== req.params.id);
  db.services = newServices;
  writeDB(db);
  res.json({ success: true, message: `Service deleted.` });
});

app.delete("/api/services/:id", authenticateAdmin, (req, res) => {
  const db = readDB();
  const originalLength = db.services.length;
  db.services = db.services.filter((s: Service) => s.id !== req.params.id);
  
  if (db.services.length === originalLength) {
    res.status(404).json({ error: "Service target not found." });
    return;
  }
  
  writeDB(db);
  res.json({ success: true, message: "Service successfully unlinked." });
});

// GET all portfolio items (Public)
app.get("/api/portfolio", (req, res) => {
  const db = readDB();
  res.json(db.portfolio);
});

// POST create portfolio item (Protected Admin)
app.post("/api/portfolio", authenticateAdmin, (req, res) => {
  const { title, image, category, description } = req.body;
  if (!title || !category || !description) {
    res.status(400).json({ error: "Missing required properties. Title, category and description required." });
    return;
  }

  const db = readDB();
  const newItem: PortfolioItem = {
    id: "p_" + Date.now(),
    title,
    image: image || "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    category,
    description,
    createdAt: new Date().toISOString()
  };

  db.portfolio.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

// PUT update portfolio item (Protected Admin)
app.put("/api/portfolio/:id", authenticateAdmin, (req, res) => {
  const db = readDB();
  const idx = db.portfolio.findIndex((p: PortfolioItem) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Portfolio element not targetable." });
    return;
  }

  const { title, image, category, description } = req.body;
  const original = db.portfolio[idx];

  db.portfolio[idx] = {
    ...original,
    title: title !== undefined ? title : original.title,
    image: image !== undefined ? image : original.image,
    category: category !== undefined ? category : original.category,
    description: description !== undefined ? description : original.description,
  };

  writeDB(db);
  res.json(db.portfolio[idx]);
});

// DELETE portfolio item (Protected Admin)
app.delete("/api/portfolio/:id", authenticateAdmin, (req, res) => {
  const db = readDB();
  const originalLength = db.portfolio.length;
  db.portfolio = db.portfolio.filter((p: PortfolioItem) => p.id !== req.params.id);
  
  if (db.portfolio.length === originalLength) {
    res.status(404).json({ error: "Portfolio item not targetable." });
    return;
  }

  writeDB(db);
  res.json({ success: true, message: "Portfolio project successfully removed." });
});

// POST create contact message (Public)
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email and business request message are mandatory." });
    return;
  }

  const db = readDB();
  const newMessage: ContactMessage = {
    id: "m_" + Date.now(),
    name,
    email,
    phone: phone || "Not Provided",
    message,
    createdAt: new Date().toISOString()
  };

  db.messages.push(newMessage);
  writeDB(db);
  res.status(201).json({ success: true, message: "Message dispatched cleanly.", data: newMessage });
});

// GET all contact messages (Protected Admin)
app.get("/api/contact", authenticateAdmin, (req, res) => {
  const db = readDB();
  res.json(db.messages);
});

// DELETE contact message (Protected Admin)
app.delete("/api/contact/:id", authenticateAdmin, (req, res) => {
  const db = readDB();
  db.messages = db.messages.filter((m: ContactMessage) => m.id !== req.params.id);
  writeDB(db);
  res.json({ success: true, message: "Inquiry record deleted." });
});

// GET admin overview dashboard analytics & statistics (Protected Admin)
app.get("/api/stats", authenticateAdmin, (req, res) => {
  const db = readDB();
  res.json({
    servicesCount: db.services.length,
    portfolioCount: db.portfolio.length,
    messagesCount: db.messages.length,
    recentMessages: [...db.messages].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
  });
});

// ==========================================
// BOOT VITE DEV OR EXPLOIT PRODUCTION ASSETS
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production from dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[DEREJE BACKEND] Running flawlessly on http://0.0.0.0:${PORT}`);
    console.log(`[DEREJE STORAGE] Database persisted out-of-the-box in: ${DB_FILE}`);
  });
}

startServer();
