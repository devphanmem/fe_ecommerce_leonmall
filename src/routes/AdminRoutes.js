// src/routes/AdminRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      {/* Add more admin-specific routes here */}
    </Route>
  </Routes>
);

export default AdminRoutes;
