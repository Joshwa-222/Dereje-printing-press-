import { Service, PortfolioItem, ContactMessage, DashboardStats } from "../types";

// Dynamic API fetch helper wrapping native fetch to handle JWT easily
const BASE_URL = "/api";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("dereje_admin_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Authentication
  async login(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Login initiation failed.");
    }
    return res.json();
  },

  // Services Management
  async getServices(): Promise<Service[]> {
    const res = await fetch(`${BASE_URL}/services`);
    if (!res.ok) throw new Error("Could not retrieve team services.");
    return res.json();
  },

  async getService(id: string): Promise<Service> {
    const res = await fetch(`${BASE_URL}/services/${id}`);
    if (!res.ok) throw new Error("Could not fetch service details.");
    return res.json();
  },

  async createService(data: Partial<Service>): Promise<Service> {
    const res = await fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Create service failed.");
    }
    return res.json();
  },

  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Update service failed.");
    }
    return res.json();
  },

  async deleteService(id: string): Promise<boolean> {
    // Attempt standard DELETE path, fallback to safe GET path
    try {
      const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) return true;
    } catch (e) {
      // Ignored: proceed to fallback
    }

    // Safe fallback GET delete route specifically designed if server behind restrictive proxy
    const resFallback = await fetch(`${BASE_URL}/services-delete/${id}`, {
      headers: getHeaders(),
    });
    if (!resFallback.ok) {
      const err = await resFallback.json();
      throw new Error(err.error || "Deletion failed.");
    }
    return true;
  },

  // Portfolio Management
  async getPortfolio(): Promise<PortfolioItem[]> {
    const res = await fetch(`${BASE_URL}/portfolio`);
    if (!res.ok) throw new Error("Could not load portfolio items.");
    return res.json();
  },

  async createPortfolioItem(data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await fetch(`${BASE_URL}/portfolio`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Create portfolio failed.");
    }
    return res.json();
  },

  async updatePortfolioItem(id: string, data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const res = await fetch(`${BASE_URL}/portfolio/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Update portfolio item failed.");
    }
    return res.json();
  },

  async deletePortfolioItem(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/portfolio/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Delete portfolio item failed.");
    }
    return true;
  },

  // Contact Inquiries
  async sendContactMessage(data: { name: string; email: string; phone?: string; message: string }): Promise<any> {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Communication dispatch failed.");
    }
    return res.json();
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Could not view messaging system logs.");
    return res.json();
  },

  async deleteContactMessage(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/contact/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Could not unlink contact log entry.");
    return true;
  },

  // Admin Quick Stats Log
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${BASE_URL}/stats`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to pull statistics logs.");
    return res.json();
  }
};
