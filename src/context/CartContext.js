import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  const resetCart = () => {
    setCartCount(0); // Reset số lượng sản phẩm về 0
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
