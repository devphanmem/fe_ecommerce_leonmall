import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin, Avatar } from "antd";
import { getUserProfile, updateUserProfile } from "../api/services/userService";
import ImageUpload from "../components/image/ImageUpload";

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileData = await getUserProfile();
        setProfile(profileData);
        setAvatarUrl(profileData.avatar || "");
        form.setFieldsValue({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
        });
      } catch (error) {
        message.error("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const handleImageUpload = (url) => {
    setAvatarUrl(url);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedProfile = { ...values, avatar: avatarUrl };
      await updateUserProfile(updatedProfile);
      message.success("Profile updated successfully.");
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex flex-col items-center space-y-4">
        <Avatar
          size={100}
          src={avatarUrl || "https://via.placeholder.com/100"}
        />
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="max-w-lg mx-auto mt-6"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Please enter a valid email!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
