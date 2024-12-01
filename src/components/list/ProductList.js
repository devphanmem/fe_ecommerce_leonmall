import React from "react";
import { Card } from "antd";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          hoverable
          cover={
            <img
              alt={product.name}
              src={product.imageUrl}
              className="h-48 object-cover w-full"
            />
          }
        >
          <Card.Meta
            title={product.name}
            description={`${product.price.toLocaleString()} VND`}
          />
          <p className="mt-2 text-gray-600">{product.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
