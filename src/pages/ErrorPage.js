import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/checkout"); // Điều hướng về trang Checkout hoặc trang trước đó
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-700 text-lg">
          An error occurred while processing your payment. Please try again.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Go Back to Checkout
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
