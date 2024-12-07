import React from "react";

const Success = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-500 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg">
          Thank you for your order. Your payment has been successfully
          processed.
        </p>
      </div>
    </div>
  );
};

export default Success;
