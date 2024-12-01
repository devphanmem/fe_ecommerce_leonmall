import React from "react";
import { LogoutOutlined } from "@ant-design/icons";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-blue-600">Admin Dashboard</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2">
        <LogoutOutlined />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default AdminHeader;
