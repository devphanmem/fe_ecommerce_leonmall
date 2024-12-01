import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "../api/services/productService";
import { addToCart, getCart } from "../api/services/cartService";
import {
  Card,
  Typography,
  Button,
  Tag,
  Spin,
  Divider,
  Rate,
  Row,
  Col,
  message,
  Badge,
} from "antd";
import { useCart } from "../context/CartContext";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  SafetyOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        const selectedProduct = products.find((p) => p.id === id);

        if (!selectedProduct) {
          setProduct(null);
          setRelatedProducts([]);
        } else {
          setProduct(selectedProduct);

          // Filter related products
          const related = products.filter(
            (p) => p.categoryId === selectedProduct.categoryId && p.id !== id
          );

          setRelatedProducts(
            related.length > 0 ? related : products.filter((p) => p.id !== id)
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (product.stock <= 0) {
        message.error("This product is out of stock.");
        return;
      }
      await addToCart(product.id, 1);

      const cartData = await getCart();
      const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalItems);

      message.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add product to cart.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <Text type="danger">Product not found.</Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={product.imageUrl || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Badge.Ribbon
            text={product.stock > 0 ? "In Stock" : "Out of Stock"}
            color={product.stock > 0 ? "green" : "red"}
            className="absolute top-4 left-4"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <Title level={2} className="text-3xl font-bold">
            {product.name}
          </Title>

          <div className="flex items-center space-x-3">
            <Rate allowHalf defaultValue={4.5} />
            <Text className="text-gray-600">(50 reviews)</Text>
          </div>

          <Paragraph className="text-lg text-gray-600">
            {product.description}
          </Paragraph>

          <Divider />

          <div className="flex items-center justify-between">
            <Title level={3} className="text-2xl text-blue-600">
              {product.price.toLocaleString()} VND
            </Title>
            <Text type="success" className="text-lg font-medium">
              {`Stock: ${product.stock}`}
            </Text>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="rounded-md"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              icon={<HeartOutlined />}
              size="large"
              className="rounded-md border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Add to Wishlist
            </Button>
            <Button
              icon={<ShareAltOutlined />}
              size="large"
              className="rounded-md border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
            >
              Share
            </Button>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <SafetyOutlined className="text-green-600 text-xl" />
              <Text className="text-gray-600">Secure Payment</Text>
            </div>
            <div className="flex items-center space-x-2">
              <StarOutlined className="text-yellow-500 text-xl" />
              <Text className="text-gray-600">Top-rated Product</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <Title level={3} className="mb-6">
          Related Products
        </Title>
        <Row gutter={[16, 16]}>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related) => (
              <Col key={related.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="shadow-lg rounded-lg"
                  cover={
                    <img
                      alt={related.name}
                      src={
                        related.imageUrl || "https://via.placeholder.com/300"
                      }
                      className="h-48 object-cover rounded-t-lg"
                    />
                  }
                  onClick={() => navigate(`/product/${related.id}`)}
                >
                  <Title level={5} className="truncate">
                    {related.name}
                  </Title>
                  <Text className="text-blue-600 font-medium">
                    {related.price.toLocaleString()} VND
                  </Text>
                </Card>
              </Col>
            ))
          ) : (
            <Text>No related products found.</Text>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;
