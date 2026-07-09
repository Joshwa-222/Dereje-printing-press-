import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Printer,
} from "lucide-react";

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Navbar({
  isAdmin,
  onLogout,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0B0B]/95 backdrop-blur-xl border-white/10 shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[78px] flex items-center justify-between">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C41E3A] to-[#8f1026] flex items-center justify-center shadow-lg shadow-[#C41E3A]/20 group-hover:scale-105 transition">
                  <Printer className="w-6 h-6 text-white" />
                </div>

                <div className="absolute -inset-1 bg-[#C41E3A]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
              </div>

              <div className="leading-tight">
                <h1 className="text-white font-black uppercase tracking-wide text-sm sm:text-base">
                  Dereje Printing
                </h1>

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">
                  Press & Advertising
                </p>
              </div>
            </Link>

            {/* ========================= */}
            {/* DESKTOP NAVIGATION */}
            {/* ========================= */}

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-[13px] uppercase tracking-wider font-semibold transition ${
                      active
                        ? "text-[#C41E3A]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}

                    {active && (
                      <motion.div
                        layoutId="navbar-active-line"
                        className="absolute left-0 -bottom-2 h-[2px] w-full bg-[#C41E3A]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ========================= */}
            {/* RIGHT SIDE */}
            {/* ========================= */}

            <div className="hidden lg:flex items-center gap-4">

              {/* Admin Dashboard */}

              {isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C41E3A] hover:bg-[#a31530] transition text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C41E3A]/20"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-[#C41E3A]/40 text-white/70 hover:text-white transition text-xs uppercase tracking-wider"
                  >
                    <LogOut className="w-4 h-4 text-[#C41E3A]" />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* ========================= */}
            {/* MOBILE BUTTON */}
            {/* ========================= */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ========================= */}
      {/* MOBILE MENU */}
      {/* ========================= */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[78px] left-0 w-full z-40 lg:hidden bg-[#0B0B0B]/98 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-3">

              {/* Mobile Links */}

              {navLinks.map((link) => {
                const active = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl uppercase tracking-wider text-sm font-semibold transition ${
                      active
                        ? "bg-[#C41E3A]/10 text-[#C41E3A] border border-[#C41E3A]/20"
                        : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Admin */}

              {isAdmin && (
                <>
                  <div className="border-t border-white/10 my-3" />

                  <Link
                    to="/admin/dashboard"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C41E3A] text-white font-bold uppercase tracking-wider text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/70 uppercase tracking-wider text-sm"
                  >
                    <LogOut className="w-4 h-4 text-[#C41E3A]" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}