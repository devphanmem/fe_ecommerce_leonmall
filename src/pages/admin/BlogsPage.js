import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Spin,
} from "antd";
import ImageUpload from "../../components/image/ImageUpload";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../api/services/blogService";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      message.error(error.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditBlog = (record) => {
    setEditingBlog(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDeleteBlog = async (id) => {
    setLoading(true);
    try {
      await deleteBlog(id);
      message.success("Blog deleted successfully");
      loadBlogs();
    } catch (error) {
      message.error(error.message || "Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, values);
        message.success("Blog updated successfully");
      } else {
        await createBlog(values);
        message.success("Blog created successfully");
      }
      setModalVisible(false);
      loadBlogs();
    } catch (error) {
      message.error(error.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (imageUrl) => {
    form.setFieldValue("imageUrl", imageUrl);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Blog"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <span>
          {content.length > 50 ? content.slice(0, 50) + "..." : content}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleEditBlog(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this blog?"
            onConfirm={() => handleDeleteBlog(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Button type="primary" onClick={handleAddBlog}>
          Add Blog
        </Button>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
      <Modal
        title={editingBlog ? "Edit Blog" : "Add Blog"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Blog Title"
            rules={[{ required: true, message: "Please enter the blog title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              { required: true, message: "Please enter the blog content" },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image">
            <ImageUpload onImageUpload={handleImageUpload} />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              onClick={() => setModalVisible(false)}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingBlog ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogsPage;
