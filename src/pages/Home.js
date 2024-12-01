import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/services/productService";
import { getCategories } from "../api/services/categoryService";
import { addToCart, getCart } from "../api/services/cartService";
import { Carousel, Card, Button, Badge, Typography, message } from "antd";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";

const { Title, Paragraph } = Typography;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { updateCartCount } = useCart(); // Access updateCartCount from CartContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setFilteredProducts(
        products.filter((product) => product.categoryId === categoryId)
      );
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product) => {
    try {
      if (product.stock <= 0) {
        message.error("This product is out of stock.");
        return;
      }

      // Add to cart logic
      await addToCart(product.id, 1);

      // Update cart count
      const cartData = await getCart();
      const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalItems);

      message.success(`${product.name} added to cart successfully!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Slider */}
      <Carousel autoplay>
        <div className="relative h-96">
          <img
            src="https://img.freepik.com/free-vector/flat-horizontal-banner-template-black-friday-sale_23-2150852978.jpg?semt=ais_hybrid"
            alt="Banner 1"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="relative h-96">
          <img
            src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
            alt="Banner 2"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      </Carousel>

      {/* Category Filter */}
      <div className="mb-8 text-center mt-8">
        <Title level={2}>Shop by Category</Title>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button
            onClick={() => handleCategorySelect(null)}
            className={`${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:shadow-lg`}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:shadow-lg`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div>
        <Title level={2} className="text-center mb-6">
          {selectedCategory
            ? categories.find((cat) => cat.id === selectedCategory)?.name
            : "All Products"}
        </Title>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              hoverable
              className="shadow-lg rounded-lg"
              cover={
                <img
                  alt={product.name}
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              }
              actions={[
                <Button
                  icon={<InfoCircleOutlined />}
                  onClick={() => handleViewDetails(product.id)}
                >
                  View Details
                </Button>,
                <Button
                  icon={<ShoppingCartOutlined />}
                  type="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>,
              ]}
            >
              <div className="flex flex-col">
                <Title level={4} className="text-blue-600 truncate">
                  {product.name}
                </Title>
                <Paragraph
                  ellipsis={{ rows: 2 }}
                  className="text-gray-500 text-sm"
                >
                  {product.description}
                </Paragraph>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-blue-500">
                    {product.price.toLocaleString()} VND
                  </span>
                  {product.stock > 0 ? (
                    <Badge
                      count="In Stock"
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  ) : (
                    <Badge
                      count="Out of Stock"
                      style={{ backgroundColor: "#f5222d" }}
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
