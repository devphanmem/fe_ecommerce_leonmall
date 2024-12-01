import React, { useEffect, useState } from "react";
import { Table, Spin, message, Tag } from "antd";
import { getOrderHistory } from "../api/services/orderService";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderData = await getOrderHistory();
        setOrders(orderData);
      } catch (error) {
        message.error("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <a
          onClick={() => navigate(`/order/${id}`)}
          className="text-blue-600 hover:underline"
        >
          {id}
        </a>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <span className="font-medium">{`${total.toLocaleString()} VND`}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Completed") color = "green";
        if (status === "Pending") color = "orange";
        if (status === "Cancelled") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-600">{new Date(date).toLocaleString()}</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Order History
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            className="overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
