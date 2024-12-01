// src/routes/WebRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import WebLayout from "../components/Layout/WebLayout";
import Home from "../pages/Home";

const WebRoutes = () => (
  <Routes>
    <Route path="/" element={<WebLayout />}>
      <Route index element={<Home />} />
      {/* Add more web-specific routes here */}
    </Route>
  </Routes>
);

export default WebRoutes;
