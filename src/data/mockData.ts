export const revenueData = [
  { month: "Jan", revenue: 18500, orders: 124 },
  { month: "Feb", revenue: 22300, orders: 156 },
  { month: "Mar", revenue: 19800, orders: 142 },
  { month: "Apr", revenue: 27600, orders: 198 },
  { month: "May", revenue: 32100, orders: 231 },
  { month: "Jun", revenue: 29400, orders: 215 },
  { month: "Jul", revenue: 35800, orders: 267 },
  { month: "Aug", revenue: 31200, orders: 243 },
  { month: "Sep", revenue: 38900, orders: 298 },
  { month: "Oct", revenue: 42100, orders: 321 },
  { month: "Nov", revenue: 45600, orders: 356 },
  { month: "Dec", revenue: 51200, orders: 402 },
];

export const categoryData = [
  { name: "Electronics", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "Clothing", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Home", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Sports", value: 12, fill: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, fill: "hsl(var(--chart-5))" },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
};

export const products: Product[] = [
  { id: "PRD-001", name: "Wireless Headphones Pro", category: "Electronics", price: 299.99, stock: 145, status: "active", image: "🎧" },
  { id: "PRD-002", name: "Smart Watch Ultra", category: "Electronics", price: 449.99, stock: 89, status: "active", image: "⌚" },
  { id: "PRD-003", name: "Running Shoes Elite", category: "Sports", price: 189.99, stock: 234, status: "active", image: "👟" },
  { id: "PRD-004", name: "Organic Cotton Tee", category: "Clothing", price: 39.99, stock: 567, status: "active", image: "👕" },
  { id: "PRD-005", name: "Minimalist Desk Lamp", category: "Home", price: 79.99, stock: 0, status: "archived", image: "💡" },
  { id: "PRD-006", name: "Bluetooth Speaker Mini", category: "Electronics", price: 129.99, stock: 312, status: "active", image: "🔊" },
  { id: "PRD-007", name: "Yoga Mat Premium", category: "Sports", price: 59.99, stock: 178, status: "active", image: "🧘" },
  { id: "PRD-008", name: "Leather Wallet Classic", category: "Clothing", price: 89.99, stock: 23, status: "draft", image: "👜" },
];

export type Order = {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  items: number;
};

export const orders: Order[] = [
  { id: "ORD-7821", customer: "Sarah Johnson", email: "sarah@example.com", total: 549.98, status: "delivered", date: "2024-12-15", items: 2 },
  { id: "ORD-7822", customer: "Mike Chen", email: "mike@example.com", total: 299.99, status: "shipped", date: "2024-12-16", items: 1 },
  { id: "ORD-7823", customer: "Emma Wilson", email: "emma@example.com", total: 189.99, status: "processing", date: "2024-12-17", items: 1 },
  { id: "ORD-7824", customer: "James Brown", email: "james@example.com", total: 819.97, status: "pending", date: "2024-12-18", items: 3 },
  { id: "ORD-7825", customer: "Lisa Davis", email: "lisa@example.com", total: 129.99, status: "cancelled", date: "2024-12-18", items: 1 },
  { id: "ORD-7826", customer: "Alex Turner", email: "alex@example.com", total: 359.98, status: "shipped", date: "2024-12-19", items: 2 },
  { id: "ORD-7827", customer: "Priya Patel", email: "priya@example.com", total: 449.99, status: "processing", date: "2024-12-19", items: 1 },
  { id: "ORD-7828", customer: "Tom Garcia", email: "tom@example.com", total: 99.98, status: "delivered", date: "2024-12-20", items: 2 },
];

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "editor" | "viewer";
  status: "active" | "inactive";
  joined: string;
  avatar: string;
};

export const users: User[] = [
  { id: "USR-001", name: "Sarah Johnson", email: "sarah@example.com", role: "admin", status: "active", joined: "2024-01-15", avatar: "SJ" },
  { id: "USR-002", name: "Mike Chen", email: "mike@example.com", role: "manager", status: "active", joined: "2024-03-22", avatar: "MC" },
  { id: "USR-003", name: "Emma Wilson", email: "emma@example.com", role: "editor", status: "active", joined: "2024-05-10", avatar: "EW" },
  { id: "USR-004", name: "James Brown", email: "james@example.com", role: "viewer", status: "inactive", joined: "2024-06-01", avatar: "JB" },
  { id: "USR-005", name: "Lisa Davis", email: "lisa@example.com", role: "editor", status: "active", joined: "2024-07-18", avatar: "LD" },
  { id: "USR-006", name: "Alex Turner", email: "alex@example.com", role: "manager", status: "active", joined: "2024-08-05", avatar: "AT" },
];
