// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/admin/Dashboard";

import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderHistoryPage from "./pages/OrderHistory";
import OrderDetailsPage from "./pages/OrderDetails";
import ProfilePage from "./pages/Profile";
import BlogListPage from "./pages/Blog";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import Chatbot from "./pages/Chatbot";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/orders" element={<OrderHistoryPage />} />
                      <Route path="/order/:id" element={<OrderDetailsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/blogs" element={<BlogListPage />} />
                      <Route path="/blogs/:id" element={<BlogDetailsPage />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                    </Routes>
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
