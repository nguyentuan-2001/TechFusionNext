"use client";
import Path, { ListCarts } from "@/utils/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useSearchParams } from "next/navigation";
import React, { ReactNode, createContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const contextValue = {
    isShowLogin,
    setIsShowLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
