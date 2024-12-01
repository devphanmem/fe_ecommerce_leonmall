import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <Title level={2} className="text-blue-600 mb-6">
          About LeonMall
        </Title>

        <Paragraph className="text-gray-700 mb-6">
          Welcome to LeonMall, your ultimate online shopping destination where
          convenience meets variety! Whether you're looking for the latest
          fashion trends, state-of-the-art electronics, or home essentials,
          LeonMall has everything you need—all in one place.
        </Paragraph>

        <Paragraph className="text-gray-700 mb-6">
          At LeonMall, we’re committed to offering an exceptional shopping
          experience. We’ve partnered with trusted brands and vendors to bring
          you the highest quality products at competitive prices. Our platform
          is designed to make your online shopping experience as seamless and
          enjoyable as possible, with easy navigation, secure payment options,
          and fast shipping.
        </Paragraph>

        <Paragraph className="text-gray-700 mb-6">
          What sets LeonMall apart is our focus on **customer satisfaction**.
          From the moment you land on our site, we strive to provide a
          user-friendly experience that’s both efficient and enjoyable. Our
          customer service team is always ready to assist you, and we
          continuously improve our platform based on your feedback.
        </Paragraph>

        <Paragraph className="text-gray-700 mb-6">
          But it’s not just about shopping. It’s about building a community.
          Join the LeonMall family today, where you’ll get access to exclusive
          deals, personalized recommendations, and a shopping experience
          tailored to your needs.
        </Paragraph>

        <Paragraph className="text-gray-700 mb-6">
          With **LeonMall**, you can trust that you’re getting the best value,
          quality, and service all in one place. We’re more than just an
          e-commerce platform—we’re your partner in discovering the products you
          love.
        </Paragraph>

        <Paragraph className="text-gray-600 mt-6">
          Thank you for choosing LeonMall. Let’s make shopping simple, secure,
          and fun together!
        </Paragraph>
      </div>
    </div>
  );
};

export default About;
