import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../api/services/orderService";
import { Spin, Table, message, Tag } from "antd";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const orderData = await getOrderDetails(id);
        setOrder(orderData);
      } catch (error) {
        message.error("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <div className="flex items-center space-x-4">
          <img
            src={product.imageUrl || "https://via.placeholder.com/50"}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-md shadow"
          />
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "price",
      render: (product) => (
        <span className="font-semibold text-gray-700">
          {product.price.toLocaleString()} VND
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <span className="font-medium text-gray-700">{quantity}</span>
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_, record) => (
        <span className="font-semibold text-gray-700">
          {(record.quantity * record.product.price).toLocaleString()} VND
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Order Details
          </h1>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Order ID:</span> {order.id}
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Buyer Name:</span>{" "}
                  {order.name || "N/A"}
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Phone Number:</span>{" "}
                  {order.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Shipping Address:</span>{" "}
                  {order.shippingAddress}
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Status:</span>{" "}
                  <Tag
                    color={
                      order.status === "Completed"
                        ? "green"
                        : order.status === "Pending"
                        ? "orange"
                        : "red"
                    }
                  >
                    {order.status}
                  </Tag>
                </p>
                <p className="text-gray-700 font-semibold">
                  <span className="text-gray-900">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
          </div>
          <Table
            dataSource={order.orderItems}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
            className="rounded-lg"
          />
          <div className="flex justify-end mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-blue-600">
                {order.total.toLocaleString()} VND
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
