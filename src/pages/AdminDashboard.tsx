import { useEffect, useMemo, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Search,
  RefreshCw,
  X,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FolderKanban,
  Inbox,
  TrendingUp,
  Activity,
  Image as ImageIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { api } from "../services/api";
import {
  Service,
  PortfolioItem,
  ContactMessage,
  DashboardStats,
} from "../types";

interface LoginProps {
  onLoginSuccess?: (token: string) => void;
}

type AdminTab =
  | "overview"
  | "services"
  | "portfolio"
  | "messages"
  | "settings";

export default function AdminSystem({
  onLoginSuccess,
}: LoginProps) {
  const navigate = useNavigate();

  /* =======================================================
      AUTH
  ======================================================= */

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [authLoading, setAuthLoading] =
    useState(false);

  const [authError, setAuthError] = useState("");

  /* =======================================================
      DASHBOARD
  ======================================================= */

  const [activeTab, setActiveTab] =
    useState<AdminTab>("overview");

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [services, setServices] = useState<Service[]>(
    []
  );

  const [portfolio, setPortfolio] = useState<
    PortfolioItem[]
  >([]);

  const [messages, setMessages] = useState<
    ContactMessage[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  /* =======================================================
      MODALS
  ======================================================= */

  const [serviceModal, setServiceModal] =
    useState(false);

  const [portfolioModal, setPortfolioModal] =
    useState(false);

  const [editingService, setEditingService] =
    useState<Partial<Service> | null>(null);

  const [editingPortfolio, setEditingPortfolio] =
    useState<Partial<PortfolioItem> | null>(null);

  const [isCreatingService, setIsCreatingService] =
    useState(false);

  const [isCreatingPortfolio, setIsCreatingPortfolio] =
    useState(false);

  /* =======================================================
      TOAST
  ======================================================= */

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const triggerToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /* =======================================================
      LOGIN
  ======================================================= */

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setAuthError("Please enter username and password.");
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError("");

      const response = await api.login(
        username,
        password
      );

      localStorage.setItem(
        "dereje_admin_token",
        response.token
      );

      onLoginSuccess?.(response.token);

      setIsAuthenticated(true);

      triggerToast("Login successful");
    } catch (err: any) {
      setAuthError(
        err.message || "Authentication failed"
      );
    } finally {
      setAuthLoading(false);
    }
  };

  /* =======================================================
      LOAD DATA
  ======================================================= */

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        statsData,
        servicesData,
        portfolioData,
        messagesData,
      ] = await Promise.all([
        api.getStats(),
        api.getServices(),
        api.getPortfolio(),
        api.getContactMessages(),
      ]);

      setStats(statsData);
      setServices(servicesData);
      setPortfolio(portfolioData);
      setMessages(messagesData);
    } catch (err: any) {
      setError(err.message || "Failed loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(
      "dereje_admin_token"
    );

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  /* =======================================================
      LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "dereje_admin_token"
    );

    setIsAuthenticated(false);

    navigate("/");
  };

  /* =======================================================
      FILTERS
  ======================================================= */

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [services, search]);

  /* =======================================================
      CRUD - SERVICES
  ======================================================= */

  const openCreateService = () => {
    setEditingService({
      name: "",
      category: "",
      description: "",
      image: "",
      price: "",
      featured: false,
    });

    setIsCreatingService(true);
    setServiceModal(true);
  };

  const openEditService = (service: Service) => {
    setEditingService(service);

    setIsCreatingService(false);
    setServiceModal(true);
  };

  const saveService = async (e: FormEvent) => {
    e.preventDefault();

    if (!editingService) return;

    try {
      if (isCreatingService) {
        await api.createService(editingService);

        triggerToast("Service created");
      } else {
        await api.updateService(
          editingService.id!,
          editingService
        );

        triggerToast("Service updated");
      }

      setServiceModal(false);

      loadDashboardData();
    } catch (err: any) {
      triggerToast(
        err.message || "Operation failed",
        "error"
      );
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm("Delete service?")) return;

    try {
      await api.deleteService(id);

      triggerToast("Service deleted");

      loadDashboardData();
    } catch (err: any) {
      triggerToast("Delete failed", "error");
    }
  };

  /* =======================================================
      CRUD - PORTFOLIO
  ======================================================= */

  const openCreatePortfolio = () => {
    setEditingPortfolio({
      title: "",
      category: "",
      description: "",
      image: "",
    });

    setIsCreatingPortfolio(true);
    setPortfolioModal(true);
  };

  const openEditPortfolio = (
    item: PortfolioItem
  ) => {
    setEditingPortfolio(item);

    setIsCreatingPortfolio(false);
    setPortfolioModal(true);
  };

  const savePortfolio = async (e: FormEvent) => {
    e.preventDefault();

    if (!editingPortfolio) return;

    try {
      if (isCreatingPortfolio) {
        await api.createPortfolioItem(
          editingPortfolio
        );

        triggerToast("Portfolio created");
      } else {
        await api.updatePortfolioItem(
          editingPortfolio.id!,
          editingPortfolio
        );

        triggerToast("Portfolio updated");
      }

      setPortfolioModal(false);

      loadDashboardData();
    } catch (err: any) {
      triggerToast(
        err.message || "Operation failed",
        "error"
      );
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!window.confirm("Delete project?")) return;

    try {
      await api.deletePortfolioItem(id);

      triggerToast("Portfolio deleted");

      loadDashboardData();
    } catch (err: any) {
      triggerToast("Delete failed", "error");
    }
  };

  /* =======================================================
      DELETE MESSAGE
  ======================================================= */

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Delete message?")) return;

    try {
      await api.deleteContactMessage(id);

      triggerToast("Message deleted");

      loadDashboardData();
    } catch {
      triggerToast("Delete failed", "error");
    }
  };

  /* =======================================================
      LOGIN PAGE
  ======================================================= */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 text-white overflow-hidden relative">
        <div className="absolute w-[500px] h-[500px] bg-red-600/10 blur-[140px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-red-600/10 border border-red-600/20 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="mt-6 text-3xl font-black">
              Dereje Admin
            </h1>

            <p className="text-white/40 mt-2 text-sm">
              Printing Press Dashboard
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div>
              <label className="text-xs text-white/50 block mb-2">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-red-500"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 block mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-11 pr-12 outline-none focus:border-red-500"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-white/50" />
                  ) : (
                    <Eye className="w-4 h-4 text-white/50" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm flex gap-3">
                <AlertTriangle className="w-4 h-4 mt-0.5" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-red-600 hover:bg-red-700 rounded-2xl py-3 font-bold transition"
            >
              {authLoading
                ? "Authenticating..."
                : "Login Dashboard"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* =======================================================
      DASHBOARD UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* TOAST */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}

      <aside className="hidden lg:flex w-[290px] bg-[#0d0d0d] border-r border-white/5 p-6 flex-col">
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-3xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-red-500" />
            </div>

            <div>
              <h2 className="font-black text-lg">
                Dereje Printing
              </h2>

              <p className="text-xs text-white/40">
                Premium Admin Panel
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: LayoutDashboard,
              },
              {
                id: "services",
                label: "Services",
                icon: ClipboardList,
              },
              {
                id: "portfolio",
                label: "Portfolio",
                icon: FolderKanban,
              },
              {
                id: "messages",
                label: "Messages",
                icon: Inbox,
              },
              {
                id: "settings",
                label: "Settings",
                icon: Settings,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveTab(item.id as AdminTab)
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                    activeTab === item.id
                      ? "bg-red-600 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* MAIN */}

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black">
              Admin Dashboard
            </h1>

            <p className="text-white/40 mt-2">
              Manage services, portfolio and client
              messages.
            </p>
          </div>

          <button
            onClick={loadDashboardData}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-2xl transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <RefreshCw className="w-10 h-10 animate-spin text-red-500" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 text-red-400">
            {error}
          </div>
        ) : (
          <>
            {/* OVERVIEW */}

            {activeTab === "overview" && stats && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      label: "Services",
                      value: stats.servicesCount,
                      icon: ClipboardList,
                    },
                    {
                      label: "Portfolio",
                      value: stats.portfolioCount,
                      icon: ImageIcon,
                    },
                    {
                      label: "Messages",
                      value: stats.messagesCount,
                      icon: Mail,
                    },
                  ].map((card) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.label}
                        className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="text-white/40 text-sm">
                              {card.label}
                            </p>

                            <h2 className="text-5xl font-black mt-4">
                              {card.value}
                            </h2>
                          </div>

                          <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-red-500" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-5 h-5 text-red-500" />

                      <h2 className="font-black text-xl">
                        Production Growth
                      </h2>
                    </div>

                    <div className="flex items-end gap-4 h-[220px]">
                      {[40, 65, 85, 55, 95, 70].map(
                        (v, i) => (
                          <div
                            key={i}
                            className="flex-1 flex flex-col items-center"
                          >
                            <div
                              style={{
                                height: `${v}%`,
                              }}
                              className="w-full rounded-t-2xl bg-gradient-to-t from-red-700 to-red-400"
                            />

                            <span className="text-xs text-white/40 mt-2">
                              {
                                [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                ][i]
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="w-5 h-5 text-red-500" />

                      <h2 className="font-black text-xl">
                        Quick Status
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {[
                        "Printing system operational",
                        "Portfolio database connected",
                        "Customer messages syncing",
                        "Server security active",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-black/30 border border-white/5 rounded-2xl p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />

                          <span className="text-white/70">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES */}

            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

                    <input
                      type="text"
                      placeholder="Search services..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none"
                    />
                  </div>

                  <button
                    onClick={openCreateService}
                    className="bg-red-600 hover:bg-red-700 rounded-2xl px-5 py-3 font-bold flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>

                <div className="grid xl:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-56 w-full object-cover"
                      />

                      <div className="p-6">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-black text-xl">
                              {service.name}
                            </h3>

                            <p className="text-white/40 mt-2 text-sm">
                              {service.description}
                            </p>
                          </div>

                          <span className="text-red-500 font-black">
                            {service.price}
                          </span>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() =>
                              openEditService(service)
                            }
                            className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteService(service.id)
                            }
                            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl py-3 flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO */}

            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <button
                  onClick={openCreatePortfolio}
                  className="bg-red-600 hover:bg-red-700 rounded-2xl px-5 py-3 font-bold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Portfolio
                </button>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-56 w-full object-cover"
                      />

                      <div className="p-6">
                        <h3 className="font-black text-lg">
                          {item.title}
                        </h3>

                        <p className="text-white/40 text-sm mt-2">
                          {item.description}
                        </p>

                        <div className="flex justify-between items-center mt-5">
                          <span className="text-xs px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-400">
                            {item.category}
                          </span>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                openEditPortfolio(item)
                              }
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() =>
                                deletePortfolio(item.id)
                              }
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES */}

            {activeTab === "messages" && (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div>
                        <h3 className="font-black text-lg">
                          {msg.name}
                        </h3>

                        <p className="text-red-400 mt-2">
                          {msg.email}
                        </p>

                        <p className="text-white/50 mt-2">
                          {msg.phone}
                        </p>

                        <p className="text-white/70 mt-4 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            window.open(
                              `mailto:${msg.email}`,
                              "_blank"
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 rounded-xl px-5 py-3"
                        >
                          Reply
                        </button>

                        <button
                          onClick={() =>
                            deleteMessage(msg.id)
                          }
                          className="bg-red-500/10 text-red-400 rounded-xl px-5 py-3"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SETTINGS */}

            {activeTab === "settings" && (
              <div className="max-w-2xl">
                <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8">
                  <h2 className="text-2xl font-black">
                    System Settings
                  </h2>

                  <div className="mt-8 space-y-6">
                    <div>
                      <p className="text-white/40 text-sm mb-2">
                        Admin Role
                      </p>

                      <div className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4">
                        Super Administrator
                      </div>
                    </div>

                    <div>
                      <p className="text-white/40 text-sm mb-2">
                        Database Status
                      </p>

                      <div className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-emerald-400">
                        Connected Successfully
                      </div>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-bold">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* SERVICE MODAL */}

      <AnimatePresence>
        {serviceModal && editingService && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
              }}
              className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black">
                  {isCreatingService
                    ? "Create Service"
                    : "Edit Service"}
                </h2>

                <button
                  onClick={() =>
                    setServiceModal(false)
                  }
                >
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              <form
                onSubmit={saveService}
                className="space-y-5"
              >
                <input
                  type="text"
                  placeholder="Service Name"
                  value={editingService.name || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4"
                />

                <textarea
                  rows={4}
                  placeholder="Description"
                  value={
                    editingService.description || ""
                  }
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 resize-none"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingService.image || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      image: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4"
                />

                <input
                  type="text"
                  placeholder="Price"
                  value={editingService.price || ""}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      price: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4"
                />

                <button className="w-full bg-red-600 hover:bg-red-700 rounded-2xl py-4 font-bold">
                  Save Service
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}