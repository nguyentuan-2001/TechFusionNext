"use client";
import { CgClose } from "react-icons/cg";
import { TruncateText } from "../atoms/TruncateText";
import { Button } from "../atoms/Button";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { InputQuantity } from "../atoms/Input";
import { FormatPrice } from "../atoms/FormatPrice";
import { useForm } from "react-hook-form";
import Path, { DeleteProductCart } from "@/utils/auth";
import axios from "axios";
import { Modal } from "../molecules/Modal";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

export const Cart = () => {
  const { isListProduct, setIsListProduct } = useContext(ProductContext);
  const [productUpdate, setProductUpdate] = useState([]);
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  //total product
  const arraySum = isListProduct
    .map((item, index) => item.product_quantity)
    .reduce((acc, current) => acc + current, 0);
  //total money
  const total = isListProduct
    .map(
      (product) =>
        product.product_detail.product_price * product.product_quantity
    )
    .reduce((acc, currentValue) => acc + currentValue, 0);
  //change quantity
  const handleQuantityChange = (index, newQuantity) => {
    setQuantity({
      ...quantity,
      [index]: newQuantity,
    });

    const updatedListProduct = [...isListProduct];

    updatedListProduct[index].product_quantity = newQuantity;
    setProductUpdate(updatedListProduct);
  };

  const onSubmit = () => {};

  const CloseModal = () => {
    setIsOpen(false);
  };

  const ContentModal = [];

  ContentModal.push(
    <div className="flex justify-center items-center flex-col gap-5">
      <p>
        Sản phẩm đã được đặt hàng. Cửa hàng sẽ liên hệ với bạn sớm nhất có thể
      </p>
      <button className="border px-5 py-2" onClick={CloseModal}>
        OK
      </button>
    </div>
  );

  const deleteProduct = async (product_id) => {
    const payload = {
      IDCustomer: IdCustomer,
      IDProduct: product_id,
    };
    await DeleteProductCart(payload);
    // searchParams.set("delete", product_id);
    router.push("/cart/?delete=" + product_id);
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={ContentModal} />
      )}

      {isListProduct?.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-[5rem] py-10 grid lg:grid-cols-10">
            <div
              className=" bg-white p-10 lg:col-span-7 shadow-2xl"
              style={{ borderRadius: "20px 0 0 20px" }}
            >
              <div className="flex items-center justify-between pb-10 mb-3 border-b-2">
                <p className="font-bold text-3xl">Shopping Cart</p>
                <p>{arraySum} sản phẩm</p>
              </div>
              {isListProduct.map((item, index) => (
                <div
                  className="flex items-center justify-between gap-5 my-5"
                  key={index}
                >
                  <img
                    className="w-16 h-16"
                    src={item.product_detail.product_image}
                  />
                  <div className="w-[50%]">
                    <p className="text-[#8e8e8e] font-bold text-xs pb-1">
                      Window
                    </p>
                    <p className="text-black font-semibold">
                      {TruncateText(item.product_detail.product_name, 70)}
                    </p>
                  </div>
                  <InputQuantity
                    quantity={item.product_quantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(index, newQuantity)
                    }
                  />

                  <p>{FormatPrice(item.product_detail.product_price)}</p>
                  <div
                    className="cursor-pointer p-3 rounded-full hover:bg-orange hover:text-white"
                    onClick={() => deleteProduct(item.product_id)}
                  >
                    <CgClose />
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-end pt-5">
                <Button
                  title={"UPDATE QUANTITY"}
                  type={"button"}
                  // onClick={handleQuantity}
                />
              </div>
            </div>
            <div
              className=" bg-[#ddd] p-10 lg:col-span-3 shadow-2xl"
              style={{ borderRadius: "0 20px 20px 0" }}
            >
              <div className="pb-10 mb-3 border-b-2">
                <p className="font-bold text-3xl">Summary</p>
              </div>
              <div>
                <p className="text-sm font-semibold my-3">SHIPPING</p>
                <select
                  className="w-full p-2"
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <option value={1}>Thanh toán khi giao hàng</option>
                  <option value={2}>Thanh toán ví Việt</option>
                </select>
              </div>
              <div className="border-b-2 pb-5 border-[#bdbdbd]">
                <p className="text-sm font-semibold my-3">GIVE CODE</p>
                <input type="text" className="w-full p-2" />
              </div>
              <div className="flex justify-between my-3 items-center text-sm font-semibold">
                <p className="">TOTAL PRICE</p>
                <p>{FormatPrice(total)}</p>
              </div>
              <div className="flex justify-center pt-5">
                <Button title={"CHECKOUT"} type={"submit"} />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="h-64 flex justify-center items-center font-semibold">
            Không có sản phẩm
          </div>
        </>
      )}
    </>
  );
};
