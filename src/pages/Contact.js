import React from "react";
import { Typography, Card, Form, Input, Button } from "antd";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const handleSubmit = (values) => {
    console.log("Submitted Values:", values);
    alert("Thank you for reaching out! We’ll get back to you soon.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Card
          className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto"
          style={{
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <Title level={2} className="text-center text-blue-600 mb-6">
            Contact Us
          </Title>
          <Paragraph className="text-center text-gray-700 mb-6">
            Have any questions or feedback? Fill out the form below, and we’ll
            get in touch with you as soon as possible!
          </Paragraph>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
            <Form.Item
              name="name"
              label="Your Name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Your Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Your Message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter your message" />
            </Form.Item>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full sm:w-auto"
              >
                Submit
              </Button>
            </div>
          </Form>

          <div className="text-center mt-8 text-gray-600">
            <p>If you prefer, you can also reach us directly:</p>
            <p>
              <strong>Email:</strong> leonmall@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
