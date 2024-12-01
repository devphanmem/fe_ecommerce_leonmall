import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, Popconfirm, message, Spin } from "antd";
import { getAllUsers, deleteUserById } from "../../api/services/userService";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingUserId(id);
      await deleteUserById(id);
      message.success("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user.");
    } finally {
      setDeletingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} size="large" />,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      responsive: ["md", "lg"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span
          className={`px-2 py-1 rounded ${
            role === "admin"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {role}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            loading={deletingUserId === record.id}
            disabled={deletingUserId === record.id}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: "1000px" }}
        />
      )}
    </div>
  );
};

export default UsersPage;
