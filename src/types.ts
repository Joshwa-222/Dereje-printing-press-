export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number | string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  role: string;
}

export interface DashboardStats {
  servicesCount: number;
  portfolioCount: number;
  messagesCount: number;
  recentMessages: ContactMessage[];
}
