import { Link } from "react-router-dom";
import { Printer, MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="app_footer" className="bg-[#0D0D0D] border-t border-white/5 text-white/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-1 space-y-4">
            <Link id="footer_brand" to="/" onClick={handleScrollToTop} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C41E3A] flex items-center justify-center font-bold text-xl rounded-sm text-white">
                D
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-md text-white uppercase">
                  Dereje <span className="text-[#C41E3A]">Press</span>
                </span>
                <span className="text-[8px] text-white/40 uppercase tracking-[0.2em] mt-0.5">
                  Advertising & Printing
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              Premium quality printing press supplying bespoke commercial catalogs, high-impact backlit displays, and custom packaging across Ethiopia with architectural precision or speed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C41E3A] hover:text-white rounded-sm transition duration-200">
                <span className="sr-only">Facebook</span>
                <span className="font-serif block w-4 h-4 text-center leading-none">f</span>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C41E3A] hover:text-white rounded-sm transition duration-200 font-bold text-xs">
                X
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[#C41E3A] hover:text-white rounded-sm transition duration-200 font-bold text-xs">
                IN
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-mono">
              Operational Pages
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link id="footer_link_home" to="/" onClick={handleScrollToTop} className="hover:text-[#C41E3A] transition duration-200 flex items-center gap-1">
                  Home Landing <ArrowUpRight className="w-3 h-3 text-white/20" />
                </Link>
              </li>
              <li>
                <Link id="footer_link_services" to="/services" onClick={handleScrollToTop} className="hover:text-[#C41E3A] transition duration-200 flex items-center gap-1">
                  Dynamic Services <ArrowUpRight className="w-3 h-3 text-white/20" />
                </Link>
              </li>
              <li>
                <Link id="footer_link_portfolio" to="/portfolio" onClick={handleScrollToTop} className="hover:text-[#C41E3A] transition duration-200 flex items-center gap-1">
                  Premium Portfolio <ArrowUpRight className="w-3 h-3 text-white/20" />
                </Link>
              </li>
              <li>
                <Link id="footer_link_about" to="/about" onClick={handleScrollToTop} className="hover:text-[#C41E3A] transition duration-200 flex items-center gap-1">
                  Company Story <ArrowUpRight className="w-3 h-3 text-white/20" />
                </Link>
              </li>
              <li>
                <Link id="footer_link_contact" to="/contact" onClick={handleScrollToTop} className="hover:text-[#C41E3A] transition duration-200 flex items-center gap-1">
                  Support & Contacts <ArrowUpRight className="w-3 h-3 text-white/20" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Print Specialties */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-mono">
              Specialized Divisions
            </h4>
            <ul className="space-y-1.5 text-xs font-light text-white/30">
              <li>• Large Format Banner Graphics</li>
              <li>• Commercial Die-Cut Packaging</li>
              <li>• High-End Foil Stationery</li>
              <li>• Corporate Exhibition Backdrops</li>
              <li>• Industrial Laser-Cut Signs</li>
              <li>• Custom Corporate Merch</li>
            </ul>
          </div>

          {/* Column 4: Contact Core */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase font-mono">
              Headquarters Info
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2 text-white/50">
                <MapPin className="w-4 h-4 text-[#C41E3A] shrink-0 mt-0.5" />
                <span className="font-light leading-snug">
                  Richi,Meskerem Mazoria, Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C41E3A] shrink-0" />
                <span className="font-mono text-xs text-white/70">+251 902393280</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C41E3A] shrink-0" />
                <span className="font-mono text-xs text-white/70">2dpress@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-[#C41E3A]/60 shrink-0" />
                <span className="text-white/40">Mon - Sat: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <hr className="border-white/5 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider text-white/30">
          <p>© {currentYear} Tezer Company• All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:underline hover:text-white/60">Terms</a>
            <a href="#" className="hover:underline hover:text-white/60">Privacy</a>
            <Link to="/admin/login" className="hover:underline hover:text-white/60">Staff Gateway</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
