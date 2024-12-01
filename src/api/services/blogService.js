import axiosInstance from "../axiosInstance";

export const fetchBlogs = async () => {
  try {
    const response = await axiosInstance.get("/blogs");
    return response.data.data; // Return blogs array
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch blogs");
  }
};

export const createBlog = async (blog) => {
  try {
    const response = await axiosInstance.post("/blogs", blog);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create blog");
  }
};

export const updateBlog = async (id, blog) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${id}`, blog);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update blog");
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete blog");
  }
};

export const getBlogDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data.data; // Return blog details
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blog details"
    );
  }
};
