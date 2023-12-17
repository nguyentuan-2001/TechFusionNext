"use client";
import Path from "@/utils/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useSearchParams } from "next/navigation";
import React, { ReactNode, createContext, useEffect, useState } from "react";

const ProductContext = createContext(undefined);

const ProductProvider = ({ children }) => {
  const [isListProduct, setIsListProduct] = useState([]);
  const searchParams = useSearchParams();

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }

  useEffect(() => {
    const fetchCart = async () => {
      await axios
        .get(Path.API + `/cart/${IdCustomer}`)
        .then((response) => {
          setIsListProduct(response.data.data);
        })
        .catch((error) => {
          console.error("Error load cart :", error);
        });
    };
    if (IdCustomer) {
      fetchCart();
    }
  }, [IdCustomer, searchParams]);

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
