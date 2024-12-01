import axios from "axios";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Store your API key securely
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// Function to send a prompt to the Gemini API
export const sendPromptToGemini = async (prompt) => {
  if (!prompt.trim()) {
    throw new Error("Prompt cannot be empty.");
  }

  // Predefined context for the AI as a LeonMall e-commerce assistant
  const leonmallPrompt = `
  You are an AI assistant for LeonMall, an e-commerce platform. 
  You are tasked with helping customers find products, assist with orders, answer frequently asked questions, and provide general shopping guidance. 
  You are knowledgeable about LeonMall's product catalog, sales, promotions, and customer service policies. 
  Always respond politely and assist customers in their shopping journey. 
  Your responses should be tailored to help users with online shopping on LeonMall.
  `;

  // Combine the predefined prompt with the user's input
  const fullPrompt = `${leonmallPrompt} ${prompt}`;

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: fullPrompt, // The full prompt including the predefined context
              },
            ],
          },
        ],
      },
      {
        params: { key: GEMINI_API_KEY }, // Use the key securely in query parameters
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
      }
    );

    // Extract and return the generated content from the response
    const resultText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      throw new Error("No valid response returned from the AI.");
    }
    return resultText;
  } catch (error) {
    console.error(
      "Error communicating with Gemini API:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message ||
        "Failed to generate response from Gemini."
    );
  }
};
