// src/pages/Register.jsx
import React, { useState } from "react";
import { Button, Form, Input, Typography, message, Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../api/services/authService";

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await register(email, password);
      message.success(response.message || "Registration successful!");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-96 shadow-lg">
        <Space direction="vertical" className="w-full" align="center">
          <Title level={3}>Register</Title>
          <Form
            name="registerForm"
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
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <span>
                Already have an account?{" "}
                <a onClick={() => navigate("/login")}>Login here</a>
              </span>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Register;
