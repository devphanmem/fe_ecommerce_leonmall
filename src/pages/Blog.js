import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../api/services/blogService";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const blogData = await fetchBlogs();
        setBlogs(blogData);
      } catch (error) {
        message.error("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Latest Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              hoverable
              cover={
                <img
                  src={blog.imageUrl || "https://via.placeholder.com/300"}
                  alt={blog.title}
                  className="h-48 object-cover rounded-t-md"
                />
              }
              className="rounded-md overflow-hidden shadow-lg"
            >
              <Card.Meta
                title={
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-lg font-bold text-blue-600 hover:underline"
                  >
                    {blog.title}
                  </Link>
                }
                description={
                  <span className="text-sm text-gray-600">
                    By {blog.author?.firstName || "Anonymous"}
                  </span>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
