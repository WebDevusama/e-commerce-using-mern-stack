import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/ProductPage";
// import ProductDetails from "../pages/ProductDetails"; 
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import Emptycart from "../pages/Emptycart";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import Dashboard from "../pages/AdminDashboard";
import Orders from "../pages/Orders";
import ProtectedRoute from "../components/ui/protectedRoute";
import  Sidebar  from "../components/ui/Sidebar";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/emptycart" element={<Emptycart />} />
      <Route path="/checkout/*" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payments" element={<div>Payments Page</div>} />
      <Route path="/search" element={<div>Search Results</div>} />
      <Route path="/Sidebar" element={<div>Sidebar Page</div>} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="/productPage" element={<Navigate to="/products" replace />} />
      <Route path="/Emptycart" element={<Navigate to="/emptycart" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
