"use client";
import React, { ReactNode, createContext, useState } from "react";

const ProductContext = createContext(undefined);

const ProductProvider = ({ children }) => {
  const [isListProduct, setIsListProduct] = useState([]);

  const contextValue = {
    isListProduct,
    setIsListProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
