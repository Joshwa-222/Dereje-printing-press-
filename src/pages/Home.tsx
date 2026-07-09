import { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Printer,
  Package,
  FileText,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Zap,
  BookOpen,
  ShoppingBag,
  Layers,
  LucideIcon,
} from "lucide-react";

// Types
interface Service {
  title: string;
  icon: LucideIcon;
  desc: string;
  features: string[];
  price?: string;
}

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface WelcomeSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const welcomeSlides: WelcomeSlide[] = [
  {
    title: "Dereje Press",
    subtitle: "WELCOME TO Ethiopia's Premier Print Partner",
    description: "Where creative concepts are transformed into flawless, high-impact physical reality. Explore high-end advertising, branding, and commercial print solutions.",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1600&q=80",
    icon: Printer,
  },
  {
    title: "Express Delivery",
    subtitle: "ADVANCED HIGH-SPEED REPRODUCTION",
    description: "High-volume catalogs, flawless commercial books, and rapid flyers. Utilizing computerized workflows to deliver incredible speed with absolute pin-sharp precision.",
    image: "https://images.unsplash.com/photo-1581092919535-7146ff1a5905?auto=format&fit=crop&w=1600&q=80",
    icon: Zap,
  },
  {
    title: "Elite Branding",
    subtitle: "UNCOMPROMISING PROFESSIONAL REPUTATION",
    description: "Exquisite executive business cards with heavy card stock, gold hot-foil lettering, and soft-touch tactile laminate coatings for the ultimate luxury feel.",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80",
    icon: Package,
  },
  {
    title: "Grand Formats",
    subtitle: "OUTSTANDING VISUAL SIZE & IMPACT",
    description: "Massive outdoor advertising billboards, weather-resistant fabric vinyl banners, and custom exhibition panels engineered to withstand intense solar exposure.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    icon: Layers,
  },
  {
    title: "Masterful Bindery",
    subtitle: "DURABLE BOOK PRODUCTION & COVERS",
    description: "Saddle-stitching, perfect hot-glue binding, hardback fabric covers, and custom notebook manufacturing with meticulous spine-strength quality assurance.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1600&q=80",
    icon: BookOpen,
  },
  {
    title: "Bespoke Packaging",
    subtitle: "CREATIVE DIES & STRUCTURAL INTEGRITY",
    description: "Rigid luxury gift boxes, branded paper carrier bags, and corrugated mailers designed with precise tolerances for product safety and brand cohesion.",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1600&q=80",
    icon: ShoppingBag,
  },
  {
    title: "Specialist Coatings",
    subtitle: "SPOT UV & TEXTURED EMBOSSING",
    description: "Make specific design elements pop off the page with raised 3D textures, gloss spot UV varnishes, and customized blind debossing techniques.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
    icon: Sparkles,
  },
  {
    title: "Executive Swag",
    subtitle: "MEMORABLE ENGRAVED CORPORATE MERCHANDISE",
    description: "Laser-engraved thermal metal flasks, corporate branded leather diaries, premium pens, and custom employee onboarding kits designed for deep brand loyalty.",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1600&q=80",
    icon: Star,
  },
  {
    title: "Certified Quality",
    subtitle: "STRICT ZERO-DEFECT REPRODUCTION POLICIES",
    description: "Every batch of output undergoes high-definition optical check, alignment registration testing, and meticulous color-matching audits to ensure complete fidelity.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
    icon: Shield,
  },
  {
    title: "Strategic Solutions",
    subtitle: "DEDICATED ACCOUNT REPS & ADVICE",
    description: "Enjoy continuous support with a personal account manager, professional artwork validation, pre-press proofing, and tailored flexible volume pricing.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    icon: Users,
  }
];

