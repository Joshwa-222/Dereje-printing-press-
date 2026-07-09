import React, { useState, useMemo, useCallback, FC, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, useInView, useScroll, useTransform } from "motion/react";
import {
  Printer,
  Image as ImageIcon,
  Package,
  Shirt,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
  Palette,
  BadgeCheck,
  Calendar,
  Layers,
  CreditCard,
  Lightbulb,
  FileText,
  BookOpen,
  Newspaper,
  Search,
  X,
  Zap,
  Clock,
  Shield,
  Heart,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  ChevronRight,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  Users,
  Globe,
  Truck,
  PenTool,
  Camera,
  Monitor,
  Smartphone,
  Tablet,
  Gift,
  Coffee,
  Umbrella,
  ShoppingBag,
  MousePointer,
  Megaphone,
  Stamp,
  Scissors,
  Ruler,
  Brush,
  Droplets,
  Sun,
  Moon,
  Menu,
  XCircle,
  Quote,
  ThumbsUp,
  MessageCircle,
  Share2,
  Download,
  Upload,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  LucideIcon,
  Briefcase,
  RefreshCw,
} from "lucide-react";

// ==================== TYPES ====================
type CategoryId =
  | "all"
  | "print"
  | "branding"
  | "promo"
  | "stationery"
  | "lighting"
  | "publishing"
  | "packaging"
  | "textile"
  | "signage"
  | "digital"
  | "corporate";

type ViewMode = "grid" | "list";
type ThemeMode = "dark" | "light";
type SortOption = "popular" | "newest" | "price-low" | "price-high" | "name";

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  count: number;
  description: string;
}

interface Service {
  id: string;
  title: string;
  category: CategoryId;
  icon: LucideIcon;
  image: string;
  description: string;
  longDescription?: string;
  features: string[];
  gradient: string;
  badge?: string;
  popular?: boolean;
  priceRange?: string;
  turnaround?: string;
  minimum?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
}

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  suffix?: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isActive: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onQuickView: (service: Service) => void;
}

interface BottomFeatureProps {
  icon: LucideIcon;
  title: string;
  text: string;
  index: number;
}

// ==================== ANIMATION VARIANTS ====================
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.8, y: -20 },
};

const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

