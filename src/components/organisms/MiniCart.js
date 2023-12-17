"use client";
import { useContext, useEffect, useRef, useState, Fragment } from "react";
import { TruncateText } from "../atoms/TruncateText";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Path from "@/utils/auth";
import Cookies from "js-cookie";

export const MiniCart = ({ content }) => {
  const [isListProduct, setIsListProduct] = useState([]);

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
  }, [IdCustomer]);

  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-none px-3 text-sm font-semibold shadow-sm text-white ring-inset ring-gray-300 hover:bg-gray-50">
          {content}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-96 translate-x-10 translate-y-6">
          <div
            className="absolute h-0 w-0 border-solid right-11"
            style={{
              transform: "translateY(-12px)",
              borderWidth: "0 15px 15px 15px",
              borderColor: "transparent transparent #fff transparent",
            }}
          ></div>

          <div>
            {isListProduct?.map((item, index) => (
              <Menu.Item key={index}>
                <>
                  <div
                    className="flex items-center justify-between py-3 hover:bg-gray_light hover:rounded-md p-5 cursor-pointer"
                    key={index}
                  >
                    <div className="w-[15%]">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.product_detail.product_image}
                        alt={item.product_detail.product_name}
                      />
                    </div>
                    <p
                      style={{ wordWrap: "break-word" }}
                      className="text-sm text-black w-[60%]"
                    >
                      {TruncateText(item.product_detail.product_name, 60)}
                    </p>
                    <p className="text-sm text-black w-[15%] pl-3">
                      x{item.product_quantity}
                    </p>
                  </div>
                </>
              </Menu.Item>
            ))}
            <Link href="/cart">
              <div className="flex justify-end items-center gap-2 p-5 cursor-pointer">
                <p className="text-right text-black">Xem giỏ hàng </p>
                <FaShoppingCart className="text-black" />
              </div>
            </Link>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
