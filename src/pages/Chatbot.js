import React, { useState } from "react";
import { Modal, Input, Button, message, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import typingAnimation from "../components/animations/typing.json";
import chatbotAnimation from "../components/animations/chatbot.json";
import { sendPromptToGemini } from "../api/services/chatService";

const Chatbot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setPrompt("");
    setMessages([]);
    setIsModalOpen(false);
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      message.warning("Please enter a prompt.");
      return;
    }

    setMessages([
      ...messages,
      { text: prompt, sender: "user", timestamp: new Date() },
    ]);
    setLoading(true);

    try {
      const apiResponse = await sendPromptToGemini(prompt);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: apiResponse, sender: "ai", timestamp: new Date() },
      ]);
      setLoading(false);
      setPrompt(""); // Clear the prompt input
    } catch (error) {
      message.error(error.message || "Failed to get a response.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Lottie Animation as Floating Button */}
      <div
        onClick={handleOpenModal}
        className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition-transform duration-300"
      >
        <Lottie
          animationData={chatbotAnimation}
          style={{ width: 80, height: 80 }}
        />
      </div>

      {/* Chatbot Modal */}
      <Modal
        title="AI Chat Assistant"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        className="rounded-lg"
      >
        <div className="flex flex-col gap-4 h-[400px] overflow-y-auto">
          {/* Displaying Messages */}
          <div className="flex flex-col gap-3 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } items-start gap-3`}
              >
                {/* User's avatar */}
                {message.sender === "user" && (
                  <Avatar icon={<UserOutlined />} />
                )}

                {/* AI's avatar */}
                {message.sender === "ai" && (
                  <div className="w-10 h-10">
                    <Lottie
                      animationData={chatbotAnimation}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[300px] p-4 rounded-lg shadow-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}

                  {/* Timestamp */}
                  <div className="text-xs text-gray-500 mt-2 text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* User input */}
          <Input.TextArea
            rows={4}
            placeholder="How can I assist you today?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-md"
          />
          <Button
            type="primary"
            loading={loading}
            onClick={handleSendPrompt}
            className="w-full mt-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:opacity-90"
            icon={<SendOutlined />}
          >
            Send
          </Button>

          {loading && (
            <div className="mt-4 flex items-center justify-center">
              <Lottie
                animationData={typingAnimation}
                style={{ width: 60, height: 60 }}
              />
              <span className="ml-3 text-gray-600">AI is typing...</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;
