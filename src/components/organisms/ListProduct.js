"use client";
import Link from "next/link";
import "../../styles/product.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { TruncateText } from "../atoms/TruncateText";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Path, { BuyProduct, ListProducts } from "@/utils/auth";
import { Loading } from "../atoms/Loading";
import { FormatPrice } from "../atoms/FormatPrice";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Product = ({ data }) => {
  const router = useRouter();
  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }
  const buyData = {
    customer_id: IdCustomer,
    products: [{ product_id: data.product_id, product_quantity: 1 }],
  };
  const handleBuyNow = async () => {
    try {
      await BuyProduct(buyData);
      router.push("/?product=" + data.product_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li>
      <div className="card">
        <img src={data.product_image} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>

            <div className="card__header-text">
              <h3 className="card__title">
                {TruncateText(data.product_name, 70)}
              </h3>
              <p className="card__status">{FormatPrice(data.product_price)}</p>
            </div>
          </div>
          <div className="pl-[2em] flex">
            <div className="w-[40%]">
              <p>CPU</p>
              <p>RAM</p>
              <p>HARD DRIVER</p>
              <p>CARD</p>
              <p>DESKTOP</p>
            </div>
            <div className="w-[60%]">
              <p>{data.product_detail?.product_cpu}</p>
              <p>{data.product_detail?.product_ram}</p>
              <p>{data.product_detail?.hard_drive}</p>
              <p>{data.product_detail?.product_card}</p>
              <p>{data.product_detail?.desktop}</p>
            </div>
          </div>
          <div className="flex justify-center p-5">
            <Button title={"Buy now"} type={"button"} onClick={handleBuyNow} />
          </div>
        </div>
      </div>
    </li>
  );
};
export const ListProductHome = () => {
  const [dataAll, setDataAll] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProducts();
        setDataAll(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM HOT</p>
        <Link href="/shop" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAll.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM NỔI BẬT</p>
        <Link href="/shop" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAll.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}
    </>
  );
};

export const ListProductShop = () => {
  const dataall = [
    {
      image: "path/to/image1.jpg",
      price: 1000,
      cpu: "Intel Core i5",
      ram: "8GB",
      harddrive: "256GB SSD",
      card: "NVIDIA GeForce GTX 1650",
      desktop: true,
    },
    {
      image: "path/to/image2.jpg",
      price: 1200,
      cpu: "AMD Ryzen 7",
      ram: "16GB",
      harddrive: "1TB HDD",
      card: "AMD Radeon RX 580",
      desktop: true,
    },
  ];
  return (
    <>
      <div className="flex gap-5 justify-between items-center py-10">
        <div className="flex gap-5 items-center">
          <p className="text-3xl font-bold">Laptop</p>
          <p>(252 sản phẩm)</p>
        </div>
        <select className="w-24 h-10 border">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="vw">VW</option>
          <option value="audi" selected>
            Audi
          </option>
        </select>
      </div>
      <ul className="cards">
        {dataall.map((item, index) => (
          <Product data={item} key={index} />
        ))}
      </ul>
    </>
  );
};
