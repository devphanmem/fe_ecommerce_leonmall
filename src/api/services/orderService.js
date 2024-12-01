import axiosInstance from "../axiosInstance";

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/allorder");
    return response.data.data; // Return orders array
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosInstance.patch(`/orders/${id}/status`, status);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update order status"
    );
  }
};

// Place an order from the cart
export const placeOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/orders", orderData);
    return response.data; // Return order confirmation details
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
};

// Fetch all orders (Order history)
export const getOrderHistory = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data.data; // Return order history array
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order history"
    );
  }
};

// Fetch order details by ID
export const getOrderDetails = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data.data; // Return specific order details
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order details"
    );
  }
};
