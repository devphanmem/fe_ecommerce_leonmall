import React, { useEffect, useState } from "react";
import { Table, Button, InputNumber, message, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../api/services/cartService";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const cartData = await getCart();
        setCart(cartData);
        updateCartCount(cartData.length);
      } catch (error) {
        message.error("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [updateCartCount]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) {
      message.error("Quantity must be at least 1.");
      return;
    }

    try {
      await updateCartQuantity(productId, quantity);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
      message.success("Quantity updated successfully.");
    } catch (error) {
      message.error("Failed to update quantity.");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(
          (item) => item.product.id !== productId
        );
        updateCartCount(updatedCart.length);
        return updatedCart;
      });
      message.success("Item removed from cart.");
    } catch (error) {
      message.error("Failed to remove item.");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

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
            className="w-12 h-12 object-cover rounded-md"
          />
          <span className="font-medium text-sm sm:text-base">
            {product.name}
          </span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "product",
      key: "price",
      render: (product) => (
        <span className="font-medium">{`${product.price.toLocaleString()} VND`}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.product.id, value)}
          className="w-16 sm:w-24"
        />
      ),
    },
    {
      title: "Subtotal",
      key: "subtotal",
      render: (_, record) => (
        <span className="font-medium">
          {`${(record.quantity * record.product.price).toLocaleString()} VND`}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.product.id)}
          className="flex items-center justify-center"
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Shopping Cart</h1>
      <Table
        dataSource={cart}
        columns={columns}
        rowKey={(record) => record.product.id}
        pagination={false}
        className="rounded-lg overflow-hidden"
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">
          Total: {total.toLocaleString()} VND
        </h2>
        <Button
          type="primary"
          size="large"
          className="w-full sm:w-auto"
          onClick={() => navigate("/checkout", { state: { total } })}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
