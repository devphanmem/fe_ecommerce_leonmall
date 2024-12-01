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
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/services/categoryService";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      message.error(error.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditCategory = (record) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      message.success("Category deleted successfully");
      loadCategories();
    } catch (error) {
      message.error(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        message.success("Category updated successfully");
      } else {
        await createCategory(values);
        message.success("Category created successfully");
      }
      setModalVisible(false);
      loadCategories();
    } catch (error) {
      message.error(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button type="link" onClick={() => handleEditCategory(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record.id)}
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
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <Button type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter the category name" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              onClick={() => setModalVisible(false)}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
