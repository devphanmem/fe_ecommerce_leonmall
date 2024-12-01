import React from "react";

const AdminContent = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to the Admin Dashboard
      </h2>
      <p className="text-gray-600">
        Use the sidebar to navigate through admin features. Manage products,
        categories, and orders easily from here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
          <h3 className="font-semibold text-blue-600">Total Products</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
          <h3 className="font-semibold text-green-600">Total Categories</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
          <h3 className="font-semibold text-yellow-600">Total Orders</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