// ==================== SERVICE CARD COMPONENT ====================
const ServiceCard: FC<ServiceCardProps> = ({
  service,
  index,
  isActive,
  onHoverStart,
  onHoverEnd,
  onQuickView,
}) => {
  const Icon: LucideIcon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      layout
      variants={fadeInUp}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      exit="exit"
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => onHoverStart(service.id)}
      onHoverEnd={onHoverEnd}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br ${service.gradient} backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/10`}
    >
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => onQuickView(service)}>
        <motion.img
          src={service.image}
          alt={service.title}
          loading="lazy"
          animate={{
            scale: isActive ? 1.15 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* TOP LEFT - ICON WITH ANIMATION */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:border-red-500/50 transition-colors"
        >
          <Icon className="w-7 h-7 text-red-500" />
        </motion.div>

        {/* TOP RIGHT - BADGES */}
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          {service.badge && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-red-600/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-current" />
              {service.badge}
            </motion.div>
          )}
          {service.isNew && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-green-600/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-green-300" />
              NEW
            </motion.div>
          )}
        </div>

        {/* BOTTOM INFO OVERLAY */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
          {service.priceRange && (
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 text-sm font-semibold text-white/90 border border-white/20">
              {service.priceRange}
            </div>
          )}
          {service.turnaround && (
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 text-xs text-white/70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {service.turnaround}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-7">
        {/* VERIFIED BADGE AND RATING */}
        <div className="flex items-center gap-2 mb-3">
          <BadgeCheck className="w-5 h-5 text-green-400" />
          <span className="text-sm text-green-400 font-medium">Verified</span>
          
          {/* Rating Stars */}
          {service.rating && (
            <div className="ml-auto flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(service.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/50">
                ({service.reviews})
              </span>
            </div>
          )}
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-black mb-4 group-hover:text-red-500 transition-colors duration-300">
          {service.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-white/60 text-sm leading-relaxed mb-7 line-clamp-2">
          {service.description}
        </p>

        {/* FEATURES LIST */}
        <div className="space-y-3 mb-8">
          {service.features.slice(0, 4).map((feature: string, idx: number) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 rounded-2xl bg-white text-black py-4 font-bold flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-600/30"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(service)}
            className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <Info className="w-5 h-5 text-white/80" />
          </motion.button>
        </div>
      </div>

      {/* HOVER GLOW EFFECT */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// ==================== QUICK VIEW MODAL ====================
const QuickViewModal: FC<{
  service: Service | null;
  onClose: () => void;
}> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[40px] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center">
              <service.icon className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-3xl font-black">{service.title}</h2>
              <p className="text-white/60">{service.priceRange}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <img
          src={service.image}
          alt={service.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />

        <p className="text-white/80 mb-6">
          {service.longDescription || service.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="text-sm text-white/60 mb-1">Turnaround</div>
            <div className="font-bold">{service.turnaround || "2-5 Days"}</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="text-sm text-white/60 mb-1">Minimum Order</div>
            <div className="font-bold">{service.minimum || "No Minimum"}</div>
          </div>
          {service.rating && (
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="text-sm text-white/60 mb-1">Rating</div>
              <div className="font-bold flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {service.rating}/5
              </div>
            </div>
          )}
          {service.reviews && (
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="text-sm text-white/60 mb-1">Reviews</div>
              <div className="font-bold">{service.reviews}+</div>
            </div>
          )}
        </div>

        <h3 className="font-bold mb-3">Features Include:</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {feature}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Request Quote
          </button>
          <button className="flex-1 bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
            Order Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==================== TESTIMONIAL CARD ====================
const TestimonialCard: FC<{ testimonial: Testimonial; index: number }> = ({
  testimonial,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "text-yellow-400 fill-current"
                : "text-white/20"
            }`}
          />
        ))}
      </div>
      <Quote className="w-8 h-8 text-red-500/30 mb-4" />
      <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-bold">{testimonial.name}</div>
          <div className="text-sm text-white/60">{testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== BOTTOM FEATURE ====================
const BottomFeature: FC<BottomFeatureProps> = ({
  icon: Icon,
  title,
  text,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-red-500/30 transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-600/10 flex items-center justify-center mb-6 shadow-lg shadow-red-600/10 group-hover:shadow-red-600/30 transition-shadow"
      >
        <Icon className="w-8 h-8 text-red-500" />
      </motion.div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{text}</p>
    </motion.div>
  );
};

// ==================== MAIN SERVICES COMPONENT ====================
const Services: FC = () => {
  // State Management
  const [activeTab, setActiveTab] = useState<CategoryId>("all");
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [quickViewService, setQuickViewService] = useState<Service | null>(null);
  const [showNewsletter, setShowNewsletter] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Categories Configuration
  const categories: Category[] = [
    {
      id: "all",
      label: "All Services",
      icon: Sparkles,
      count: 28,
      description: "View all our premium printing services",
    },
    {
      id: "print",
      label: "Printing",
      icon: Printer,
      count: 5,
      description: "Professional printing solutions",
    },
    {
      id: "branding",
      label: "Branding",
      icon: ImageIcon,
      count: 3,
      description: "Brand identity and signage",
    },
    {
      id: "promo",
      label: "Promotional",
      icon: Megaphone,
      count: 4,
      description: "Marketing and promotional items",
    },
    {
      id: "stationery",
      label: "Stationery",
      icon: FileText,
      count: 4,
      description: "Office and personal stationery",
    },
    {
      id: "lighting",
      label: "Lighting",
      icon: Lightbulb,
      count: 2,
      description: "Illuminated signage solutions",
    },
    {
      id: "publishing",
      label: "Publishing",
      icon: BookOpen,
      count: 3,
      description: "Books and publications",
    },
    {
      id: "packaging",
      label: "Packaging",
      icon: Package,
      count: 3,
      description: "Custom packaging solutions",
    },
    {
      id: "textile",
      label: "Textile",
      icon: Shirt,
      count: 2,
      description: "Apparel and fabric printing",
    },
    {
      id: "signage",
      label: "Signage",
      icon: Monitor,
      count: 3,
      description: "Indoor and outdoor signs",
    },
    {
      id: "digital",
      label: "Digital",
      icon: Smartphone,
      count: 2,
      description: "Digital printing services",
    },
    {
      id: "corporate",
      label: "Corporate",
      icon: Globe,
      count: 3,
      description: "Business solutions",
    },
  ];

  // Services Data - 28 Premium Services
  const services: Service[] = useMemo(
    () => [
      // PRINTING (5 services)
      {
        id: "business-cards",
        title: "Business Cards",
        category: "print" as CategoryId,
        icon: CreditCard,
        image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?w=800",
        description: "Luxury business cards with premium finishes and modern designs.",
        longDescription: "Make a lasting first impression with our premium business cards. Choose from a variety of paper stocks, finishes including matte, glossy, spot UV, gold foil, and embossing. Our expert designers ensure your brand stands out.",
        features: ["Matte & Glossy", "Spot UV Finish", "Gold Foil Design", "Rounded Corners", "Embossing"],
        gradient: "from-blue-600/20 to-cyan-500/10",
        popular: true,
        priceRange: "From $19.99",
        turnaround: "1-3 Days",
        minimum: "100 pcs",
        rating: 4.8,
        reviews: 1250,
      },
      {
        id: "flyers-brochures",
        title: "Flyers & Brochures",
        category: "print" as CategoryId,
        icon: Layers,
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
        description: "Eye-catching flyers and brochures for effective marketing campaigns.",
        features: ["A4, A5, DL Sizes", "Glossy & Matte", "Folded Options", "Bulk Discounts"],
        gradient: "from-green-600/20 to-lime-500/10",
        badge: "Popular",
        priceRange: "From $29.99",
        turnaround: "2-4 Days",
        rating: 4.7,
        reviews: 890,
      },
      {
        id: "poster-printing",
        title: "Poster Printing",
        category: "print" as CategoryId,
        icon: ImageIcon,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
        description: "High-quality poster prints for events, promotions, and wall art.",
        features: ["Multiple Sizes", "Photo Quality", "Matte & Glossy", "Mounting Options"],
        gradient: "from-purple-600/20 to-pink-500/10",
        priceRange: "From $14.99",
        turnaround: "1-2 Days",
        rating: 4.6,
        reviews: 650,
      },
      {
        id: "letterheads",
        title: "Letterheads & Envelopes",
        category: "print" as CategoryId,
        icon: FileText,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
        description: "Professional letterheads and matching envelopes for business correspondence.",
        features: ["Custom Watermarks", "Premium Paper", "Color Matching", "Various Sizes"],
        gradient: "from-teal-600/20 to-emerald-500/10",
        priceRange: "From $39.99",
        turnaround: "3-5 Days",
        minimum: "250 pcs",
        rating: 4.9,
        reviews: 420,
      },
      {
        id: "sticker-printing",
        title: "Custom Stickers & Labels",
        category: "print" as CategoryId,
        icon: Stamp,
        image: "https://images.unsplash.com/photo-1621240074450-1ecc8d2c01f2?w=800",
        description: "Custom vinyl stickers, decals, and product labels for any purpose.",
        features: ["Vinyl & Paper", "Die-Cut Shapes", "Waterproof", "UV Resistant"],
        gradient: "from-orange-600/20 to-yellow-500/10",
        badge: "Trending",
        isNew: true,
        priceRange: "From $9.99",
        turnaround: "2-3 Days",
        rating: 4.8,
        reviews: 340,
      },

      // BRANDING (3 services)
      {
        id: "banner-printing",
        title: "Large Format Banners",
        category: "branding" as CategoryId,
        icon: ImageIcon,
        image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=800",
        description: "Massive indoor and outdoor banners with vibrant, weather-resistant prints.",
        features: ["Roll-up & Retractable", "Billboard Size", "Mesh & Vinyl", "Grommets Included"],
        gradient: "from-red-600/20 to-orange-500/10",
        badge: "Best Seller",
        popular: true,
        priceRange: "From $49.99",
        turnaround: "2-4 Days",
        rating: 4.9,
        reviews: 2100,
      },
      {
        id: "vehicle-branding",
        title: "Vehicle Wraps & Branding",
        category: "branding" as CategoryId,
        icon: Truck,
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800",
        description: "Full and partial vehicle wraps for mobile advertising and fleet branding.",
        features: ["Full Wraps", "Partial Wraps", "Fleet Graphics", "Window Perfs"],
        gradient: "from-blue-600/20 to-indigo-500/10",
        badge: "Premium",
        priceRange: "From $599.99",
        turnaround: "5-7 Days",
        rating: 4.7,
        reviews: 180,
      },
      {
        id: "trade-show",
        title: "Trade Show Displays",
        category: "branding" as CategoryId,
        icon: Monitor,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Portable and custom trade show displays, backdrops, and popup booths.",
        features: ["Popup Displays", "Table Throws", "Backdrops", "Banner Stands"],
        gradient: "from-violet-600/20 to-purple-500/10",
        priceRange: "From $199.99",
        turnaround: "4-6 Days",
        rating: 4.8,
        reviews: 95,
      },

      // PROMOTIONAL (4 services)
      {
        id: "tshirt-printing",
        title: "Custom T-Shirt Printing",
        category: "promo" as CategoryId,
        icon: Shirt,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        description: "Premium quality t-shirts with vibrant prints for events, teams, and brands.",
        features: ["Screen Printing", "DTG Printing", "Embroidery", "Bulk Orders"],
        gradient: "from-pink-600/20 to-rose-500/10",
        popular: true,
        priceRange: "From $14.99",
        turnaround: "3-5 Days",
        minimum: "25 pcs",
        rating: 4.6,
        reviews: 780,
      },
      {
        id: "promo-items",
        title: "Promotional Products",
        category: "promo" as CategoryId,
        icon: Gift,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Branded merchandise including mugs, pens, USBs, and corporate gifts.",
        features: ["Mugs & Drinkware", "Pens & Stationery", "Tech Accessories", "Eco-Friendly"],
        gradient: "from-amber-600/20 to-orange-500/10",
        priceRange: "From $5.99",
        turnaround: "5-10 Days",
        rating: 4.5,
        reviews: 560,
      },
      {
        id: "caps-hats",
        title: "Custom Caps & Hats",
        category: "promo" as CategoryId,
        icon: Umbrella,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
        description: "Embroidered and printed caps for teams, events, and corporate giveaways.",
        features: ["Embroidery", "Screen Print", "Snapbacks", "Flexfit"],
        gradient: "from-red-600/20 to-pink-500/10",
        priceRange: "From $12.99",
        turnaround: "4-6 Days",
        minimum: "50 pcs",
        rating: 4.4,
        reviews: 230,
      },
      {
        id: "tote-bags",
        title: "Custom Tote Bags",
        category: "promo" as CategoryId,
        icon: ShoppingBag,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
        description: "Eco-friendly tote bags with custom prints for retail and events.",
        features: ["Canvas & Cotton", "Full Color Print", "Various Sizes", "Eco-Friendly"],
        gradient: "from-green-600/20 to-teal-500/10",
        badge: "Eco",
        isNew: true,
        priceRange: "From $8.99",
        turnaround: "3-5 Days",
        rating: 4.7,
        reviews: 145,
      },

      // STATIONERY (4 services)
      {
        id: "calendar-printing",
        title: "Custom Calendars",
        category: "stationery" as CategoryId,
        icon: Calendar,
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800",
        description: "Wall, desk, and pocket calendars with professional layouts and premium paper.",
        features: ["Wall Calendars", "Desk Calendars", "Custom Dates", "Spiral Binding"],
        gradient: "from-teal-600/20 to-emerald-500/10",
        priceRange: "From $24.99",
        turnaround: "5-7 Days",
        minimum: "50 pcs",
        rating: 4.6,
        reviews: 320,
      },
      {
        id: "notepads",
        title: "Custom Notepads",
        category: "stationery" as CategoryId,
        icon: PenTool,
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
        description: "Personalized notepads and sticky notes for office and personal use.",
        features: ["Various Sizes", "Glued Edge", "Custom Covers", "Ruled/Plain"],
        gradient: "from-blue-600/20 to-sky-500/10",
        priceRange: "From $19.99",
        turnaround: "3-5 Days",
        rating: 4.5,
        reviews: 210,
      },
      {
        id: "greeting-cards",
        title: "Greeting & Invitation Cards",
        category: "stationery" as CategoryId,
        icon: Heart,
        image: "https://images.unsplash.com/photo-1607344645869-009c320c5b40?w=800",
        description: "Elegant cards for weddings, birthdays, corporate events, and special occasions.",
        features: ["Wedding Invites", "Birthday Cards", "Holiday Cards", "Custom Envelopes"],
        gradient: "from-pink-600/20 to-fuchsia-500/10",
        priceRange: "From $14.99",
        turnaround: "3-5 Days",
        minimum: "25 pcs",
        rating: 4.8,
        reviews: 450,
      },
      {
        id: "folders",
        title: "Presentation Folders",
        category: "stationery" as CategoryId,
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
        description: "Professional presentation folders with custom pockets and business card slots.",
        features: ["Pocket Folders", "Die-Cut", "Foil Stamping", "Spot UV"],
        gradient: "from-purple-600/20 to-indigo-500/10",
        priceRange: "From $49.99",
        turnaround: "4-6 Days",
        minimum: "100 pcs",
        rating: 4.7,
        reviews: 180,
      },

      // LIGHTING (2 services)
      {
        id: "light-box",
        title: "LED Light Box Signs",
        category: "lighting" as CategoryId,
        icon: Lightbulb,
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800",
        description: "Illuminated displays for storefronts with energy-efficient LED technology.",
        features: ["LED Light Boxes", "Acrylic Faces", "Indoor/Outdoor", "Custom Sizes"],
        gradient: "from-yellow-600/20 to-amber-500/10",
        badge: "Premium",
        priceRange: "From $299.99",
        turnaround: "7-10 Days",
        rating: 4.8,
        reviews: 95,
      },
      {
        id: "neon-signs",
        title: "Custom Neon Signs",
        category: "lighting" as CategoryId,
        icon: Zap,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Custom LED neon signs for businesses, events, and decorative purposes.",
        features: ["LED Neon", "Custom Shapes", "Color Options", "Remote Control"],
        gradient: "from-pink-600/20 to-rose-500/10",
        badge: "Trending",
        isNew: true,
        priceRange: "From $199.99",
        turnaround: "5-7 Days",
        rating: 4.9,
        reviews: 65,
      },

      // PUBLISHING (3 services)
      {
        id: "book-printing",
        title: "Book Printing & Binding",
        category: "publishing" as CategoryId,
        icon: BookOpen,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
        description: "Professional book printing with multiple binding options and premium quality.",
        features: ["Hardcover", "Paperback", "Spiral Bound", "Saddle Stitch"],
        gradient: "from-purple-600/20 to-violet-500/10",
        badge: "Best Value",
        priceRange: "From $199.99",
        turnaround: "7-14 Days",
        minimum: "25 copies",
        rating: 4.8,
        reviews: 280,
      },
      {
        id: "magazine-printing",
        title: "Magazine & Catalog Printing",
        category: "publishing" as CategoryId,
        icon: Newspaper,
        image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800",
        description: "High-quality magazine and catalog printing with vibrant color reproduction.",
        features: ["Full Color", "Various Sizes", "Perfect Bound", "Glossy/Matte"],
        gradient: "from-orange-600/20 to-red-500/10",
        priceRange: "From $149.99",
        turnaround: "5-10 Days",
        rating: 4.7,
        reviews: 160,
      },
      {
        id: "manuals",
        title: "Manuals & Handbooks",
        category: "publishing" as CategoryId,
        icon: Settings,
        image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800",
        description: "Professional manual and handbook printing for businesses and organizations.",
        features: ["Perfect Binding", "Tabs & Dividers", "Lamination", "Index Pages"],
        gradient: "from-slate-600/20 to-gray-500/10",
        priceRange: "From $99.99",
        turnaround: "5-8 Days",
        rating: 4.6,
        reviews: 120,
      },

      // PACKAGING (3 services)
      {
        id: "custom-boxes",
        title: "Custom Product Boxes",
        category: "packaging" as CategoryId,
        icon: Package,
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
        description: "Premium custom boxes for retail products with luxury finishing options.",
        features: ["Rigid Boxes", "Folding Cartons", "Magnetic Closure", "Foil Stamping"],
        gradient: "from-yellow-600/20 to-gold-500/10",
        badge: "Premium",
        priceRange: "From $199.99",
        turnaround: "7-14 Days",
        minimum: "100 units",
        rating: 4.9,
        reviews: 210,
      },
      {
        id: "food-packaging",
        title: "Food Packaging",
        category: "packaging" as CategoryId,
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800",
        description: "Food-safe packaging for restaurants, cafes, and food businesses.",
        features: ["Food Grade", "Takeout Boxes", "Cup Sleeves", "Custom Labels"],
        gradient: "from-green-600/20 to-emerald-500/10",
        priceRange: "From $149.99",
        turnaround: "5-10 Days",
        rating: 4.7,
        reviews: 175,
      },
      {
        id: "mailer-boxes",
        title: "Subscription Boxes",
        category: "packaging" as CategoryId,
        icon: Send,
        image: "https://images.unsplash.com/photo-1607083206963-4c7644b50d14?w=800",
        description: "Custom subscription and mailer boxes for e-commerce businesses.",
        features: ["Custom Inserts", "Branded Tape", "Tissue Paper", "Eco-Friendly"],
        gradient: "from-pink-600/20 to-purple-500/10",
        isNew: true,
        priceRange: "From $249.99",
        turnaround: "7-12 Days",
        rating: 4.8,
        reviews: 95,
      },

      // TEXTILE (2 services)
      {
        id: "uniforms",
        title: "Work Uniforms & Apparel",
        category: "textile" as CategoryId,
        icon: Users,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        description: "Custom embroidered and printed work uniforms for businesses and organizations.",
        features: ["Embroidery", "Screen Print", "Polo Shirts", "Safety Gear"],
        gradient: "from-blue-600/20 to-navy-500/10",
        badge: "Business",
        priceRange: "From $24.99",
        turnaround: "7-14 Days",
        minimum: "20 pcs",
        rating: 4.6,
        reviews: 340,
      },
      {
        id: "sportswear",
        title: "Custom Sportswear",
        category: "textile" as CategoryId,
        icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
        description: "Team jerseys, sports uniforms, and athletic wear with custom printing.",
        features: ["Sublimation", "Team Names", "Numbers", "Moisture-Wicking"],
        gradient: "from-red-600/20 to-orange-500/10",
        priceRange: "From $29.99",
        turnaround: "7-10 Days",
        minimum: "10 pcs",
        rating: 4.5,
        reviews: 220,
      },

      // SIGNAGE (3 services)
      {
        id: "acrylic-signs",
        title: "Acrylic & Metal Signs",
        category: "signage" as CategoryId,
        icon: Ruler,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Premium acrylic and metal signs for offices, lobbies, and outdoor use.",
        features: ["Acrylic", "Aluminum", "Brushed Metal", "LED Backlit"],
        gradient: "from-slate-600/20 to-gray-500/10",
        badge: "Premium",
        priceRange: "From $149.99",
        turnaround: "5-8 Days",
        rating: 4.8,
        reviews: 160,
      },
      {
        id: "wayfinding",
        title: "Wayfinding Signs",
        category: "signage" as CategoryId,
        icon: MapPin,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Directional and informational signage systems for buildings and complexes.",
        features: ["Directory Signs", "Room Signs", "Floor Graphics", "ADA Compliant"],
        gradient: "from-blue-600/20 to-cyan-500/10",
        priceRange: "From $99.99",
        turnaround: "5-10 Days",
        rating: 4.7,
        reviews: 85,
      },
      {
        id: "yard-signs",
        title: "Yard & Lawn Signs",
        category: "signage" as CategoryId,
        icon: MapPin,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Durable outdoor yard signs for real estate, events, and political campaigns.",
        features: ["Coroplast", "Metal Stakes", "Double-Sided", "Weather Resistant"],
        gradient: "from-green-600/20 to-lime-500/10",
        priceRange: "From $19.99",
        turnaround: "2-4 Days",
        rating: 4.5,
        reviews: 290,
      },

      // DIGITAL (2 services)
      {
        id: "digital-printing",
        title: "Digital Printing Services",
        category: "digital" as CategoryId,
        icon: Monitor,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
        description: "High-speed digital printing for short runs with quick turnaround times.",
        features: ["Variable Data", "Short Runs", "Quick Turnaround", "No Setup Fees"],
        gradient: "from-blue-600/20 to-purple-500/10",
        badge: "Fast",
        popular: true,
        priceRange: "From $9.99",
        turnaround: "24-48 Hours",
        rating: 4.9,
        reviews: 670,
      },
      {
        id: "large-format-digital",
        title: "Large Format Digital",
        category: "digital" as CategoryId,
        icon: Tablet,
        image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=800",
        description: "Wide format digital printing for posters, banners, and architectural plans.",
        features: ["Up to 60\" Wide", "Photo Quality", "Instant Dry", "Scratch Resistant"],
        gradient: "from-cyan-600/20 to-blue-500/10",
        priceRange: "From $29.99",
        turnaround: "1-3 Days",
        rating: 4.8,
        reviews: 340,
      },

      // CORPORATE (3 services)
      {
        id: "corporate-stationery",
        title: "Corporate Stationery Packs",
        category: "corporate" as CategoryId,
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
        description: "Complete corporate identity packages including all essential business stationery.",
        features: ["Letterheads", "Envelopes", "Compliment Slips", "Business Cards"],
        gradient: "from-slate-600/20 to-blue-500/10",
        badge: "Bundle",
        priceRange: "From $149.99",
        turnaround: "5-7 Days",
        rating: 4.9,
        reviews: 230,
      },
      {
        id: "annual-reports",
        title: "Annual Reports",
        category: "corporate" as CategoryId,
        icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
        description: "Professional annual report printing with premium binding and finishes.",
        features: ["Hardcover", "Perfect Bound", "Foil Stamping", "Custom Sizes"],
        gradient: "from-blue-600/20 to-indigo-500/10",
        badge: "Executive",
        priceRange: "From $299.99",
        turnaround: "7-10 Days",
        rating: 4.8,
        reviews: 95,
      },
      {
        id: "corporate-gifts",
        title: "Corporate Gift Sets",
        category: "corporate" as CategoryId,
        icon: Gift,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        description: "Curated corporate gift packages with custom branding for clients and employees.",
        features: ["Gift Boxes", "Branded Items", "Custom Notes", "Luxury Packaging"],
        gradient: "from-amber-600/20 to-gold-500/10",
        priceRange: "From $49.99",
        turnaround: "5-10 Days",
        rating: 4.7,
        reviews: 150,
      },
    ],
    []
  );

  // Testimonials Data
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      rating: 5,
      text: "Dereje Printing transformed our brand with stunning business cards and banners. The quality exceeded our expectations!",
      service: "Business Cards & Banners",
    },
    {
      id: "2",
      name: "Michael Chen",
      company: "GreenLeaf Cafe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      rating: 5,
      text: "Their food packaging solutions are incredible. Our customers love the premium look and feel of our takeout boxes.",
      service: "Food Packaging",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      company: "EventPro Agency",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      rating: 5,
      text: "Fast, professional, and amazing quality. They handled our event signage for a 5000-person conference flawlessly.",
      service: "Event Signage",
    },
    {
      id: "4",
      name: "David Thompson",
      company: "Urban Athletics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      rating: 5,
      text: "Our team jerseys look amazing! The sublimation printing is top-notch and the colors are vibrant even after multiple washes.",
      service: "Custom Sportswear",
    },
  ];

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "What is the minimum order quantity?",
      answer: "Minimum order quantities vary by product. Business cards start at 100 pieces, while some items like banners have no minimum. Check each service for specific details.",
    },
    {
      question: "How long does delivery take?",
      answer: "Standard turnaround is 3-7 business days depending on the product. Rush services are available for most items with 24-48 hour turnaround.",
    },
    {
      question: "Do you offer design services?",
      answer: "Yes! Our professional design team can help create stunning designs for all your printing needs. Design consultation is included with larger orders.",
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept PDF, AI, PSD, EPS, TIFF, and high-resolution JPEG files. For best results, provide vector files with outlined fonts and CMYK color mode.",
    },
    {
      question: "Can I see a proof before printing?",
      answer: "Absolutely! We provide digital proofs for all orders. Physical proofs are available for larger orders upon request.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping rates and delivery times vary by destination. Contact us for a custom shipping quote.",
    },
  ];

  // Stats
  const stats: StatItem[] = [
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: CheckCircle, value: "25,000+", label: "Projects Completed" },
    { icon: Heart, value: "98%", label: "Client Satisfaction" },
    { icon: Clock, value: "24h", label: "Quick Turnaround" },
    { icon: Users, value: "10,000+", label: "Happy Clients" },
    { icon: Globe, value: "50+", label: "Countries Served" },
  ];

  // Event Handlers
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const clearSearch = useCallback((): void => {
    setSearchQuery("");
  }, []);

  const handleHoverStart = useCallback((id: string): void => {
    setActiveCard(id);
  }, []);

  const handleHoverEnd = useCallback((): void => {
    setActiveCard(null);
  }, []);

  const handleQuickView = useCallback((service: Service): void => {
    setQuickViewService(service);
  }, []);

  const handleCloseQuickView = useCallback((): void => {
    setQuickViewService(null);
  }, []);

  const handleNewsletterSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      // Handle newsletter subscription
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
      setShowNewsletter(false);
    },
    [email]
  );

  // Filtered and Sorted Services
  const filteredServices: Service[] = useMemo(() => {
    let filtered: Service[] = services;

    if (activeTab !== "all") {
      filtered = filtered.filter(
        (service: Service) => service.category === activeTab
      );
    }

    if (searchQuery.trim()) {
      const query: string = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service: Service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.features.some((feature: string) =>
            feature.toLowerCase().includes(query)
          )
      );
    }

    // Sort services
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "newest":
        filtered.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1));
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.priceRange?.replace(/[^0-9.]/g, "") || "0");
          const priceB = parseFloat(b.priceRange?.replace(/[^0-9.]/g, "") || "0");
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.priceRange?.replace(/[^0-9.]/g, "") || "0");
          const priceB = parseFloat(b.priceRange?.replace(/[^0-9.]/g, "") || "0");
          return priceB - priceA;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [activeTab, searchQuery, sortBy, services]);

  const bottomFeatures: BottomFeatureProps[] = [
    {
      icon: Palette,
      title: "Creative Design Team",
      text: "Our expert designers create stunning visuals that elevate your brand and capture attention.",
      index: 0,
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      text: "We use premium materials and cutting-edge technology to ensure exceptional quality on every project.",
      index: 1,
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery",
      text: "Need it quick? Our rush service delivers in as fast as 24 hours without compromising quality.",
      index: 2,
    },
    {
      icon: Globe,
      title: "Nationwide Shipping",
      text: "We deliver across the country with reliable tracking and insurance on all shipments.",
      index: 3,
    },
    {
      icon: Users,
      title: "Dedicated Support",
      text: "Get a personal account manager who understands your business and ensures seamless execution.",
      index: 4,
    },
    {
      icon: RefreshCw,
      title: "100% Satisfaction",
      text: "Not happy? We'll reprint or refund your order. Your satisfaction is our top priority.",
      index: 5,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-black text-white min-h-screen">
        {/* ANIMATED BACKGROUND ORBS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 150, -100, 50, 0],
              y: [0, -100, 150, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, -120, 80, -40, 0],
              y: [0, 120, -80, 60, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, 80, -60, 40, 0],
              y: [0, -60, 80, -30, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[130px]"
          />
          <motion.div
            animate={{
              x: [0, -80, 120, -60, 0],
              y: [0, 100, -70, 90, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/6 rounded-full blur-[100px]"
          />
        </div>

        {/* HERO SECTION */}
        <motion.div
          ref={heroRef}
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center relative z-10 pt-24 pb-16 px-5"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-8 py-4 rounded-full text-red-400 text-sm font-semibold mb-8 backdrop-blur-sm shadow-lg shadow-red-600/10"
          >
            <Sparkles className="w-5 h-5" />
            Ethiopia's #1 Premium Printing Company
            <Sparkles className="w-5 h-5" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-8"
          >
            Dereje
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
              Printing Services
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto text-white/60 text-xl leading-relaxed mb-12"
          >
            From business cards to billboards, packaging to promotional products — 
            we deliver premium printing solutions that make your brand unforgettable. 
            Serving 10,000+ businesses across Ethiopia with quality, speed, and creativity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl font-bold text-lg shadow-2xl shadow-red-600/30 flex items-center gap-3 justify-center"
            >
              <Phone className="w-5 h-5" />
              Get Free Quote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition flex items-center gap-3 justify-center backdrop-blur-sm"
            >
              <Download className="w-5 h-5" />
              Download Catalog
            </motion.button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
          >
            {stats.map((stat: StatItem) => {
              const StatIcon: LucideIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-red-500/30 transition-all group"
                >
                  <StatIcon className="w-6 h-6 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* SEARCH & FILTERS BAR */}
        <div className="max-w-7xl mx-auto relative z-10 px-5 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search 28+ printing services..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-white placeholder-white/40 focus:outline-none focus:border-red-500/50 transition-all text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white text-sm focus:outline-none focus:border-red-500/50 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>

                {/* View Toggle */}
                <div className="flex bg-white/5 rounded-2xl p-1">
                  <button
                    onClick={(): void => setViewMode("grid")}
                    className={`px-4 py-3 rounded-xl transition ${
                      viewMode === "grid"
                        ? "bg-red-600 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(): void => setViewMode("list")}
                    className={`px-4 py-3 rounded-xl transition ${
                      viewMode === "list"
                        ? "bg-red-600 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="max-w-7xl mx-auto relative z-10 px-5 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((tab: Category) => {
              const TabIcon: LucideIcon = tab.icon;
              const isActive: boolean = activeTab === tab.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={tab.id}
                  onClick={(): void => setActiveTab(tab.id)}
                  className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border flex items-center gap-3 ${
                    isActive
                      ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                  }`}
                  title={tab.description}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? "bg-red-700" : "bg-white/10"
                    }`}
                  >
                    {tab.count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-red-600 rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* SERVICES GRID/LIST */}
        <div ref={servicesRef} className="max-w-7xl mx-auto relative z-10 px-5 pb-20">
          <AnimatePresence mode="wait">
            {filteredServices.length > 0 ? (
              <motion.div
                key={`${activeTab}-${sortBy}-${viewMode}`}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "flex flex-col gap-6"
                }
              >
                {filteredServices.map((service: Service, index: number) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index}
                    isActive={activeCard === service.id}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onQuickView={handleQuickView}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-3xl font-bold mb-3">No Services Found</h3>
                <p className="text-white/60 text-lg">
                  Try adjusting your search or filter criteria to find what you need.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="mt-6 px-8 py-4 bg-red-600 rounded-2xl font-bold hover:bg-red-700 transition"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="max-w-7xl mx-auto relative z-10 px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              What Our <span className="text-red-500">Clients Say</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their printing needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-4xl mx-auto relative z-10 px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq: FAQ, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-white/10 transition"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-white/60"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div className="max-w-7xl mx-auto relative z-10 px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Why Choose <span className="text-red-500">Dereje Printing</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We combine cutting-edge technology with creative expertise to deliver outstanding results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bottomFeatures.map((feature: BottomFeatureProps, index: number) => (
              <BottomFeature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>

        {/* NEWSLETTER CTA */}
        <div className="max-w-4xl mx-auto relative z-10 px-5 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-600/20 to-purple-600/20 border border-red-500/20 rounded-3xl p-12 text-center backdrop-blur-xl"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Get Exclusive Deals
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and receive 15% off your first order plus early access to promotions.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition flex items-center gap-2 justify-center"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* QUICK VIEW MODAL */}
        <AnimatePresence>
          {quickViewService && (
            <QuickViewModal
              service={quickViewService}
              onClose={handleCloseQuickView}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Services;