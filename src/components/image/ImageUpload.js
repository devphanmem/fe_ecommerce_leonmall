import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImageUpload = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      message.success("Image uploaded successfully");
      if (onImageUpload) {
        onImageUpload(imageUrl); // Pass the URL back to the parent
      }
    } catch (error) {
      message.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Upload
      customRequest={handleUpload}
      showUploadList={false}
      accept="image/*"
    >
      <Button icon={<UploadOutlined />} loading={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </Button>
    </Upload>
  );
};

export default ImageUpload;
