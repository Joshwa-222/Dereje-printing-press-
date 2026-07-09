import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Eye,
  X,
  CheckCircle2,
  Sparkles,
  Layers3,
  AlertTriangle,
} from "lucide-react";

import { api } from "../services/api";
import { PortfolioItem } from "../types";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  const [search, setSearch] = useState<string>("");

  const [activeItem, setActiveItem] =
    useState<PortfolioItem | null>(null);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    async function loadPortfolio() {
      try {
        setLoading(true);

        const data = await api.getPortfolio();

        setPortfolio(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  // =========================
  // CATEGORIES
  // =========================
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(portfolio.map((item) => item.category))
      ),
    ];
  }, [portfolio]);

  // =========================
  // FILTER
  // =========================
  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((item) => {
      const categoryMatch =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const searchMatch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [portfolio, selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C41E3A]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 border border-[#C41E3A]/20 bg-[#C41E3A]/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#C41E3A]" />

            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#C41E3A]">
              Dereje Printing Press
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">
            Printing Portfolio
          </h1>

          <p className="text-white/50 text-sm md:text-base mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore premium printing projects including banners,
            brochures, packaging, business cards, branding,
            outdoor advertising, and commercial printing works.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">

          <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Projects
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {portfolio.length}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center">
                <Layers3 className="w-5 h-5 text-[#C41E3A]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Categories
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {categories.length - 1}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#C41E3A]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Quality
                </p>

                <h3 className="text-3xl font-black mt-2">
                  HD
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C41E3A]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Delivery
                </p>

                <h3 className="text-3xl font-black mt-2">
                  Fast
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#C41E3A]" />
              </div>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mt-12 bg-[#0D0D0D] border border-white/5 rounded-3xl p-5">

          <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#050505] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C41E3A]"
              />
            </div>

            {/* CATEGORIES */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`px-5 py-3 rounded-2xl text-[11px] uppercase font-bold tracking-wider transition whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-[#C41E3A] text-white"
                      : "bg-[#050505] border border-white/5 text-white/40 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-12">

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[420px] rounded-3xl bg-[#0D0D0D] border border-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="max-w-md mx-auto bg-[#C41E3A]/10 border border-[#C41E3A]/20 rounded-3xl p-8 text-center">
              <AlertTriangle className="w-10 h-10 text-[#C41E3A] mx-auto mb-4" />

              <h3 className="text-xl font-bold">
                Failed to Load
              </h3>

              <p className="text-white/50 text-sm mt-2">
                {error}
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredPortfolio.length === 0 && (
              <div className="text-center py-24">
                <h3 className="text-2xl font-bold uppercase">
                  No Projects Found
                </h3>

                <p className="text-white/40 text-sm mt-3">
                  Try another search or category.
                </p>
              </div>
            )}

          {/* GRID */}
          {!loading &&
            !error &&
            filteredPortfolio.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
              >
                <AnimatePresence>
                  {filteredPortfolio.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveItem(item)}
                      className="group cursor-pointer bg-[#0D0D0D] border border-white/5 hover:border-[#C41E3A]/40 rounded-3xl overflow-hidden transition"
                    >

                      {/* IMAGE */}
                      <div className="relative h-[320px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-4 left-4">
                          <span className="bg-[#C41E3A] text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
                            {item.category}
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-black uppercase">
                            {item.title}
                          </h3>

                          <p className="text-white/60 text-sm mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <CheckCircle2 className="w-4 h-4 text-[#C41E3A]" />
                          Verified Project
                        </div>

                        <Eye className="w-4 h-4 text-white/40 group-hover:text-[#C41E3A]" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D0D0D] border border-white/10 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[92vh] flex flex-col lg:flex-row"
            >

              {/* IMAGE */}
              <div className="lg:w-[60%] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="lg:w-[40%] p-8 relative overflow-y-auto">

                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#050505] border border-white/5 flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="inline-block bg-[#C41E3A]/10 border border-[#C41E3A]/20 text-[#C41E3A] px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  {activeItem.category}
                </span>

                <h2 className="text-3xl font-black uppercase mt-6">
                  {activeItem.title}
                </h2>

                <p className="text-white/60 leading-relaxed text-sm mt-6">
                  {activeItem.description}
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    "Premium Print Quality",
                    "Professional Finishing",
                    "Commercial Grade Materials",
                    "Verified Client Delivery",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#C41E3A]/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#C41E3A]" />
                      </div>

                      <span className="text-white/80 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-10 bg-[#C41E3A] hover:bg-[#a31830] transition rounded-2xl py-4 text-white font-bold uppercase tracking-widest text-xs">
                  Request Similar Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}