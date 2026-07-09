import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Printer,
  AlertCircle,
} from "lucide-react";
import { api } from "../services/api";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function Login({
  onLoginSuccess,
}: LoginProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.login(username, password);

      onLoginSuccess(response.token);

      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(
        err.message || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center px-5 py-10 text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-600/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-600/10 blur-[120px]" />

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
      >
        {/* TOP GLOW */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500" />

        {/* HEADER */}
        <div className="px-8 pt-10 pb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-3xl bg-red-600/20 border border-red-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <Printer className="w-10 h-10 text-red-500" />
          </motion.div>

          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400 text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            Secure Admin Portal
          </div>

          <h1 className="text-4xl font-black leading-tight">
            Welcome Back
          </h1>

          <p className="text-white/50 mt-4 leading-relaxed text-sm">
            Login to manage Dereje Printing Press orders,
            customers, products, and printing operations.
          </p>
        </div>

        {/* FORM */}
        <div className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* USERNAME */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-3">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-14 pr-5 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-3">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-14 pr-14 text-white placeholder:text-white/30 outline-none focus:border-red-500 transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 flex items-start gap-3 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

                  <p className="text-sm leading-relaxed">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LOGIN BUTTON */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 py-4 font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-red-600/20"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* SECURITY */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>

              <div>
                <h3 className="font-bold text-white mb-1">
                  Protected Access
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  This admin area is secured and only accessible
                  to authorized Dereje Printing Press staff.
                </p>
              </div>
            </div>
          </form>

          {/* BACK BUTTON */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-all text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}