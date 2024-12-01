import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <HomeOutlined /> },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: <UserOutlined />,
    },
    {
      name: "Manage Products",
      path: "/admin/products",
      icon: <AppstoreOutlined />,
    },
    {
      name: "Manage Categories",
      path: "/admin/categories",
      icon: <TagsOutlined />,
    },
    {
      name: "Manage Blogs",
      path: "/admin/blogs",
      icon: <ReadOutlined />,
    },
    {
      name: "Manage Orders",
      path: "/admin/orders",
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 transform transition-transform duration-300 w-64 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 bg-gray-800 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">LEONMALL</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-6 py-3 transition-colors duration-200 rounded-lg ${
              location.pathname === item.path
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Close Button */}
      <button
        className="block md:hidden bg-red-600 text-white px-4 py-2 rounded mx-6 mt-6"
        onClick={toggleSidebar}
      >
        Close
      </button>
    </aside>
  );
};

export default AdminSidebar;
