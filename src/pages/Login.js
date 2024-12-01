import React, { useState, useContext } from "react";
import { Button, Form, Input, Typography, message, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginApi } from "../api/services/authService";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await loginApi(email, password);
      const token = response.data.token;
      login(token); // Save token and update user state
      message.success("Login successful!");

      // Redirect based on user role
      const role = localStorage.getItem("userRole");
      if (role === "admin") {
        navigate("/admin"); // Redirect admin to admin dashboard
      } else {
        navigate("/"); // Redirect regular users to home page
      }
    } catch (error) {
      if (error.response?.status === 404) {
        message.info("Account does not exist. Redirecting to register page...");
        navigate("/register"); // Redirect to register page
      } else {
        message.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-96 shadow-lg">
        <Space direction="vertical" className="w-full" align="center">
          <Title level={3}>Login</Title>
          <Form
            name="loginForm"
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Form.Item>
            <div className="text-center">
              <span>
                Don't have an account?{" "}
                <Button
                  type="link"
                  onClick={() => navigate("/register")}
                  className="p-0"
                >
                  Register here
                </Button>
              </span>
            </div>
          </Form.Item>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
