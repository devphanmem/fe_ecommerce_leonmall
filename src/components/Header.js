import React, { useContext, useState, useEffect } from "react";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  HistoryOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Badge, Dropdown, Menu, Avatar, message } from "antd";
import { AuthContext } from "../context/AuthContext";
import { getCart } from "../api/services/cartService";
import { useCart } from "../context/CartContext";
import { getUserProfile } from "../api/services/userService";

const HeaderComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount, updateCartCount } = useCart();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const fetchCartCount = async () => {
    try {
      const cartData = await getCart();
      const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      message.error("Failed to fetch cart details.");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartCount();
      fetchUserProfile();
    }
  }, [user]);

  const userMenu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<ProfileOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<HistoryOutlined />}
        onClick={() => navigate("/orders")}
      >
        Order History
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div
            className="text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            LeonMall
          </div>

          {/* Centered Menu */}
          <nav className="hidden md:flex flex-grow justify-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-500 font-medium transition"
            >
              About
            </Link>
            <Link
              to="/blogs"
              className="text-gray-600 hover:text-blue-500 font-medium transition"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-500 font-medium transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right-Side Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon with Badge */}
            <div
              className="cursor-pointer relative"
              onClick={() => navigate("/cart")}
            >
              <Badge count={cartCount} size="small" offset={[10, -10]}>
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", color: "#1E3A8A" }}
                />
              </Badge>
            </div>

            {/* User Dropdown */}
            {user ? (
              <Dropdown
                overlay={userMenu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <div className="flex items-center cursor-pointer">
                  <Avatar
                    size="large"
                    src={userProfile?.avatar || undefined}
                    icon={!userProfile?.avatar && <UserOutlined />}
                    className="bg-blue-600"
                  />
                </div>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-1 px-4 rounded transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button className="md:hidden text-blue-600" onClick={toggleDrawer}>
            <MenuOutlined style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-500 font-medium transition"
            onClick={toggleDrawer}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-blue-500 font-medium transition"
            onClick={toggleDrawer}
          >
            About
          </Link>
          <Link
            to="/blogs"
            className="text-gray-600 hover:text-blue-500 font-medium transition"
            onClick={toggleDrawer}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-500 font-medium transition"
            onClick={toggleDrawer}
          >
            Contact
          </Link>
          <div className="cursor-pointer relative">
            <Badge count={cartCount} size="small" offset={[10, -10]}>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", color: "#1E3A8A" }}
                onClick={() => {
                  navigate("/cart");
                  toggleDrawer();
                }}
              />
            </Badge>
          </div>

          {/* User Dropdown for Mobile */}
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  toggleDrawer();
                }}
                className="text-left text-gray-600 hover:text-blue-500 font-medium transition"
              >
                <ProfileOutlined className="mr-2" />
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/orders");
                  toggleDrawer();
                }}
                className="text-left text-gray-600 hover:text-blue-500 font-medium transition"
              >
                <HistoryOutlined className="mr-2" />
                Order History
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  toggleDrawer();
                }}
                className="text-left text-red-500 hover:text-red-600 font-medium transition"
              >
                <LogoutOutlined className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-1 px-4 rounded transition"
              onClick={toggleDrawer}
            >
              Login
            </Link>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default HeaderComponent;
