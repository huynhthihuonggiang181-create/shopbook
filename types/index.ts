// =============================================================
// ShopBook - TypeScript Type Definitions
// =============================================================

// ---- Enums ----
export type Role = "USER" | "ADMIN";
export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

// ---- User ----
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
  phone?: string | null;
  address?: string | null;
  createdAt: string;
}

// ---- Category ----
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  _count?: { books: number };
}

// ---- Book ----
export interface Book {
  id: string;
  title: string;
  slug: string;
  author: string;
  description?: string | null;
  price: number;
  salePrice?: number | null;
  isbn?: string | null;
  publisher?: string | null;
  publishedAt?: string | null;
  pages?: number | null;
  language: string;
  stock: number;
  sold: number;
  rating: number;
  ratingCount: number;
  featured: boolean;
  image?: string | null;
  images?: string[] | null;
  categoryId: string;
  category?: Category;
  reviews?: Review[];
}

// ---- Cart ----
export interface CartItem {
  id: string;
  bookId: string;
  book: Book;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  itemCount: () => number;
}

// ---- Order ----
export interface OrderItem {
  id: string;
  bookId: string;
  book: Book;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingName?: string | null;
  shippingPhone?: string | null;
  shippingAddress?: string | null;
  note?: string | null;
  items: OrderItem[];
  payment?: Payment;
  createdAt: string;
}

// ---- Review ----
export interface Review {
  id: string;
  userId: string;
  user?: User;
  bookId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

// ---- Payment ----
export interface Payment {
  id: string;
  orderId: string;
  stripePaymentId?: string | null;
  method: string;
  amount: number;
  status: string;
}

// ---- API Response ----
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ---- Search/Filter ----
export interface BookFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "popular" | "rating";
  page?: number;
  limit?: number;
}

// ---- Checkout Form ----
export interface CheckoutFormData {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: "stripe" | "cod";
}

// ---- Dashboard Stats ----
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalBooks: number;
  totalUsers: number;
  recentOrders: Order[];
  monthlySales: { month: string; revenue: number; orders: number }[];
}
