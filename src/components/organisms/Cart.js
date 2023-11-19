"use client";
import { CgClose } from "react-icons/cg";
import { TruncateText } from "../atoms/TruncateText";
import { Button } from "../atoms/Button";
import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { InputQuantity } from "../atoms/Input";
import { FormatPrice } from "../atoms/FormatPrice";
import { useForm } from "react-hook-form";
import Path from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal } from "../molecules/Modal";

export const Cart = () => {
  const { isListProduct, setIsListProduct } = useContext(ProductContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const arraySum = isListProduct
    .map((item, index) => item.product_quantity)
    .reduce((acc, current) => acc + current, 0);

  const total = isListProduct
    .map((product) => product.product_price * product.product_quantity)
    .reduce((acc, currentValue) => acc + currentValue, 0);

  const handleQuantityChange = (index, newQuantity) => {
    setQuantity({
      ...quantity,
      [index]: newQuantity,
    });

    const updatedListProduct = [...isListProduct];

    updatedListProduct[index].product_quantity = newQuantity;

    setIsListProduct(updatedListProduct);
  };

  const onSubmit = () => {
    const orderData = {
      customer_id: 1,
      shipping_id: shipping,
      payment_id: 1,
      order_total: total,
      order_status: 1,
      order_detail: isListProduct.map((item, index) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: Number(item.product_price),
        product_sales_quantity: item.product_quantity,
      })),
    };

    axios
      .post(Path.API + "/order", orderData)
      .then((response) => {
        setIsOpen(true);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const CloseModal = () => {
    setIsListProduct([]);
    setIsOpen(flase);
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

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} content={ContentModal} />
      )}

      {isListProduct.length > 0 ? (
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
                  <img className="w-16 h-16" src={item.product_image} />
                  <div>
                    <p className="text-[#8e8e8e] font-bold text-xs pb-1">
                      Window
                    </p>
                    <p className="text-black font-semibold">
                      {TruncateText(item.product_name, 70)}
                    </p>
                  </div>
                  <InputQuantity
                    quantity={item.product_quantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(index, newQuantity)
                    }
                  />
                  <p>{FormatPrice(item.product_price)}</p>
                  <div className="cursor-pointer p-3 rounded-full hover:bg-orange hover:text-white">
                    <CgClose />
                  </div>
                </div>
              ))}
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
