// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(decodedToken); // Set user from token
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
        }
      } catch (error) {
        console.error("[AuthContext] Invalid token:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
      }
    }
    setLoading(false); // Finished checking the token
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decodedToken = jwtDecode(token);
    localStorage.setItem("userRole", decodedToken.role);
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
