import axiosInstance from "../axiosInstance";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data.data; // Return categories array
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/categories", category);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create category"
    );
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axiosInstance.patch(`/categories/${id}`, category);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
