import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  message,
  Spin,
  Collapse,
} from "antd";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../api/services/orderService";

const { Option } = Select;
const { Panel } = Collapse;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      message.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleUpdateStatus = async (id) => {
    if (!status) {
      message.warning("Please select a status.");
      return;
    }

    setLoading(true);
    try {
      await updateOrderStatus(id, { status });
      message.success("Order status updated successfully.");
      setModalVisible(false);
      loadOrders();
    } catch (error) {
      message.error("Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "Delivered"
              ? "bg-green-500 text-white"
              : status === "Pending"
              ? "bg-yellow-500 text-black"
              : "bg-red-500 text-white"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewOrder(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
          scroll={{ x: "1000px" }}
        />
      )}
      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <h3 className="text-lg font-bold">Order ID: {selectedOrder.id}</h3>
            <p>
              <strong>Total:</strong> {selectedOrder.total.toLocaleString()} VND
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
            </p>
            <Collapse>
              <Panel header="Order Items" key="1">
                <Table
                  columns={[
                    {
                      title: "Product Name",
                      dataIndex: ["product", "name"],
                      key: "name",
                    },
                    {
                      title: "Quantity",
                      dataIndex: "quantity",
                      key: "quantity",
                    },
                    {
                      title: "Price",
                      dataIndex: ["product", "price"],
                      key: "price",
                      render: (price) => `${price.toLocaleString()} VND`,
                    },
                  ]}
                  dataSource={selectedOrder.orderItems}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: "100%" }}
                />
              </Panel>
            </Collapse>
            <Form layout="vertical">
              <Form.Item label="Update Status">
                <Select
                  value={status}
                  onChange={setStatus}
                  placeholder="Select a status"
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Shipped">Shipped</Option>
                  <Option value="Delivered">Delivered</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleUpdateStatus(selectedOrder.id)}
                  type="primary"
                >
                  Update Status
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
