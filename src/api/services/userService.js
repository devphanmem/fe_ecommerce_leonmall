import axiosInstance from "../axiosInstance";

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data.data; // Return user data
  } catch (error) {
    console.error("[UserService] Error fetching users:", error);
    throw error.response?.data?.message || "Unable to fetch users";
  }
};

// Delete user by ID
export const deleteUserById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("[UserService] Error deleting user:", error);
    throw error.response?.data?.message || "Unable to delete user";
  }
};
// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response.data.data; // Return profile data
  } catch (error) {
    console.error("[UserService] Error fetching user profile:", error);
    throw error.response?.data?.message || "Unable to fetch user profile";
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await axiosInstance.patch("/auth/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("[UserService] Error updating user profile:", error);
    throw error.response?.data?.message || "Unable to update user profile";
  }
};
