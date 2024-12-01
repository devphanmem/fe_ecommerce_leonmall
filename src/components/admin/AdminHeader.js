import React, { useContext } from "react";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { AuthContext } from "../../context/AuthContext";

const AdminHeader = ({ toggleSidebar }) => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  // Dropdown menu for user profile
  const userMenu = (
    <Menu>
      <Menu.Item key="1" disabled>
        <span className="font-semibold">{user?.email || "Guest"}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>
        <LogoutOutlined />
        <span className="ml-2">Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Hamburger Menu for Mobile */}
      <button
        className="text-blue-600 md:hidden"
        onClick={toggleSidebar}
        aria-label="Open Sidebar"
      >
        <MenuOutlined style={{ fontSize: "24px" }} />
      </button>

      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-800 hidden md:block">
        Admin Dashboard
      </h1>

      {/* User Profile and Logout */}
      <div className="flex items-center space-x-4">
        <Dropdown
          overlay={userMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-blue-600"
            />
            <span className="hidden md:block font-semibold text-gray-700">
              {user?.email || "Guest"}
            </span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default AdminHeader;
