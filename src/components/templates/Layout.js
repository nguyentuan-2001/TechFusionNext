"use client";
import { usePathname } from "next/navigation";
import { ProductProvider } from "../contexts/ProductContext";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  const pathname = usePathname();

  const whiteList = ["/signin"];
  return (
    <>
      <ProductProvider>
        {!whiteList.includes(pathname) ? (
          <>
            <Header />
            {children}
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
      </ProductProvider>
    </>
  );
};
