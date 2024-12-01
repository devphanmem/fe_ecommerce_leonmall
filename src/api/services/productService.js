import axiosInstance from "../axiosInstance";
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data.data;
  } catch (error) {
    console.error("[ProductService] Error fetching products:", error);
    throw error;
  }
};
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data.data; // Return products array
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create product"
    );
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.patch(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update product"
    );
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};

export const getProductDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
};

export const getRelatedProducts = async (categoryId, excludeProductId) => {
  try {
    const response = await axiosInstance.get(
      `/products/related?categoryId=${categoryId}&excludeId=${excludeProductId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch related products"
    );
  }
};
