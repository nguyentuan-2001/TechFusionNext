"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { TruncateText } from "../atoms/TruncateText";
import { ProductContext } from "../contexts/ProductContext";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export const MiniCart = () => {
  const { isListProduct, setIsListProduct } = useContext(ProductContext);

  const [isCartVisible, setCartVisible] = useState(false);
  const cartRef = useRef(null);

  const handleMiniCartClick = () => {
    setCartVisible(!isCartVisible);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="h-[60px] w-[60px] fixed top-[30%] right-10 z-50 mini_cart"
        onClick={handleMiniCartClick}
        ref={cartRef}
      >
        <div className="icon_cart">
          <FaShoppingBasket className="text-[40px]" />
        </div>
      </div>
      {isCartVisible && (
        <div className="bg-orange fixed top-[30%] right-10 z-[49] cart ">
          {isListProduct.length > 0 ? (
            <>
              {isListProduct.map((item, index) => (
                <div
                  className="flex items-center justify-between my-3"
                  key={index}
                >
                  <div className="w-[15%]">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item.product_image}
                      alt={item.product_name}
                    />
                  </div>
                  <p
                    style={{ wordWrap: "break-word" }}
                    className="text-sm text-white w-[60%]"
                  >
                    {TruncateText(item.product_name, 60)}
                  </p>
                  <p className="text-sm text-white w-[15%] pl-3">
                    x{item.product_quantity}
                  </p>
                </div>
              ))}

              <Link href="/cart">
                <div className="flex justify-end items-center gap-2 pt-3 cursor-pointer">
                  <p className="text-right text-white">Xem giỏ hàng </p>
                  <FaShoppingCart className="text-white" />
                </div>
              </Link>
            </>
          ) : (
            <p className="text-center text-white">Không có sản phẩm nào</p>
          )}
        </div>
      )}
    </>
  );
};
