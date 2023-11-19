import { ProductProvider } from "../contexts/ProductContext";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <ProductProvider>
        <Header />
        {children}
        <Footer />
      </ProductProvider>
    </>
  );
};