const Home: FC = () => {
  // Services data
  const services: Service[] = [
    {
      title: "Banner Printing",
      icon: Printer,
      desc: "Vibrant high-resolution indoor and outdoor banner printing using premium, weather-resistant materials.",
      features: ["HD Print Resolution", "Weather & UV Resistant", "Bespoke Size Options"],
      price: "Starting from $29",
    },
    {
      title: "Business Cards",
      icon: Package,
      desc: "Sophisticated corporate business cards featuring modern card finishes, embossing, and luxury foil stamping.",
      features: ["Premium Heavy Stock", "Gold/Silver Foil Options", "Express Overnight Delivery"],
      price: "Starting from $19",
    },
    {
      title: "Flyer Printing",
      icon: FileText,
      desc: "Professional eye-catching promotional flyers and marketing handouts with lightning-fast turnarounds.",
      features: ["Bulk Order Discounts", "Same-Day Print Options", "Diverse Sizes & Weights"],
      price: "Starting from $49",
    },
  ];

  // Stats data
  const stats: Stat[] = [
    { icon: Users, value: "500+", label: "Corporate Clients" },
    { icon: Star, value: "15+", label: "Years Experience" },
    { icon: Clock, value: "24h", label: "Fast Turnaround" },
    { icon: Shield, value: "100%", label: "Quality Standards" },
  ];

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "Tewodros Kassahun",
      role: "Marketing Manager",
      text: "Dereje Press is outstanding. Our outdoor billboard banners are crisp, perfectly saturated, and resistant to rain and heavy sun.",
      rating: 5,
    },
    {
      name: "Selamawit Kebede",
      role: "Creative Director",
      text: "Exceptional speed and professional precision. Their foil-stamped business cards elevated our corporate identity instantly.",
      rating: 5,
    },
    {
      name: "Yared Demeke",
      role: "Corporate Event Lead",
      text: "They consistently pull off complex last-minute print orders on time. Absolute lifesaver for our annual international summits.",
      rating: 5,
    },
  ];

  const heroBackgrounds: string[] = [
    "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1581092919535-7146ff1a5905?auto=format&fit=crop&w=1600&q=80",
  ];

  // Component States
  const [activeHeroBg, setActiveHeroBg] = useState<number>(0);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Auto-rotating Hero Background
  useEffect(() => {
    if (showWelcome) return;
    const interval = setInterval(() => {
      setActiveHeroBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [showWelcome]);

  // Welcome Screen Progress bar effect
  useEffect(() => {
    if (!showWelcome) return;

    setProgress(0);
    const intervalTime = 30; // ms
    const totalDuration = 4500; // 4.5 seconds per slide
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Advance slide or end welcome page
          if (slideIndex < welcomeSlides.length - 1) {
            setSlideIndex((prevIndex) => prevIndex + 1);
          } else {
            setShowWelcome(false);
          }
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [slideIndex, showWelcome]);

  // Handlers for manual slide switching on Welcome Screen
  const handleNextSlide = () => {
    if (slideIndex < welcomeSlides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setShowWelcome(false);
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleSkipIntro = () => {
    setShowWelcome(false);
  };

  const handleReplayIntro = () => {
    setSlideIndex(0);
    setProgress(0);
    setShowWelcome(true);
  };

  const currentSlide = welcomeSlides[slideIndex] || welcomeSlides[0];
  const ActiveWelcomeIcon = currentSlide.icon;

  return (
    <>
      {/* MULTI-PAGE / MULTI-SLIDE WELCOME SCREEN */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden select-none"
          >
            {/* Background Slideshow with deep crossfades */}
            <div className="absolute inset-0">
              <motion.img
                key={slideIndex}
                src={currentSlide.image}
                alt="Welcome Background"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.45, scale: 1.02 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
              {/* Complex dark aesthetic overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0A0A0A]/70 to-black/90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.1)_0%,transparent_70%)]" />
            </div>

            {/* Story Style Top Progress Indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 flex gap-3.5 z-50">
              {welcomeSlides.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: idx < slideIndex ? "100%" : idx === slideIndex ? `${progress}%` : "0%",
                      transition: idx === slideIndex ? "none" : "width 0.3s ease-out",
                    }}
                    className="h-full bg-gradient-to-r from-[#C41E3A] to-red-500 rounded-full"
                  />
                </div>
              ))}
            </div>

            {/* Top Control Rail */}
            <div className="absolute top-14 left-0 right-0 px-8 flex justify-between items-center z-50">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#C41E3A] animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-white/80">
                  Dereje Press
                </span>
              </div>
              <button
                onClick={handleSkipIntro}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/20 transition backdrop-blur-md hover:scale-105 active:scale-95"
              >
                Skip Intro
              </button>
            </div>

            {/* Manual Navigation Chevrons */}
            <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
              <button
                onClick={handlePrevSlide}
                disabled={slideIndex === 0}
                className={`w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition pointer-events-auto hover:bg-white/10 hover:border-white/20 disabled:opacity-20 disabled:pointer-events-none ${
                  slideIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition pointer-events-auto hover:bg-white/10 hover:border-white/20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Central Animated Card Container */}
            <div className="relative z-10 max-w-2xl w-full px-6 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 md:p-12 shadow-2xl relative"
                >
                  {/* Subtle red outline ambient glow */}
                  <div className="absolute inset-0 rounded-3xl border border-[#C41E3A]/20 pointer-events-none" />

                  {/* Top Slide Number Indicator */}
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C41E3A] font-bold block mb-4">
                    Slide {slideIndex + 1} of {welcomeSlides.length}
                  </span>

                  {/* Icon with glowing aura */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-[#C41E3A]/40 rounded-2xl blur-xl scale-125" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#C41E3A] to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <ActiveWelcomeIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Slide Content */}
                  <span className="block text-[10px] md:text-xs uppercase tracking-[0.3em] font-extrabold text-white/50 mb-3">
                    {currentSlide.subtitle}
                  </span>
                  
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">
                    {currentSlide.title.split(" ").map((word, i) => (
                      <span key={i} className={i === 0 ? "text-white" : i === 1 && slideIndex === 0 ? "text-[#C41E3A]" : "text-white"}>
                        {word}{" "}
                      </span>
                    ))}
                  </h2>

                  <p className="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-lg mx-auto mb-8">
                    {currentSlide.description}
                  </p>

                  {/* Action/Enter Button on the last slide, Next on others */}
                  <button
                    onClick={handleNextSlide}
                    className="group relative inline-flex items-center gap-2 bg-[#C41E3A] hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition shadow-lg shadow-[#C41E3A]/30 hover:scale-105 active:scale-95"
                  >
                    {slideIndex === welcomeSlides.length - 1 ? "Enter Showroom" : "Continue"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Brand Slogan */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-[10px] uppercase tracking-[0.25em] text-white/30 z-20 font-mono">
              Dereje Printing Press • Precision Commercial Reproduction
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MAIN HOME PAGE CONTENT
          ======================================================== */}
      <div className="bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
        
        {/* HERO INTRO BLOCK */}
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          {/* Dynamic Carousel background */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroBg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8 }}
                className="absolute inset-0"
              >
                <motion.img
                  src={heroBackgrounds[activeHeroBg]}
                  alt="Dereje Production Floor"
                  animate={{
                    scale: [1, 1.08, 1],
                    x: ["-2%", "2%", "-2%"],
                  }}
                  transition={{
                    scale: { duration: 12, repeat: Infinity, ease: "linear" },
                    x: { duration: 18, repeat: Infinity, ease: "linear" },
                  }}
                  className="w-full h-full object-cover opacity-60"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          {/* Artistic Neon Blur Lights */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-24 left-12 w-80 h-80 bg-[#C41E3A]/25 blur-3xl rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-16 right-16 w-96 h-96 bg-red-600/15 blur-3xl rounded-full"
          />

          {/* Hero Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-8"
            >
              <div className="w-22 h-22 bg-[#C41E3A] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#C41E3A]/40 mx-auto">
                <Printer className="w-11 h-11 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight uppercase mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Dereje
              </span>
              <br />
              <span className="text-[#C41E3A] drop-shadow-[0_4px_12px_rgba(196,30,58,0.3)]">
                Printing Press
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/70 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              Premium high-speed commercial printing, outstanding branding layouts, 
              custom packaging, and strategic advertising solutions across Ethiopia.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link
                to="/services"
                className="group w-full sm:w-auto bg-[#C41E3A] hover:bg-red-700 px-10 py-4.5 rounded-full font-bold text-md tracking-wider uppercase transition shadow-xl shadow-[#C41E3A]/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-98"
              >
                Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="group w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-10 py-4.5 rounded-full font-bold text-md tracking-wider uppercase transition backdrop-blur-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-98"
              >
                Contact Press
                <Phone className="w-5 h-5" />
              </Link>
            </div>

            {/* Bottom Quick Controls & Replay Intro Button */}
            <div className="flex justify-center items-center gap-8 mt-16 text-xs text-white/40 font-mono">
              <button
                onClick={handleReplayIntro}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/5 hover:bg-[#C41E3A]/10 hover:border-[#C41E3A]/20 hover:text-white transition duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#C41E3A] animate-spin-slow" />
                <span>Replay Intro Slideshow</span>
              </button>
              <span>•</span>
              <div className="flex gap-2.5">
                {heroBackgrounds.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveHeroBg(index)}
                    className={`transition-all duration-300 ${
                      activeHeroBg === index ? "w-6 h-2 bg-[#C41E3A] rounded-full" : "w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Slow mouse wheel animation */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
          >
            <div className="w-7 h-11 border border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-2.5 bg-white/50 rounded-full mt-2.5"
              />
            </div>
          </motion.div>
        </section>

        {/* METRICS STATS RAIL */}
        <section className="relative py-20 px-6 bg-gradient-to-b from-transparent to-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6, borderColor: "rgba(196,30,58,0.3)" }}
                    className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#C41E3A]/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#C41E3A]/20">
                      <StatIcon className="w-6 h-6 text-[#C41E3A]" />
                    </div>
                    <div className="text-3xl md:text-5xl font-black text-white mb-2 font-mono">
                      {stat.value}
                    </div>
                    <div className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED SERVICES DIVISION */}
        <section className="py-24 px-6 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#C41E3A] font-bold block mb-3">
                Industrial Specialties
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                Outstanding Print Services
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light">
                Leveraging premium state-of-the-art press systems to deliver unparalleled definition, speed, and competitive value.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className="bg-gradient-to-b from-white/5 to-[#0F0F0F] border border-white/5 hover:border-[#C41E3A]/40 rounded-3xl p-8 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 bg-[#C41E3A]/10 border border-[#C41E3A]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C41E3A]/20 transition-all duration-300">
                        <ServiceIcon className="w-7 h-7 text-[#C41E3A]" />
                      </div>

                      <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-white group-hover:text-[#C41E3A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">
                        {service.desc}
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-white/70">
                            <CheckCircle className="w-4 h-4 text-[#C41E3A] shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {service.price && (
                        <p className="text-lg font-black text-[#C41E3A] mb-5 font-mono">
                          {service.price}
                        </p>
                      )}

                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-white hover:text-[#C41E3A] transition group/btn"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CUSTOMER ACCLAIM TESTIMONIALS */}
        <section className="py-24 px-6 bg-black relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/10 blur-[150px] rounded-full" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#C41E3A] font-bold block mb-3">
                Client Accolades
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                Trusted Across Ethiopia
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto font-light">
                Why organizations, event organizers, and local agencies rely exclusively on Dereje Press.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((test, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/5 border border-white/5 rounded-3xl p-8 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C41E3A] text-[#C41E3A]" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 font-light italic">
                      "{test.text}"
                    </p>
                  </div>
                  
                  <div className="border-t border-white/5 pt-5 mt-auto flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C41E3A]/20 flex items-center justify-center font-bold text-sm text-[#C41E3A]">
                      {test.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase text-white">{test.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION CAMPAIGN SECTION */}
        <section className="py-24 px-6 bg-[#0A0A0A]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C41E3A]/15 to-red-600/5 rounded-[40px] blur-2xl" />
            
            <div className="relative bg-gradient-to-r from-[#C41E3A] to-red-800 rounded-[40px] p-8 md:p-16 text-center overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-white/90 font-bold block mb-4">
                  Request a Free Quote
                </span>
                
                <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                  Ready to Start Your Project?
                </h2>
                
                <p className="text-white/95 text-sm md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  Connect with Dereje Printing Press & Advertising for tailored solutions, bespoke designs, 
                  and reliable express delivery. We print results that power your growth.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4.5">
                  <Link
                    to="/contact"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#C41E3A] transition px-10 py-4.5 rounded-full font-bold text-sm uppercase tracking-wider shadow-xl group hover:scale-105 active:scale-98"
                  >
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:+251902393280"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-white/40 hover:border-white/70 hover:bg-white/10 transition px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 active:scale-98"
                  >
                    <Phone className="w-4 h-4" />
                    Call +251 902393280
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
};

export default Home;
