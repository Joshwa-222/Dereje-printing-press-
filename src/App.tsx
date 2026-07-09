import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

// Route wrapper animation coordinator
function AnimatedApp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Validate session status on initial boot
  useEffect(() => {
    const token = localStorage.getItem("dereje_admin_token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("dereje_admin_token", token);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("dereje_admin_token");
    setIsAdmin(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] font-sans text-white select-none">
      
      {/* Structural Navbar */}
      <Navbar isAdmin={isAdmin} onLogout={handleLogout} />

      {/* Main interactive routes display block */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="min-h-[80vh]"
          >
            <Routes location={location}>
              {/* Customer Access Points */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Secure Administrative Access Gates */}
              <Route 
                path="/admin/login" 
                element={
                  isAdmin ? (
                    <Navigate to="/admin/dashboard" replace />
                  ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                  )
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  isAdmin ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                } 
              />

              {/* Catch-all redirect back to client landing site Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Corporate Foot footer block */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedApp />
    </Router>
  );
}
