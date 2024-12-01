import axiosInstance from "../axiosInstance";

export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data.data;
  } catch (error) {
    console.error("[CartService] Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axiosInstance.post("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("[CartService] Error adding to cart:", error);
    throw error;
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const response = await axiosInstance.patch("/cart", {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("[CartService] Error updating cart quantity:", error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return response.data;
  } catch (error) {
    console.error("[CartService] Error removing from cart:", error);
    throw error;
  }
};
