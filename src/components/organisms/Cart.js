"use client";
import { useEffect, useRef, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { TruncateText } from "../atoms/TruncateText";

export const Cart = () => {
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
        <div className="bg-[#333] fixed top-[30%] right-10 z-[49] cart ">
          <div className="flex items-center">
            <div className="w-[15%]">
              <img
                className="w-10 h-10 rounded-full"
                src="https://vietnam.atalink.com/blog/wp-content/uploads/2022/03/Thumb_171_DS_Dong_May_PC_Tot.png"
              />
            </div>
            <p
              style={{ wordWrap: "break-word" }}
              className="text-sm text-white w-[60%]"
            >
              {TruncateText(
                "[New Outlet] Laptop Dell Inspiron 16 Plus 7620 - Intel Core i712700H | RAM 40GB | SSD 1TB | 16 inch QHD+ (3K)",
                60
              )}
            </p>
            <p className="text-sm text-red w-[15%] pl-3">18.590.000Đ</p>
          </div>
        </div>
      )}
    </>
  );
};
