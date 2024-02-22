"use client";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import "../../styles/globals.css";
import { Navbar } from "./Navbar";

export const LayoutAdmin = ({ children }) => {
  const pathname = usePathname();

  const whiteList = ["/signin"];
  return (
    <>
      <AuthProvider>
          <ToastContainer />
          {!whiteList.includes(pathname) ? (
            <>
              <Navbar />
              {children}
            </>
          ) : (
            <>{children}</>
          )}
      </AuthProvider>
    </>
  );
};
