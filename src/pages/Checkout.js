// import React, { useState } from "react";
// import { Form, Input, Button, message } from "antd";
// import { useLocation, useNavigate } from "react-router-dom";
// import { placeOrder } from "../api/services/orderService";
// import { useCart } from "../context/CartContext";

// const CheckoutPage = () => {
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const totalAmount = location.state?.total || 0;
//   const { resetCart } = useCart();

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       await placeOrder(values);
//       message.success("Order placed successfully!");
//       resetCart();
//       navigate("/orders");
//     } catch (error) {
//       message.error("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-lg">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
//           Checkout
//         </h1>
//         <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
//           <Form.Item
//             name="name"
//             label={<span className="font-medium text-gray-700">Full Name</span>}
//             rules={[{ required: true, message: "Please enter your name" }]}
//           >
//             <Input placeholder="Enter your full name" className="rounded-md" />
//           </Form.Item>
//           <Form.Item
//             name="phone"
//             label={
//               <span className="font-medium text-gray-700">Phone Number</span>
//             }
//             rules={[
//               { required: true, message: "Please enter your phone number" },
//             ]}
//           >
//             <Input
//               placeholder="Enter your phone number"
//               className="rounded-md"
//             />
//           </Form.Item>
//           <Form.Item
//             name="shippingAddress"
//             label={
//               <span className="font-medium text-gray-700">
//                 Shipping Address
//               </span>
//             }
//             rules={[
//               { required: true, message: "Please enter your shipping address" },
//             ]}
//           >
//             <Input
//               placeholder="Enter your shipping address"
//               className="rounded-md"
//             />
//           </Form.Item>
//           <div className="flex justify-between items-center mt-6">
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//               Total: {totalAmount.toLocaleString()} VND
//             </h2>
//           </div>
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             className="w-full mt-4 rounded-md"
//           >
//             Place Order
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder } from "../api/services/orderService";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.total || 0;
  const { resetCart } = useCart();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Chuẩn bị dữ liệu đơn hàng
      const orderData = {
        ...values,
        totalAmount: totalAmount,
        orderId: `order_${Date.now()}`, // Tạo mã đơn hàng duy nhất
      };

      // Gọi API tạo thanh toán
      const paymentResponse = await placeOrder(orderData);

      // Nếu API trả về URL thanh toán, chuyển hướng tới đó
      if (paymentResponse.payUrl) {
        window.location.href = paymentResponse.payUrl;
      } else {
        message.error("Failed to initiate payment");
        navigate("/error"); // Điều hướng đến trang lỗi nếu có lỗi
      }
    } catch (error) {
      message.error(
        error.message || "Failed to place order. Please try again."
      );
      navigate("/error"); // Điều hướng đến trang lỗi nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h1>
        <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
          <Form.Item
            name="name"
            label={<span className="font-medium text-gray-700">Full Name</span>}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" className="rounded-md" />
          </Form.Item>
          <Form.Item
            name="phone"
            label={
              <span className="font-medium text-gray-700">Phone Number</span>
            }
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input
              placeholder="Enter your phone number"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="shippingAddress"
            label={
              <span className="font-medium text-gray-700">
                Shipping Address
              </span>
            }
            rules={[
              { required: true, message: "Please enter your shipping address" },
            ]}
          >
            <Input
              placeholder="Enter your shipping address"
              className="rounded-md"
            />
          </Form.Item>
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Total: {totalAmount.toLocaleString()} VND
            </h2>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full mt-4 rounded-md"
          >
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
