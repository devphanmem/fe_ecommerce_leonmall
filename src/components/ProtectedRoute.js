// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the user from context

  if (!user || user.role !== "admin") {
    // If user is not an admin, redirect them to the home page
    return <Navigate to="/" />;
  }

  return children; // If user is admin, return the protected content (Dashboard)
};

export default ProtectedRoute;
