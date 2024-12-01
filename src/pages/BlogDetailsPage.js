import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, message } from "antd";
import { getBlogDetails } from "../api/services/blogService";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const blogData = await getBlogDetails(id);
        setBlog(blogData);
      } catch (error) {
        message.error("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

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
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <div className="text-gray-200 mb-4">
            <strong>Author:</strong> {blog.author?.firstName || "Anonymous"}
          </div>
          <div className="mb-4">
            <img
              src={blog.imageUrl || "https://via.placeholder.com/300"}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
          <div className="text-gray-700 leading-relaxed">
            {blog.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
